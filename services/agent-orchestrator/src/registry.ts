export type AgentRisk = 'LOW' | 'MEDIUM' | 'HIGH';
export type AgentMode = 'DRAFT_ONLY' | 'READ_ONLY' | 'HUMAN_APPROVAL' | 'EXECUTE_SCOPED';

export interface AgentContract {
  id: string;
  name: string;
  goal: string;
  inputs: string[];
  tools: string[];
  actions: string[];
  guardrails: string[];
  evidenceRequired: string[];
  escalation: string;
  risk: AgentRisk;
  mode: AgentMode;
}

export const agentRegistry: AgentContract[] = [
  {
    id: 'claim-auditor',
    name: 'Claim Auditor',
    goal: 'Prevent unsupported or expired mortgage, credential, savings, rate, testimonial, and compliance claims from publication.',
    inputs: ['content draft', 'claim registry', 'evidence records', 'approval state', 'expiry date'],
    tools: ['claim registry read', 'content parser', 'audit logger'],
    actions: ['map statements to claim IDs', 'flag unsupported claims', 'flag expired evidence', 'prepare approval queue'],
    guardrails: ['never approve its own claim', 'never invent evidence', 'never convert PENDING into APPROVED', 'rate claims require current source and disclosure'],
    evidenceRequired: ['source URL or controlled source record', 'source date', 'claim owner', 'approval owner'],
    escalation: 'Legal / Compliance Reviewer',
    risk: 'HIGH',
    mode: 'HUMAN_APPROVAL'
  },
  {
    id: 'cpa-outreach',
    name: 'CPA Outreach Agent',
    goal: 'Draft account-specific outreach using approved positioning and public-safe firm facts.',
    inputs: ['approved message library', 'public firm metadata', 'CRM account record', 'suppression status'],
    tools: ['CRM read', 'approved content library', 'public research adapter'],
    actions: ['draft email', 'draft LinkedIn message', 'prepare meeting CTA', 'suggest next touch'],
    guardrails: ['no deceptive personalization', 'no sensitive inference', 'no automatic send', 'honor suppression', 'no referral-fee promise'],
    evidenceRequired: ['approved content version', 'account source metadata'],
    escalation: 'Business Development Owner',
    risk: 'MEDIUM',
    mode: 'DRAFT_ONLY'
  },
  {
    id: 'meeting-brief',
    name: 'Meeting Brief Agent',
    goal: 'Prepare an executive briefing for a CPA or strategic partner meeting.',
    inputs: ['CRM history', 'public firm profile', 'previous notes', 'approved program categories'],
    tools: ['CRM read', 'calendar read', 'public research adapter'],
    actions: ['summarize account context', 'identify open questions', 'prepare discovery agenda', 'recommend next action'],
    guardrails: ['do not infer protected traits', 'do not state unverified firm facts as confirmed', 'do not promise loan outcomes'],
    evidenceRequired: ['source for material public facts', 'CRM timestamp'],
    escalation: 'Account Executive / Partner Coach',
    risk: 'LOW',
    mode: 'READ_ONLY'
  },
  {
    id: 'partner-coach',
    name: 'Partner Coach Agent',
    goal: 'Drive onboarding, training completion, workflow adoption, and appropriate human escalation.',
    inputs: ['partner organization', 'training state', 'open tasks', 'support history', 'approved resources'],
    tools: ['portal read', 'LMS read', 'task system', 'approved resource library'],
    actions: ['recommend next onboarding step', 'generate training reminder', 'surface missing workflow setup', 'route support request'],
    guardrails: ['no borrower-specific mortgage advice', 'no tax advice', 'no underwriting interpretation', 'no referral compensation discussion beyond approved policy'],
    evidenceRequired: ['current onboarding state', 'approved training version'],
    escalation: 'Human Partner Coach / Licensed MLO / Compliance',
    risk: 'MEDIUM',
    mode: 'DRAFT_ONLY'
  },
  {
    id: 'content-repurposer',
    name: 'Content Repurposing Agent',
    goal: 'Transform approved source content into channel-specific assets while preserving claim and disclosure relationships.',
    inputs: ['approved source copy', 'claim IDs', 'disclosure ID', 'target channel'],
    tools: ['content library', 'template registry', 'claim registry read'],
    actions: ['create email draft', 'create social draft', 'create webinar outline', 'create landing-page variant'],
    guardrails: ['cannot change numeric claim meaning', 'cannot remove mandatory disclosure', 'cannot publish'],
    evidenceRequired: ['approved source content ID', 'claim mapping', 'disclosure version'],
    escalation: 'Marketing Approver / Compliance Reviewer',
    risk: 'MEDIUM',
    mode: 'DRAFT_ONLY'
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    goal: 'Explain acquisition, activation, partner health, service, revenue, and compliance metrics.',
    inputs: ['event metrics', 'CRM funnel', 'billing metrics', 'partner health data'],
    tools: ['analytics read', 'CRM aggregate read', 'billing aggregate read'],
    actions: ['summarize movement', 'identify anomalies', 'propose tests', 'prepare QBR insights'],
    guardrails: ['distinguish correlation from causation', 'never fabricate missing data', 'do not expose individual restricted records'],
    evidenceRequired: ['metric definition', 'time window', 'source dataset'],
    escalation: 'Analytics Owner / Product Owner',
    risk: 'LOW',
    mode: 'READ_ONLY'
  },
  {
    id: 'agent-builder',
    name: 'Agent Builder',
    goal: 'Create proposed sub-agent contracts from a declared business goal while inheriting DREAM.Estates governance.',
    inputs: ['business goal', 'approved tools', 'data classification', 'owner', 'risk context'],
    tools: ['agent registry read', 'policy registry read', 'schema validator'],
    actions: ['draft agent contract', 'score risk', 'inherit baseline guardrails', 'submit contract for human approval'],
    guardrails: ['cannot self-register executable HIGH-risk agent', 'cannot grant tools not in allowlist', 'cannot weaken parent guardrails', 'cannot assign regulated authority'],
    evidenceRequired: ['requesting owner', 'business purpose', 'tool allowlist', 'data classification'],
    escalation: 'Platform Architect + Compliance Owner',
    risk: 'HIGH',
    mode: 'HUMAN_APPROVAL'
  }
];

export function getAgent(id: string): AgentContract | undefined {
  return agentRegistry.find((agent) => agent.id === id);
}
