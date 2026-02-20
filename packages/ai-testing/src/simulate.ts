/**
 * Simulate stage — evaluates assertions under operational contexts.
 */

import type { Assertion } from "./map.js";

export interface SimulationResult {
  assertion: Assertion;
  context: string;
  pass: boolean;
  adjustedThreshold?: number;
}

const CONTEXT_OVERRIDES: Record<string, Record<string, number>> = {
  desktop: {},
  mobile: { "touch-target": 44 },
  "keyboard-only": {},
};

export function simulate(assertions: Assertion[]): SimulationResult[] {
  const results: SimulationResult[] = [];

  for (const ctx of ["desktop", "mobile"]) {
    const overrides = CONTEXT_OVERRIDES[ctx] ?? {};
    for (const assertion of assertions) {
      const adjustedThreshold = overrides[assertion.signal.type] ?? assertion.threshold;
      const pass =
        typeof assertion.signal.value === "number"
          ? assertion.signal.value >= adjustedThreshold
          : assertion.pass;

      results.push({
        assertion,
        context: ctx,
        pass,
        adjustedThreshold: overrides[assertion.signal.type],
      });
    }
  }

  return results;
}
