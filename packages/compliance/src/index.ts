export type ClaimStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'EXPIRED' | 'REJECTED';

export interface PublishableClaim {
  id: string;
  status: ClaimStatus;
  sourceUrl?: string | null;
  sourceDate?: string | null;
  expiresAt?: string | null;
  requiredDisclosure?: string | null;
}

export function canPublishClaim(claim: PublishableClaim, now = new Date()) {
  if (claim.status !== 'APPROVED') return { ok: false, reason: 'CLAIM_NOT_APPROVED' as const };
  if (!claim.sourceUrl || !claim.sourceDate) return { ok: false, reason: 'CLAIM_EVIDENCE_MISSING' as const };
  if (claim.expiresAt && new Date(claim.expiresAt) <= now) return { ok: false, reason: 'CLAIM_EXPIRED' as const };
  return { ok: true as const };
}

export interface CommunicationPolicyInput {
  channel: 'EMAIL' | 'SMS' | 'CALL';
  suppressed: boolean;
  consentRequired: boolean;
  consentPresent: boolean;
}

export function canContact(input: CommunicationPolicyInput) {
  if (input.suppressed) return { ok: false, reason: 'SUPPRESSED' as const };
  if (input.consentRequired && !input.consentPresent) return { ok: false, reason: 'CONSENT_REQUIRED' as const };
  return { ok: true as const };
}

export type DataClass = 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED' | 'REGULATED';

export function mayEnterPublicDistribution(dataClass: DataClass) {
  return dataClass === 'PUBLIC';
}
