export * from './registry.js';
export * from './factory.js';

import { agentRegistry } from './registry.js';

export function listAgents() {
  return agentRegistry.map(({ id, name, goal, risk, mode }) => ({ id, name, goal, risk, mode }));
}
