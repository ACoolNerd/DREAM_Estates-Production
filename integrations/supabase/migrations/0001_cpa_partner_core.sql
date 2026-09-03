-- DREAM.Estates Production Ltd.
-- CPA Mortgage Partnership core schema
-- Public-safe migration: no secrets, PHI, SSN, bank credentials, or protected mortgage documents.

create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization_type text not null check (organization_type in ('DREAM_ESTATES','MORTGAGE_OFFICE','CPA_FIRM','PARTNER')),
  status text not null default 'ACTIVE' check (status in ('ACTIVE','INACTIVE','PENDING')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('OWNER','ADMIN','BD','COACH','MLO','COMPLIANCE','MEMBER','READ_ONLY')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table if not exists public.cpa_partners (
  id uuid primary key default gen_random_uuid(),
  owner_organization_id uuid not null references public.organizations(id) on delete cascade,
  partner_organization_id uuid not null references public.organizations(id) on delete cascade,
  lifecycle_stage text not null default 'TARGET' check (lifecycle_stage in ('TARGET','CONTACTED','ENGAGED','MEETING','QUALIFIED','LEGAL_REVIEW','ONBOARDING','ACTIVE','DORMANT','CLOSED')),
  accountable_user_id uuid references auth.users(id),
  next_action text,
  next_action_at timestamptz,
  notes_internal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_organization_id, partner_organization_id)
);

create table if not exists public.claim_registry (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  claim_key text not null,
  claim_text text not null,
  category text not null check (category in ('CREDENTIAL','PROGRAM','RATE','SAVINGS','TESTIMONIAL','COMPLIANCE','OTHER')),
  status text not null default 'PENDING' check (status in ('DRAFT','PENDING','APPROVED','EXPIRED','REJECTED')),
  source_url text,
  source_date date,
  required_disclosure text,
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(organization_id, claim_key)
);

create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  subject_reference text not null,
  channel text not null check (channel in ('EMAIL','SMS','CALL')),
  status text not null check (status in ('GRANTED','REVOKED','SUPPRESSED')),
  basis text not null,
  disclosure_version text not null,
  captured_at timestamptz not null default now(),
  revoked_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.client_introductions (
  id uuid primary key default gen_random_uuid(),
  owner_organization_id uuid not null references public.organizations(id) on delete cascade,
  partner_id uuid not null references public.cpa_partners(id) on delete restrict,
  submitted_by uuid references auth.users(id),
  contact_name text not null,
  contact_email text,
  contact_phone text,
  purpose text not null,
  status text not null default 'NEW' check (status in ('NEW','ROUTED','CONTACTED','IN_PROCESS','CLOSED','DECLINED')),
  assigned_licensed_owner_id uuid references auth.users(id),
  external_case_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint no_empty_contact check (contact_email is not null or contact_phone is not null)
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text not null,
  data_classification text not null check (data_classification in ('PUBLIC','INTERNAL','CONFIDENTIAL','RESTRICTED','REGULATED')),
  request_id text,
  outcome text not null check (outcome in ('ALLOWED','DENIED','FAILED')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.cpa_partners enable row level security;
alter table public.claim_registry enable row level security;
alter table public.consent_records enable row level security;
alter table public.client_introductions enable row level security;
alter table public.audit_events enable row level security;

create or replace function public.is_org_member(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members m
    where m.organization_id = target_org and m.user_id = auth.uid()
  );
$$;

create policy "org members read organizations"
on public.organizations for select
to authenticated
using (public.is_org_member(id));

create policy "members read own membership"
on public.organization_members for select
to authenticated
using (user_id = auth.uid() or public.is_org_member(organization_id));

create policy "org members read cpa partners"
on public.cpa_partners for select
to authenticated
using (public.is_org_member(owner_organization_id));

create policy "org members read claims"
on public.claim_registry for select
to authenticated
using (public.is_org_member(organization_id));

create policy "org members read consent"
on public.consent_records for select
to authenticated
using (public.is_org_member(organization_id));

create policy "org members read introductions"
on public.client_introductions for select
to authenticated
using (public.is_org_member(owner_organization_id));

create policy "org members read audit"
on public.audit_events for select
to authenticated
using (organization_id is not null and public.is_org_member(organization_id));

-- Writes should initially occur through an application-controlled server API after explicit role checks.
-- Do not add broad authenticated INSERT/UPDATE policies merely to make client-side features work.
