/**
 * Map stage — maps signals to WCAG criteria and testable assertions.
 */

import type { Signal } from "./signals.js";

export interface Assertion {
  signal: Signal;
  wcag: string;
  level: "A" | "AA" | "AAA";
  threshold: number;
  pass: boolean;
}

const WCAG_MAP: Record<string, { wcag: string; level: "A" | "AA" | "AAA"; threshold: number }> = {
  "color-contrast": { wcag: "1.4.3", level: "AA", threshold: 4.5 },
  "touch-target": { wcag: "2.5.5", level: "AAA", threshold: 44 },
};

export function mapToAssertions(signals: Signal[]): Assertion[] {
  return signals.map((signal) => {
    const rule = WCAG_MAP[signal.type] ?? { wcag: "unknown", level: "AA" as const, threshold: 0 };
    return {
      signal,
      wcag: rule.wcag,
      level: rule.level,
      threshold: rule.threshold,
      pass: typeof signal.value === "number" ? signal.value >= rule.threshold : true,
    };
  });
}
