# Overview

## Problem

Accessibility testing is often manual, inconsistent, and disconnected from the design system that defines how components should behave. Teams check individual pages but miss systemic patterns — a button that passes contrast in isolation may fail when placed on a themed surface, or a touch target that works on desktop becomes unusable on mobile.

## Approach

This project creates a **repeatable, design-system-rooted methodology** for AI-assisted accessibility testing. Instead of testing pages, we test **patterns** — the reusable building blocks that compose every screen.

### What AI Does

- Systematic extraction of component metadata (tokens, props, variants, states)
- Signal derivation (contrast ratios, touch targets, spacing, keyboard flow)
- Consistency checks across variants and contexts
- Structured finding generation with WCAG mapping

### What Humans Do

- Validate findings against lived experience
- Confirm contextual relevance (e.g. "is this used on mobile or in constrained environments?")
- Make severity and priority decisions
- Verify assistive technology behavior that AI cannot simulate

## Scope

The PoC focuses on **input components** (buttons, text fields, selectors) as they have the richest accessibility surface: labels, states, error handling, keyboard interaction, touch targets, and context sensitivity.

## Pipeline

The core pipeline runs five stages:

1. **Extract** — Component metadata from Figma, Storybook, and token definitions
2. **Signals** — Accessibility-relevant signals derived from metadata
3. **Map** — Signals mapped to WCAG criteria and testable assertions
4. **Simulate** — Context-aware evaluation (mobile, low-vision, keyboard-only)
5. **Generate** — Structured findings with severity, evidence, and recommendations
