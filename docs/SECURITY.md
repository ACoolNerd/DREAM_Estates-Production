# Security & Data Governance

## Baseline
- Deny by default.
- Strong authentication and MFA-ready design.
- Tenant/project membership controls.
- Server-side authorization for protected actions.
- PostgreSQL/Supabase RLS for user-facing records.
- Separate public, confidential, restricted, and regulated domains.
- Secrets never committed to Git.
- Audit actor, action, resource, tenant, timestamp, request ID, outcome, and data classification.

## Classification
- **PUBLIC** — approved for public release.
- **INTERNAL** — routine operating information.
- **CONFIDENTIAL** — client/project information.
- **RESTRICTED** — credentials, identity documents, sensitive legal/business records.
- **REGULATED** — PHI, protected mortgage data, restricted MLS data, or other specifically regulated records.

Only PUBLIC content may enter ungated public distribution. Every other classification requires a purpose-appropriate approved workflow.

## Repository rule
This repository is public as of initial setup. Do not place secrets or confidential/regulated source material here. Move production implementation to a private repository or make this repository private before adding sensitive operational content.

## Production release gates
Dependency and secret scanning; authorization tests; RLS tests where feasible; privacy/legal review; backup/restore procedure; incident owner; environment separation; production approval; logging review.

## Compliance language
Architecture is not certification. Use precise language: `architected for`, `compliance-ready`, `capable of supporting`, `subject to configuration and validation`, or `requires authorized integration`.
