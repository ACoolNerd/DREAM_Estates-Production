export type OrganizationType = 'DREAM_ESTATES' | 'MORTGAGE_OFFICE' | 'CPA_FIRM' | 'PARTNER';
export type PartnerStage = 'TARGET' | 'CONTACTED' | 'ENGAGED' | 'MEETING' | 'QUALIFIED' | 'LEGAL_REVIEW' | 'ONBOARDING' | 'ACTIVE' | 'DORMANT' | 'CLOSED';
export type IntroductionStatus = 'NEW' | 'ROUTED' | 'CONTACTED' | 'IN_PROCESS' | 'CLOSED' | 'DECLINED';

export interface Organization {
  id: string;
  name: string;
  organizationType: OrganizationType;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}

export interface CpaPartner {
  id: string;
  ownerOrganizationId: string;
  partnerOrganizationId: string;
  lifecycleStage: PartnerStage;
  accountableUserId?: string;
  nextAction?: string;
  nextActionAt?: string;
}

export interface ClientIntroduction {
  id: string;
  ownerOrganizationId: string;
  partnerId: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  purpose: string;
  status: IntroductionStatus;
  assignedLicensedOwnerId?: string;
  externalCaseReference?: string;
}

export interface AuditEvent {
  id: string;
  organizationId?: string;
  actorUserId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  dataClassification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED' | 'REGULATED';
  requestId?: string;
  outcome: 'ALLOWED' | 'DENIED' | 'FAILED';
  createdAt: string;
}
