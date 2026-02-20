# Testing Pack: Form Text Input

## Component
- **ID**: `text-field`
- **Category**: `inputs`
- **Design System**: [Your design system]
- **Storybook**: `inputs-textfield--docs`

## Description
Text input fields are a primary interaction point for data entry. They have a rich accessibility surface: labels, placeholder text, helper text, error messages, character counts, icons, and multiple states. This pack covers the full accessibility surface of a form text input.

## Variants to Test

| Variant | Props | States |
|---------|-------|--------|
| Default | `variant="default"` | default, hover, focus, active, disabled, readonly |
| With Label | `label="Field name"` | default, focus |
| With Helper Text | `helperText="Hint text"` | default, focus |
| With Error | `variant="error"`, `helperText="Error msg"` | error |
| With Character Count | `maxLength={100}` | default, approaching-limit, at-limit |
| With Icon (leading) | `leftAdornment={<Icon/>}` | default, focus |
| With Icon (trailing) | `rightAdornment={<Icon/>}` | default, focus |
| Multiline | `multiline`, `rows={3}` | default, focus |

## Assertions

### Color Contrast (WCAG 1.4.3 AA / 1.4.6 AAA)

- [ ] Label text meets 4.5:1 contrast against surface (AA)
- [ ] Input text (entered value) meets 4.5:1 contrast (AA)
- [ ] Placeholder text meets 4.5:1 contrast (note: many DS use lighter placeholder — verify)
- [ ] Helper text meets 4.5:1 contrast (AA)
- [ ] Error message text meets 4.5:1 contrast (AA)
- [ ] Input border meets 3:1 contrast against surface (1.4.11 AA, non-text)
- [ ] Focus ring meets 3:1 contrast against surrounding area (1.4.11 AA)
- [ ] Error state border/indicator meets 3:1 contrast (1.4.11 AA)
- [ ] Disabled state is visually distinguishable (no minimum ratio required)

### Touch Target (WCAG 2.5.8 AA / 2.5.5 AAA)

- [ ] Input field click/touch area >= 24px height (AA minimum, WCAG 2.5.8)
- [ ] Input field click/touch area >= 44px height (AAA enhanced, WCAG 2.5.5)
- [ ] Trailing icon action area >= 24x24px if interactive (AA minimum)
- [ ] Spacing between input and adjacent interactive elements is sufficient

### Labels (WCAG 1.3.1 / 4.1.2 / 3.3.2)

- [ ] Visible `<label>` is associated with input via `for`/`id` or wrapping
- [ ] `aria-label` or `aria-labelledby` present if no visible label
- [ ] Placeholder is NOT the sole accessible name
- [ ] Label text is descriptive (not just "Input" or "Field")
- [ ] Required fields are indicated (not by color alone)
- [ ] Required state is programmatically exposed (`aria-required` or `required`)

### Helper & Error Text (WCAG 3.3.1 / 3.3.2 / 3.3.3)

- [ ] Helper text is associated with input via `aria-describedby`
- [ ] Error message is associated with input via `aria-describedby` or `aria-errormessage`
- [ ] Error state sets `aria-invalid="true"` on the input
- [ ] Error is not communicated by color alone (icon, text, or border change required)
- [ ] Error message provides guidance for correction (WCAG 3.3.3)
- [ ] Error announcement reaches screen readers (live region or focus management)

### Keyboard (WCAG 2.1.1 / 2.4.3 / 2.4.7)

- [ ] Input is reachable via Tab key
- [ ] Focus indicator is visible and meets 2px minimum / 3:1 contrast
- [ ] Tab order follows visual layout (label → input → helper/error)
- [ ] Trailing icon actions are keyboard accessible (Tab or arrow key)
- [ ] Escape key behavior is defined if input has overlay (autocomplete, datepicker)

### State Communication (WCAG 4.1.2)

- [ ] Disabled state: `disabled` attribute or `aria-disabled="true"`
- [ ] Readonly state: `readonly` attribute or `aria-readonly="true"`
- [ ] Error state: `aria-invalid="true"`
- [ ] Required state: `required` or `aria-required="true"`
- [ ] Character count: announced to screen readers as value approaches limit

## Contexts

### Desktop (mouse + keyboard)
- Standard WCAG thresholds apply
- Focus management is critical
- Tab order and keyboard shortcuts matter

### Mobile (touch only)
- Touch target >= 44px height recommended (WCAG 2.5.5 AAA)
- On-screen keyboard should not obscure input or error messages
- Auto-zoom on focus should not break layout (font-size >= 16px)

### Keyboard-only
- All functionality must be operable without a pointer (WCAG 2.1.1)
- Focus indicator must be clearly visible (WCAG 2.4.7)
- No keyboard traps (WCAG 2.1.2)

## Anti-Paths

| Anti-Path | Check |
|-----------|-------|
| Placeholder-only label | Input has no `<label>`, relying on `placeholder` as accessible name |
| Color-only error | Error state uses only red border/text with no icon or `aria-invalid` |
| Missing `aria-describedby` | Helper/error text is visually present but not associated with input |
| Disabled with no explanation | Input is disabled but no context explains why or how to enable |
| Auto-advancing focus | Input auto-advances to next field (e.g. OTP) without announcing |
| Truncated error | Error message is clipped by container overflow |
| Icon-only action | Clear/toggle icon has no accessible label |

## Traceability

| Signal | Token | Figma | Story |
|--------|-------|-------|-------|
| Input border color | `--ds-color-border-default` | Node TBD | `inputs-textfield--default` |
| Label text color | `--ds-color-text-default` | Node TBD | `inputs-textfield--with-label` |
| Error border color | `--ds-color-border-danger` | Node TBD | `inputs-textfield--error` |
| Focus ring | `--ds-color-focus` | Node TBD | `inputs-textfield--focus` |
| Input height | `--ds-space-block` | Node TBD | `inputs-textfield--default` |

## Notes

- The text field component typically wraps a native `<input>` or `<textarea>`, so many ARIA attributes are handled natively. However, the connection between helper text and the input via `aria-describedby` must be verified.
- Character count behavior near the limit should be tested with screen readers to verify announcement timing and frequency.
- Multiline variant should verify that resize behavior doesn't break layout or obscure adjacent content.
