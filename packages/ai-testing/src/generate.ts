/**
 * Generate stage — produces structured findings from simulation results.
 */

import type { SimulationResult } from "./simulate.js";

interface Finding {
  id: string;
  signal: string;
  severity: "critical" | "major" | "minor" | "info";
  wcag: string;
  context: string;
  pass: boolean;
  description: string;
}

interface Findings {
  meta: { timestamp: string; version: string };
  findings: Finding[];
}

function severity(result: SimulationResult): "critical" | "major" | "minor" | "info" {
  if (result.pass) return "info";
  if (result.context === "mobile") return "major";
  return "minor";
}

export function generate(results: SimulationResult[]): Findings {
  let counter = 0;
  const findings: Finding[] = results.map((r) => ({
    id: `f-${String(++counter).padStart(3, "0")}`,
    signal: r.assertion.signal.type,
    severity: severity(r),
    wcag: r.assertion.wcag,
    context: r.context,
    pass: r.pass,
    description: r.pass
      ? `${r.assertion.signal.type} passes in ${r.context} context (${r.assertion.signal.value}${r.assertion.signal.unit ?? ""})`
      : `${r.assertion.signal.type} fails in ${r.context} context: ${r.assertion.signal.value}${r.assertion.signal.unit ?? ""} < ${r.adjustedThreshold ?? r.assertion.threshold}`,
  }));

  return {
    meta: { timestamp: new Date().toISOString(), version: "0.1.0" },
    findings,
  };
}
