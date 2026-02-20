# Glossary

## A

**Anti-path** — A known failure mode or misuse pattern that a testing pack explicitly checks for. The inverse of a happy path.

**Assertion** — A specific, testable accessibility check (e.g. "contrast ratio >= 4.5:1 for normal text").

## C

**Component map** — A data structure linking a design system component to its Figma node, Storybook story, tokens, and code implementation.

**Context** — Operational conditions (desktop, mobile, low-vision, keyboard-only) that affect accessibility thresholds and what gets tested.

**Confidence** — Whether a finding has been AI-assessed only or human-verified. Affects how the finding should be treated in reporting.

## D

**Design system** — A collection of reusable components, tokens, and guidelines that define how digital products are built consistently.

**Design token** — A named value (color, spacing, typography) used across a design system to ensure consistency.

## E

**Extract** — Pipeline stage that pulls component metadata from design system sources.

## F

**Finding** — A structured accessibility observation with severity, evidence, WCAG mapping, and recommendation.

## G

**Generate** — Pipeline stage that produces structured findings from simulation results.

## H

**Happy path** — The expected, correct usage of a component that should pass all accessibility checks.

## M

**Map** — Pipeline stage that maps derived signals to WCAG criteria and testable assertions.

## P

**Pipeline** — The five-stage process: Extract → Signals → Map → Simulate → Generate.

## S

**Signal** — An accessibility-relevant data point derived from component metadata (contrast ratio, touch target size, label presence).

**Simulate** — Pipeline stage that evaluates signals under different operational contexts.

## T

**Testing pack** — A reusable definition of what to test for a given component pattern, including variants, assertions, contexts, and anti-paths.

**Traceability** — The ability to link a finding back through the pipeline to its source component, token, or story.

## W

**WCAG** — Web Content Accessibility Guidelines. This project targets [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA as baseline, with Level AAA checks where applicable.
