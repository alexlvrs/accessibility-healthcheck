# Architecture

## System Overview

```
 Design System Sources              Pipeline                    Output
 ┌─────────────┐
 │    Figma     │──┐
 └─────────────┘  │    ┌─────────┐   ┌─────────┐   ┌─────┐   ┌──────────┐   ┌──────────┐
 ┌─────────────┐  ├──▶ │ Extract │──▶│ Signals │──▶│ Map │──▶│ Simulate │──▶│ Generate │
 │  Storybook  │──┤    └─────────┘   └─────────┘   └─────┘   └──────────┘   └──────────┘
 └─────────────┘  │                                                              │
 ┌─────────────┐  │                                                              ▼
 │   Tokens    │──┘                                                     ┌──────────────┐
 └─────────────┘                                                        │   Findings   │
                                                                        └──────────────┘
```

## Pipeline Stages

### 1. Extract (`src/extract.ts`)

Pulls component metadata from design system sources:

- **Figma** — Node properties, fills, spacing, dimensions, variant definitions
- **Storybook** — Story metadata, args, controls, rendered states
- **Tokens** — Design token values (colors, spacing, typography, sizing)

Output: Raw component metadata keyed by component identifier.

### 2. Signals (`src/signals.ts`)

Derives accessibility-relevant signals from extracted metadata:

- Color contrast ratios (foreground/background pairs)
- Touch target dimensions (width, height vs WCAG minimums)
- Spacing between interactive elements
- Label presence and quality (visible label, aria-label, placeholder-only)
- Keyboard interaction model (tab order, key handlers, focus trap)
- State representations (disabled, error, loading, readonly)

Output: Typed signal array with source traceability.

### 3. Map (`src/map.ts`)

Maps signals to WCAG success criteria and testable assertions:

| Signal          | WCAG SC   | Level | Assertion                              |
|-----------------|-----------|-------|----------------------------------------|
| Color contrast  | 1.4.3     | AA    | Ratio >= 4.5:1 (normal text)           |
| Color contrast  | 1.4.6     | AAA   | Ratio >= 7:1 (normal text)             |
| Non-text contrast | 1.4.11  | AA    | Ratio >= 3:1 (UI components)           |
| Touch target    | 2.5.8     | AA    | Min 24x24 CSS px                       |
| Touch target    | 2.5.5     | AAA   | Min 44x44 CSS px                       |
| Spacing         | 2.5.8     | AA    | Sufficient spacing or min target size  |
| Label           | 1.3.1     | A     | Programmatic name exists               |
| Keyboard        | 2.1.1     | A     | All functions keyboard-operable        |
| Focus           | 2.4.7     | AA    | Focus indicator visible                |
| State           | 4.1.2     | A     | States programmatically exposed        |

Output: Assertion set with WCAG references.

### 4. Simulate (`src/simulate.ts`)

Evaluates assertions under different operational contexts:

- **Desktop** — Standard browser, keyboard + mouse
- **Mobile** — Touch-only, smaller viewport
- **Keyboard-only** — No pointer device
- **Low bandwidth** — Delayed loading, progressive disclosure

Each context may adjust thresholds (e.g. mobile may enforce stricter touch target sizing) or add context-specific checks.

Output: Evaluated assertion results per context.

### 5. Generate (`src/generate.ts`)

Produces structured findings from simulation results:

- Assigns severity (Critical / Major / Minor / Info)
- Attaches evidence (token values, computed dimensions, contrast ratios)
- Maps to WCAG criteria with references
- Generates remediation recommendations
- Flags findings that require human verification

Output: Findings JSON conforming to `findings.schema.json`.

## Data Flow

All data between stages is structured JSON conforming to schemas in `packages/schemas/`. This enables:

- **Validation** — Each stage's output can be validated against its schema
- **Composability** — Stages can be run independently or composed into pipelines
- **Portability** — Testing packs and findings are portable across projects

## Testing Packs

Testing packs (`packages/testing-packs/`) define **what** to test. The pipeline defines **how** to test it. A testing pack for a form input component specifies:

- Which variants to extract (default, error, disabled, readonly)
- Which signals matter (label, contrast, touch target, error messaging)
- Which contexts to simulate (desktop, mobile, keyboard-only)
- Which anti-paths to check (placeholder-only labels, color-only errors)

The pipeline consumes a testing pack and produces findings.
