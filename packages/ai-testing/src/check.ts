import * as readline from "node:readline";
import { extract } from "./extract.js";
import { deriveSignals } from "./signals.js";
import { mapToAssertions } from "./map.js";
import { simulate } from "./simulate.js";
import { generate } from "./generate.js";
import { writeFileSync } from "fs";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> => new Promise((res) => rl.question(q, res));

console.log(`
╔══════════════════════════════════════════╗
║   Accessibility Healthcheck  v0.1.0      ║
║   AI-assisted a11y testing pipeline      ║
╚══════════════════════════════════════════╝
`);

async function main() {
  // Step 1: Figma URL
  const url = await ask("Figma URL (or Enter for sample data): ");
  const useSample = url.trim() === "";

  if (useSample) {
    console.log("→ Using sample data (Button component)\n");
  } else {
    console.log(`→ Captured URL: ${url.trim()}`);
    console.log("  Note: live Figma extraction not yet implemented — running with sample data\n");
  }

  // Step 2: Contexts
  console.log("Select contexts to evaluate:");
  console.log("  1. Desktop");
  console.log("  2. Mobile");
  console.log("  3. Keyboard-only");
  console.log("  4. All");
  const ctxChoice = await ask("Choice [4]: ");
  const ctxMap: Record<string, string[]> = {
    "1": ["desktop"],
    "2": ["mobile"],
    "3": ["keyboard-only"],
    "4": ["desktop", "mobile", "keyboard-only"],
    "": ["desktop", "mobile", "keyboard-only"],
  };
  const contexts = ctxMap[ctxChoice.trim()] ?? ["desktop", "mobile", "keyboard-only"];
  console.log(`→ Contexts: ${contexts.join(", ")}\n`);

  // Step 3: WCAG level
  console.log("Target WCAG conformance:");
  console.log("  1. AA  (standard)");
  console.log("  2. AAA (enhanced)");
  const levelChoice = await ask("Choice [1]: ");
  const level = levelChoice.trim() === "2" ? "AAA" : "AA";
  console.log(`→ Level: ${level}\n`);

  // Confirm
  console.log("─────────────────────────────────────");
  console.log(`  Source:   ${useSample ? "Sample data" : url.trim()}`);
  console.log(`  Contexts: ${contexts.join(", ")}`);
  console.log(`  Level:    ${level}`);
  console.log("─────────────────────────────────────");
  const confirm = await ask("\nRun check? [Y/n]: ");
  if (confirm.trim().toLowerCase() === "n") {
    console.log("Cancelled.");
    rl.close();
    return;
  }

  // Run pipeline
  console.log("\nRunning pipeline...");
  const metadata = await extract();
  console.log("  ✓ Extract");
  const signals = deriveSignals(metadata);
  console.log("  ✓ Signals");
  const assertions = mapToAssertions(signals);
  console.log("  ✓ Map");
  const results = simulate(assertions);
  console.log("  ✓ Simulate");
  const findings = generate(results);
  console.log("  ✓ Generate\n");

  writeFileSync("out/findings.json", JSON.stringify(findings, null, 2));

  // Summary
  const fails = findings.findings.filter((f) => !f.pass);
  const passes = findings.findings.filter((f) => f.pass);
  console.log(`Results: ${findings.findings.length} findings (${passes.length} pass, ${fails.length} fail)\n`);

  if (fails.length > 0) {
    console.log("Failures:");
    for (const f of fails) {
      console.log(`  [${f.severity.toUpperCase()}] ${f.description}`);
      console.log(`           WCAG ${f.wcag} | Context: ${f.context}`);
    }
    console.log();
  }

  console.log("Full results written to out/findings.json");
  rl.close();
}

main();
