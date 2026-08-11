# n8n + MCP Automation Protocol

## Required pattern

Application → Automation Gateway → Signed Event → n8n / MCP → Approved Destination → Result Event → Audit Log

## Controls
- scoped service credentials;
- signed events/webhooks;
- idempotency keys;
- timestamp and replay protection;
- retry policy and dead-letter state;
- tenant/project scope;
- correlation/request ID;
- data-classification gate;
- approval gate for publishing;
- structured event logging.

## Initial events
`inquiry.created`, `contact.created`, `opportunity.created`, `opportunity.stage_changed`, `project.created`, `task.assigned`, `approval.requested`, `approval.completed`, `asset.submitted`, `asset.approved`, `distribution.scheduled`, `distribution.published`.

## Prohibited defaults
- unrestricted Supabase/database service-role access in n8n;
- raw PHI or protected mortgage/MLS data in generic workflows;
- auto-publishing unapproved media;
- secrets in workflow JSON;
- trusting caller-supplied roles, authorization flags, or pricing.

## MCP scope
Every MCP tool call should be scoped by: tool + identity + tenant + project + purpose + data classification.
