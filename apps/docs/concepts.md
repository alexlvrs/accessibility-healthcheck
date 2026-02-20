# Core Concepts

## Testing Pack

A **testing pack** is a reusable, portable definition of what to test for a given component pattern. It encodes:

- **Component identity** — What component or pattern this pack covers
- **Variants** — Which variants, states, and configurations to evaluate
- **Assertions** — Specific accessibility checks to run (contrast, spacing, labels, keyboard)
- **Contexts** — Operational conditions to simulate (desktop, mobile, constrained)
- **Anti-paths** — Known failure modes and misuse patterns to check for

Testing packs are authored in Markdown for readability and can be consumed by both humans and AI tooling.

### Happy Paths vs Anti-Paths

- **Happy paths** verify correct behavior: "A button with a visible label meets contrast requirements"
- **Anti-paths** check for known failure modes: "A button used as a link loses keyboard semantics"

## Component Map

A **component map** links a design system component to its concrete implementations:

| Layer       | Example                              |
|-------------|--------------------------------------|
| Figma       | Node ID, variant properties          |
| Storybook   | Story ID, args, controls             |
| Tokens      | Color, spacing, typography tokens    |
| Code        | React component, props, types        |

The map enables **traceability** — a finding about a contrast ratio can be traced from the Figma fill token to the CSS variable to the Storybook story where it renders.

## Context

A **context** defines the operational conditions under which a component is evaluated. Contexts affect which signals matter and what thresholds apply.

| Context             | Impact                                                       |
|---------------------|--------------------------------------------------------------|
| Desktop             | Standard keyboard + mouse interaction                        |
| Mobile              | Touch-only, smaller viewport, on-screen keyboard             |
| Low vision          | Increased contrast needs, zoom/magnification behavior        |
| Keyboard-only       | All functionality must be operable without a pointer          |
| Low bandwidth       | Loading states and progressive disclosure matter              |
| Constrained env.    | Reduced dexterity, larger touch targets needed               |

## Signals

A **signal** is an accessibility-relevant data point derived from component metadata:

- **Color contrast** — Foreground/background luminance ratio (WCAG 1.4.3 / 1.4.6)
- **Touch target** — Interactive element dimensions (WCAG 2.5.5 / 2.5.8)
- **Spacing** — Distance between interactive elements (WCAG 2.5.8)
- **Label** — Presence and quality of accessible names (WCAG 1.3.1 / 4.1.2)
- **Keyboard** — Focus order, tab behavior, key handlers (WCAG 2.1.1 / 2.4.3)
- **State** — Disabled, error, loading, readonly representations (WCAG 4.1.2)

Signals are the bridge between raw component data and WCAG criteria.

## Findings

A **finding** is a structured accessibility observation:

```
Component  →  Signal  →  WCAG Criterion  →  Severity  →  Evidence  →  Recommendation
```

Findings include:
- **Severity** — Critical, Major, Minor, Info
- **Confidence** — AI-assessed vs human-verified
- **Evidence** — Token values, screenshots, computed styles
- **Context** — Which operational conditions trigger the finding
- **Recommendation** — Specific remediation guidance
