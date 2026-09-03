import type { AgentContract, AgentMode, AgentRisk } from './registry.js';

const baselineGuardrails = [
  'Preserve DREAM.Estates brand hierarchy and RASCI authority.',
  'Deny by default when authority, consent, evidence, or data classification is unclear.',
  'Never commit, expose, or request secrets or unnecessary regulated data.',
  'Never claim licensing, certification, approval, rate availability, savings, or compliance without verified evidence.',
  'Never weaken authorization, RLS, audit, or approval controls to complete a task.',
  'Escalate regulated mortgage, tax, legal, privacy, and securities decisions to authorized humans.'
];

export interface AgentBuildRequest {
  id: string;
  name: string;
  goal: string;
  owner: string;
  inputs: string[];
  requestedTools: string[];
  proposedActions: string[];
  dataClassification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED' | 'REGULATED';
  requestedMode?: AgentMode;
}

export interface AgentBuildResult {
  contract: AgentContract;
  approvalRequired: boolean;
  reasons: string[];
}

const highRiskSignals = ['REGULATED', 'RESTRICTED'];

export function buildAgentContract(request: AgentBuildRequest): AgentBuildResult {
  const reasons: string[] = [];
  let risk: AgentRisk = 'LOW';

  if (highRiskSignals.includes(request.dataClassification)) {
    risk = 'HIGH';
    reasons.push(`Data classification ${request.dataClassification} requires human approval.`);
  } else if (request.dataClassification === 'CONFIDENTIAL') {
    risk = 'MEDIUM';
    reasons.push('Confidential data requires scoped authorization and audit.');
  }

  const riskyTool = request.requestedTools.some((tool) => /write|send|publish|payment|mortgage|los|sms|call/i.test(tool));
  if (riskyTool) {
    risk = 'HIGH';
    reasons.push('Requested tools include external write, communications, payment, or regulated-domain capability.');
  }

  const requestedMode = request.requestedMode ?? 'DRAFT_ONLY';
  const safeMode: AgentMode = risk === 'HIGH' ? 'HUMAN_APPROVAL' : requestedMode;

  const contract: AgentContract = {
    id: request.id,
    name: request.name,
    goal: request.goal,
    inputs: request.inputs,
    tools: request.requestedTools,
    actions: request.proposedActions,
    guardrails: baselineGuardrails,
    evidenceRequired: [
      `Accountable owner: ${request.owner}`,
      `Declared data classification: ${request.dataClassification}`,
      'Approved tool allowlist',
      'Business-purpose record'
    ],
    escalation: 'Platform Architect + domain-authorized human owner',
    risk,
    mode: safeMode
  };

  return {
    contract,
    approvalRequired: risk === 'HIGH' || safeMode === 'HUMAN_APPROVAL',
    reasons
  };
}
