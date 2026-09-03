import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAgentContract } from './factory.js';

test('regulated-data agent is forced to human approval', () => {
  const result = buildAgentContract({
    id: 'mortgage-record-agent',
    name: 'Mortgage Record Agent',
    goal: 'Handle a regulated-domain workflow.',
    owner: 'Authorized domain owner',
    inputs: ['regulated mortgage data'],
    requestedTools: ['mortgage LOS write'],
    proposedActions: ['update record'],
    dataClassification: 'REGULATED',
    requestedMode: 'EXECUTE_SCOPED'
  });

  assert.equal(result.contract.risk, 'HIGH');
  assert.equal(result.contract.mode, 'HUMAN_APPROVAL');
  assert.equal(result.approvalRequired, true);
});

test('public research draft agent can remain draft-only', () => {
  const result = buildAgentContract({
    id: 'public-research',
    name: 'Public Research',
    goal: 'Prepare a public-safe research brief.',
    owner: 'BD owner',
    inputs: ['public website'],
    requestedTools: ['public research read'],
    proposedActions: ['draft brief'],
    dataClassification: 'PUBLIC',
    requestedMode: 'DRAFT_ONLY'
  });

  assert.equal(result.contract.risk, 'LOW');
  assert.equal(result.contract.mode, 'DRAFT_ONLY');
  assert.equal(result.approvalRequired, false);
});
