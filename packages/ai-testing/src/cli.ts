import { extract } from "./extract.js";
import { deriveSignals } from "./signals.js";
import { mapToAssertions } from "./map.js";
import { simulate } from "./simulate.js";
import { generate } from "./generate.js";
import { writeFileSync } from "fs";

const command = process.argv[2];

async function health() {
  const result = {
    status: "ok",
    pipeline: ["extract", "signals", "map", "simulate", "generate"],
    version: "0.1.0",
    timestamp: new Date().toISOString(),
  };
  writeFileSync("out/health.json", JSON.stringify(result, null, 2));
  console.log("Health check passed:", result);
}

async function run() {
  console.log("Running pipeline...");
  const metadata = await extract();
  const signals = deriveSignals(metadata);
  const assertions = mapToAssertions(signals);
  const results = simulate(assertions);
  const findings = generate(results);
  writeFileSync("out/findings.json", JSON.stringify(findings, null, 2));
  console.log(`Pipeline complete. ${findings.findings.length} findings generated.`);
}

switch (command) {
  case "health":
    health();
    break;
  case "run":
    run();
    break;
  case "extract":
    extract().then((data) => console.log(JSON.stringify(data, null, 2)));
    break;
  default:
    console.log("Usage: tsx src/cli.ts <health|run|extract>");
}
