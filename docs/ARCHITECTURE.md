# DREAM.Estates Platform Architecture

## Goal
Build one governed production platform that supports public experiences, projects, CRM, media, approvals, automation, and future authorized vertical modules without mixing sensitive data unnecessarily.

## Security planes

### 1. Public Experience
Websites, approved media, public project stories, marketing pages, approved catalogs, public analytics.

### 2. Business / CRM
Contacts, companies, leads, opportunities, projects, tasks, approvals, quotes, activities, content production, source attribution.

### 3. Restricted / Regulated Domain Plane
Separate domain modules for PHI, mortgage application data, identity documentation, restricted MLS/RESO data, or other regulated records. Disabled by default and activated only with verified authority, contracts, controls, and purpose.

## Reference monorepo

```text
apps/
  web/
  portal/
  admin/
  crm/
  media-studio/
services/
  api/
  auth/
  authorization/
  audit/
  automation-gateway/
packages/
  ui/
  database/
  schemas/
  permissions/
  compliance/
  observability/
integrations/
  n8n/
  mcp/
  supabase/
  stripe/
  video/
  fhir/
  nmls/
  reso-mls/
docs/
automation/
```

## Core entities
profiles, organizations, brands, contacts, opportunities, projects, project_members, workstreams, deliverables, rasci_assignments, tasks, approvals, approval_events, content_assets, content_versions, content_rights, distribution_jobs, automation_events, automation_runs, inquiries, notes, activities, audit_events.

## API pattern
Use a versioned server API such as `/api/biz/v1/*`. Validate payloads server-side, authorize every protected action, and never trust client-computed roles, prices, discounts, or authority.

## Environments
Development → Staging → Production. Production requires explicit approval and separate secrets.
