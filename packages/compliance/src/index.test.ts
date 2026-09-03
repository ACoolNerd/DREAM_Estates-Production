import assert from 'node:assert/strict';
import test from 'node:test';
import { canContact, canPublishClaim, mayEnterPublicDistribution } from './index.js';

test('blocks unapproved claim', () => {
  assert.equal(canPublishClaim({ id: 'rate', status: 'PENDING', sourceUrl: 'https://example.com', sourceDate: '2026-09-03' }).ok, false);
});

test('blocks expired claim', () => {
  const result = canPublishClaim({
    id: 'rate',
    status: 'APPROVED',
    sourceUrl: 'https://example.com',
    sourceDate: '2026-09-03',
    expiresAt: '2026-09-02T00:00:00Z'
  }, new Date('2026-09-03T00:00:00Z'));
  assert.equal(result.ok, false);
});

test('suppression always blocks contact', () => {
  assert.equal(canContact({ channel: 'EMAIL', suppressed: true, consentRequired: false, consentPresent: false }).ok, false);
});

test('only PUBLIC data may enter ungated public distribution', () => {
  assert.equal(mayEnterPublicDistribution('PUBLIC'), true);
  assert.equal(mayEnterPublicDistribution('CONFIDENTIAL'), false);
  assert.equal(mayEnterPublicDistribution('REGULATED'), false);
});
