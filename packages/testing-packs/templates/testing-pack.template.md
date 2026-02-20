# Testing Pack: [Component Name]

## Component
- **ID**: `[component-id]`
- **Category**: `[data-display | feedback | inputs | navigation | surfaces]`
- **Design System**: [Design system name]

## Variants to Test
| Variant | Props | States |
|---------|-------|--------|
| Default | — | default, hover, focus, active, disabled |
| [Variant] | [props] | [states] |

## Assertions

### Color Contrast (WCAG 1.4.3 AA / 1.4.6 AAA)
- [ ] All text meets 4.5:1 ratio against background (AA)
- [ ] Large text (18pt+ or 14pt+ bold) meets 3:1 ratio (AA)
- [ ] Non-text elements meet 3:1 ratio — icons, borders (1.4.11 AA)
- [ ] Disabled states are exempt but must be distinguishable

### Touch Target (WCAG 2.5.8 AA / 2.5.5 AAA)
- [ ] Interactive area >= 24x24 CSS px (AA minimum, WCAG 2.5.8)
- [ ] Interactive area >= 44x44 CSS px (AAA enhanced, WCAG 2.5.5)
- [ ] Sufficient spacing between adjacent targets

### Labels (WCAG 1.3.1 / 4.1.2 / 3.3.2)
- [ ] Programmatic accessible name exists
- [ ] Visible label matches accessible name
- [ ] Placeholder is not the sole label

### Keyboard (WCAG 2.1.1 / 2.4.3 / 2.4.7)
- [ ] Component is reachable via Tab
- [ ] Component is activatable via Enter/Space
- [ ] Focus indicator is visible (2.4.7 AA)
- [ ] Focus order is logical (2.4.3 A)

### State Communication (WCAG 4.1.2)
- [ ] Disabled state is programmatically exposed
- [ ] Error state includes message (not color alone)
- [ ] Loading state is announced to screen readers

## Contexts
- [ ] Desktop (mouse + keyboard)
- [ ] Mobile (touch only)
- [ ] Keyboard-only (no pointer)

## Anti-Paths
| Anti-Path | Check |
|-----------|-------|
| [Known misuse] | [What to verify] |

## Notes
[Additional context, edge cases, or caveats]
