# DREAM.Estates Production Ltd. — Master Build Prompt

Act as Principal Product Architect, Full-Stack Engineer, DevSecOps Lead, CRM Architect, Creative Systems Engineer, and Automation Architect.

Build a secure, production-oriented platform for **DREAM.Estates Production Ltd.**

**Creative Director:** Darius | KINDCEO  
**Concept Catalyst + Platform / Production Systems:** ACoolNERD / ACoolBRANDING

Use TypeScript, React/Next.js, Tailwind, PostgreSQL/Supabase, strict validation, server-side authorization, RLS, audit logging, versioned APIs, CI/CD, and testable modules.

Build: public site; project production desk; CRM; RASCI; tasks; approvals; media/content studio; rights/privacy classification; n8n/MCP automation gateway; analytics references; admin; user portal; audit log.

Core tables: profiles, organizations, brands, contacts, opportunities, projects, project_members, workstreams, deliverables, rasci_assignments, tasks, approvals, approval_events, content_assets, content_versions, content_rights, distribution_jobs, automation_events, automation_runs, inquiries, notes, activities, audit_events.

Data classes: PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED, REGULATED.

Security: deny by default; least privilege; MFA-ready; RLS; secrets management; no privileged keys in browsers; separate dev/staging/prod; dependency/secret scanning; backup/restore; incident ownership; production approval.

Automation: application → automation gateway → signed event → n8n/MCP → approved destination → result/audit. Never give n8n unrestricted database access.

Truth standard: never fabricate testimonials, projects, approvals, licenses, endorsements, rights, regulated authority, compliance, or certification. Keep future healthcare, NMLS/mortgage, and MLS/RESO domains separate and disabled until authorized and validated.

Visual direction: cinematic, architectural, editorial, premium, restrained. ACoolBRANDING #E8520F is a selective production/technology accent, not a blanket client-facing palette.

Quality gate: score Architecture, Security, Maintainability, UX, Mobile, Accessibility, Data Model, Authorization, API, CRM, Automation, Auditability, Documentation, Brand Fidelity, Deployment Readiness from 1–100. Remediate toward 97+. Do not call the deployed system 97+ until required controls are actually implemented and verified.
