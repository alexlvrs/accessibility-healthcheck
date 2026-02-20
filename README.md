# AI-Assisted Accessibility Testing 

A repeatable, design-system-rooted methodology for AI-assisted usability and accessibility testing.

## What This Does

Connects design system usage (Figma) to component reality (Storybook) and produces **traceable signals** — from component to pattern to token to story — covering both happy-path and anti-path scenarios.

**Context-aware**: operational inputs (mobile, low bandwidth, constrained environments, time pressure) shape what gets tested and when human validation is required. AI handles systematic coverage and consistency; humans confirm lived experience and make decisions.

## Project Structure

```
ai-testing-poc/
  apps/
    docs/                     # Architecture and concept documentation
  packages/
    schemas/                  # JSON schemas for all data structures
      examples/               # Example data conforming to schemas
    ai-testing/               # CLI tool for running test pipelines
      src/                    # Source modules (extract, signals, map, simulate, generate)
      out/                    # Pipeline output
    testing-packs/            # Reusable test pack definitions
      templates/              # Template for authoring new packs
      examples/               # Example testing packs
```

## Core Pipeline

```
Extract  -->  Signals  -->  Map  -->  Simulate  -->  Generate
```

1. **Extract** — Pull component metadata from design system sources (Figma, Storybook, tokens)
2. **Signals** — Derive accessibility and usability signals (WCAG 2.x contrast ratio + APCA Lc) from extracted data
3. **Map** — Map signals to testable assertions and WCAG criteria (including WCAG 3.0-draft APCA thresholds)
4. **Simulate** — Run context-aware simulations (e.g. mobile touch, low-vision, keyboard-only)
5. **Generate** — Produce structured findings with severity, evidence, and recommendations

## Key Concepts

- **Testing Pack** — A reusable, portable definition of what to test for a given component pattern
- **Component Map** — Links design system components to their Figma nodes, Storybook stories, and tokens
- **Context** — Operational conditions that affect how accessibility is evaluated
- **Findings** — Structured output with traceable evidence, mapped to WCAG criteria

## Accessibility Standards

### WCAG 2.2

Based on [WCAG 2.2](https://www.w3.org/TR/WCAG22/):

- **1.4.3** Contrast (Minimum) — 4.5:1 for normal text, 3:1 for large text (Level AA)
- **1.4.6** Contrast (Enhanced) — 7:1 for normal text, 4.5:1 for large text (Level AAA)
- **1.4.11** Non-text Contrast — 3:1 for UI components and graphical objects (Level AA)
- **2.1.1** Keyboard — All functionality operable via keyboard (Level A)
- **2.4.3** Focus Order — Logical and meaningful navigation sequence (Level A)
- **2.4.7** Focus Visible — Keyboard focus indicator is visible (Level AA)
- **2.5.5** Target Size (Enhanced) — 44x44 CSS pixels minimum (Level AAA)
- **2.5.8** Target Size (Minimum) — 24x24 CSS pixels minimum (Level AA)
- **3.3.1** Error Identification — Errors are identified and described in text (Level A)
- **3.3.2** Labels or Instructions — Input fields have labels or instructions (Level A)
- **4.1.2** Name, Role, Value — Programmatic name and role for all UI components (Level A)

### APCA (WCAG 3.0 Draft)

Based on [WCAG 3.0 (draft)](https://www.w3.org/TR/wcag-3.0/) and the [APCA algorithm](https://git.apcacontrast.com/):

- **APCA Contrast** — Perceptually uniform contrast using the Lightness Contrast (Lc) scale
- **Polarity-aware** — Dark-on-light and light-on-dark produce different Lc values (positive and negative respectively)
- **Threshold** — |Lc 60| minimum for body text (16px, weight 400); reported alongside WCAG 2.x ratio for each color pair

## Getting Started

```bash
cd packages/ai-testing
pnpm install
pnpm run health
```

**Interactive check** — walk through prompts to configure and run:
```bash
pnpm run check
```

**AI-guided** — open the project in [Claude Code](https://docs.anthropic.com/en/docs/claude-code). The `CLAUDE.md` file will guide the conversation through an accessibility review.

See [SETUP.md](SETUP.md) for the full setup guide including Figma MCP configuration.

## Design Principles

1. **Traceable** — Every finding links back to a component, token, or story
2. **Context-aware** — Operational conditions shape what gets tested
3. **Human-in-the-loop** — AI identifies; humans validate and decide
4. **Design-system-rooted** — Tests derive from the design system, not ad-hoc rules
5. **Portable** — Testing packs work across projects using the same design system
