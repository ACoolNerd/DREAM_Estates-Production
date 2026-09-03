# CPA Mortgage Partnership Vertical

**Status:** PROPOSED / active development branch  
**Vertical:** CPA + self-employed mortgage coordination  
**Platform:** DREAM.Estates Production Ltd.  
**Creative Director:** Darius | KINDCEO  
**Platform / Production Systems:** ACoolNERD / ACoolBRANDING

## Objective

Turn the Strategic Mortgage Partnership for CPAs concept into a reusable technology and managed-operations vertical that can support:

1. Public education and acquisition.
2. CPA/professional partner business development.
3. Partner onboarding and training.
4. Public-safe client introductions.
5. Handoff to appropriately licensed mortgage personnel/systems.
6. Claim, evidence, disclosure, consent, and marketing governance.
7. Partner health, funnel, service, and revenue analytics.
8. SaaS, Backend-as-a-Service, Platform-as-a-Service, white-label, and managed-service expansion.

## Hard Boundary

This vertical is not an unlicensed mortgage origination system. The generic platform must not collect or expose protected mortgage records merely because the CRM can technically store them. Restricted mortgage application data belongs in a separately authorized regulated-domain plane and/or the approved LOS/POS.

## Experience Architecture

```text
Public Website
  -> CPA Strategy Call / Partner Application
  -> CRM Account + Opportunity
  -> Partner Qualification
  -> Approved Agreement
  -> Partner Portal + Training
  -> Minimum-Necessary Client Introduction
  -> Licensed Mortgage Handoff
  -> Permitted Status Synchronization
  -> Partner Success / QBR
  -> Renewal / Expansion
```

## Product Surfaces

### Public CPA Website
- positioning
- problem/solution education
- alternative-documentation concepts
- Darius profile using verified claims only
- case studies after evidence approval
- partner application
- strategy-call CTA
- disclosure library

### Partner Portal — next build
- organization/team
- onboarding checklist
- training
- secure introduction workflow
- permitted status view
- resources
- support
- QBR analytics

### Internal Operations — next build
- accounts/contacts/opportunities
- partner-health score
- claim registry
- content approval
- tasks/SLAs
- support/escalation
- consent/suppression
- audit events

## Agent Architecture

The vertical uses the shared `services/agent-orchestrator` service. Agents are contracts, not free-form autonomous identities.

Every agent contract defines:

`Agent -> Goal -> Inputs -> Tools -> Actions -> Guardrails -> Evidence -> Human Escalation`

Initial registry:
- Claim Auditor
- CPA Outreach Agent
- Meeting Brief Agent
- Partner Coach Agent
- Content Repurposing Agent
- Analytics Agent
- Agent Builder

## Agent Builder Rule

The Agent Builder can propose sub-agents but cannot self-authorize high-risk execution. Restricted/regulated data, communication sends, publishing, payments, mortgage-system writes, or comparable external side effects force human approval.

## Technical Build Sequence

### Phase 1 — CONFIRMED STARTED
- pnpm workspace
- Next.js CPA website
- governed agent registry
- agent factory

### Phase 2 — PROPOSED NEXT
- shared UI/design tokens
- PostgreSQL/Supabase schema
- organization RBAC + RLS
- CRM domain
- claim/evidence registry
- consent/suppression service
- partner application API

### Phase 3
- partner portal
- training/LMS module
- introduction workflow
- licensed-owner routing
- audit log
- communications adapter

### Phase 4
- LOS/POS adapter behind regulated boundary
- CRM adapter
- n8n/MCP automation gateway events
- analytics warehouse events
- billing/subscriptions

### Phase 5
- white label
- enterprise SSO
- multi-office controls
- API/webhooks
- mobile companion

## Revenue Architecture

Potential platform revenue includes software subscriptions, office licenses, implementation, managed backend operations, training, analytics, API/enterprise access, white-label deployments, and bona fide marketing/production services actually performed.

**Do not encode per-closing CPA referral compensation into the product.** Any relationship involving settlement-service referrals or things of value requires specific legal/compliance review.

## Launch Proof Gates

Before public launch, verify and document:
- Darius top-1% ranking claim
- $2B+ team-funded volume claim
- company and individual NMLS/licensing disclosures
- every advertised rate example and required terms/disclosures
- savings/down-payment case studies
- testimonials and permissions
- states/markets available
- partner commercial agreement
- privacy and communication consent flows

## Next Executable State

1. Build shared database schemas.
2. Build `/for-cpas` and partner application flow.
3. Build claim registry + publishing gate.
4. Build partner portal shell.
5. Wire agent orchestrator to application-controlled tools.
6. Add automated tests for agent risk escalation, authorization, and claim expiry.
7. Add CI before merging to main.
