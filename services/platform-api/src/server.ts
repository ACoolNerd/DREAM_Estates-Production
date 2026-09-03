import Fastify from 'fastify';
import { z } from 'zod';
import { canContact, canPublishClaim } from '@dream/compliance';

const app = Fastify({ logger: true });

const partnerApplicationSchema = z.object({
  firmName: z.string().min(2).max(160),
  contactName: z.string().min(2).max(120),
  email: z.string().email(),
  role: z.string().min(2).max(120),
  teamSize: z.number().int().min(1).max(10000).optional(),
  notes: z.string().max(2000).optional()
});

const introductionSchema = z.object({
  partnerId: z.string().uuid(),
  contactName: z.string().min(2).max(120),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().min(7).max(30).optional(),
  purpose: z.string().min(3).max(500)
}).refine((value) => value.contactEmail || value.contactPhone, {
  message: 'At least one contact channel is required.'
});

app.get('/health', async () => ({ ok: true, service: 'dream-platform-api' }));

app.post('/api/biz/v1/partner-applications', async (request, reply) => {
  const parsed = partnerApplicationSchema.safeParse(request.body);
  if (!parsed.success) return reply.code(400).send({ error: 'INVALID_REQUEST', details: parsed.error.flatten() });

  // PENDING: write through repository layer after authenticated organization ownership,
  // rate limiting, anti-spam, consent capture, and audit event are wired.
  return reply.code(202).send({
    status: 'PENDING_PERSISTENCE',
    message: 'Application payload validated. Persistence is intentionally disabled until the server-side data adapter and audit path are connected.'
  });
});

app.post('/api/biz/v1/client-introductions', async (request, reply) => {
  const parsed = introductionSchema.safeParse(request.body);
  if (!parsed.success) return reply.code(400).send({ error: 'INVALID_REQUEST', details: parsed.error.flatten() });

  // This endpoint must require authenticated partner membership and route only to an
  // authorized licensed owner before production enablement.
  return reply.code(501).send({
    error: 'NOT_ENABLED',
    message: 'Client introduction persistence is blocked until authentication, organization authorization, consent, licensed routing, and audit logging are implemented.'
  });
});

app.post('/api/biz/v1/policy/check-claim', async (request, reply) => {
  const schema = z.object({
    id: z.string(),
    status: z.enum(['DRAFT','PENDING','APPROVED','EXPIRED','REJECTED']),
    sourceUrl: z.string().url().nullable().optional(),
    sourceDate: z.string().nullable().optional(),
    expiresAt: z.string().nullable().optional(),
    requiredDisclosure: z.string().nullable().optional()
  });
  const parsed = schema.safeParse(request.body);
  if (!parsed.success) return reply.code(400).send({ error: 'INVALID_REQUEST' });
  return canPublishClaim(parsed.data);
});

app.post('/api/biz/v1/policy/check-contact', async (request, reply) => {
  const schema = z.object({
    channel: z.enum(['EMAIL','SMS','CALL']),
    suppressed: z.boolean(),
    consentRequired: z.boolean(),
    consentPresent: z.boolean()
  });
  const parsed = schema.safeParse(request.body);
  if (!parsed.success) return reply.code(400).send({ error: 'INVALID_REQUEST' });
  return canContact(parsed.data);
});

const port = Number(process.env.PORT ?? 4000);
app.listen({ port, host: '0.0.0.0' }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
