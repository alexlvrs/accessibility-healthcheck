# Testing Pack: Login Page

## Page
- **URL**: `https://example.com/login`
- **Type**: Authentication form
- **Critical path**: Yes — blocks all authenticated functionality

## Description
A standard login page with email and password fields, a submit button, a "forgot password" link, and an optional social sign-in section. Login pages are high-traffic, high-stakes surfaces where accessibility failures directly prevent access.

## Elements to Test

| Element | Role | States |
|---------|------|--------|
| Email input | `textbox` | default, focus, error, disabled |
| Password input | `textbox` (type=password) | default, focus, error, show/hide toggle |
| Show password toggle | `button` | default, toggled |
| Submit button | `button` | default, hover, focus, loading, disabled |
| Forgot password link | `link` | default, hover, focus |
| Social sign-in buttons | `button` | default, hover, focus |
| Error banner | `alert` | hidden, visible |

## Assertions

### Color Contrast (WCAG 1.4.3 AA / 1.4.6 AAA)

- [ ] Label text meets 4.5:1 contrast against background (AA)
- [ ] Input text meets 4.5:1 contrast (AA)
- [ ] Placeholder text meets 4.5:1 contrast
- [ ] Error message text meets 4.5:1 contrast (AA)
- [ ] Submit button text meets 4.5:1 contrast against button background (AA)
- [ ] Link text meets 4.5:1 contrast and is distinguishable from surrounding text
- [ ] Input borders meet 3:1 contrast against surface (1.4.11 AA)
- [ ] Focus indicators meet 3:1 contrast (1.4.11 AA)

### Touch Target (WCAG 2.5.8 AA / 2.5.5 AAA)

- [ ] Email input >= 24px height (AA minimum)
- [ ] Password input >= 24px height (AA minimum)
- [ ] Submit button >= 24x24px (AA minimum), ideally >= 44x44px (AAA)
- [ ] Show/hide password toggle >= 24x24px
- [ ] Social sign-in buttons >= 24x24px
- [ ] Adequate spacing between interactive elements (>= 8px)

### Labels (WCAG 1.3.1 / 4.1.2 / 3.3.2)

- [ ] Email field has a visible `<label>` or `aria-label`
- [ ] Password field has a visible `<label>` or `aria-label`
- [ ] Placeholder is not the sole accessible name
- [ ] Submit button has a descriptive accessible name (not just "Submit")
- [ ] Show/hide password toggle has an accessible label that updates with state
- [ ] Social sign-in buttons have descriptive labels (e.g. "Sign in with Google", not just an icon)

### Error Handling (WCAG 3.3.1 / 3.3.3)

- [ ] Invalid email sets `aria-invalid="true"` on the input
- [ ] Error messages are associated via `aria-describedby` or `aria-errormessage`
- [ ] Error is not communicated by color alone (icon, text, or border change required)
- [ ] Error banner uses `role="alert"` or `aria-live="assertive"` for screen reader announcement
- [ ] Error messages provide guidance (e.g. "Enter a valid email address", not just "Invalid")
- [ ] After failed login, focus moves to the error message or first invalid field

### Keyboard (WCAG 2.1.1 / 2.4.3 / 2.4.7)

- [ ] All interactive elements reachable via Tab
- [ ] Tab order: email → password → show/hide toggle → forgot password → submit → social sign-in
- [ ] Enter key submits the form from either input field
- [ ] Focus indicator is visible on all interactive elements
- [ ] No keyboard traps (WCAG 2.1.2)
- [ ] Show/hide password toggle works with Enter and Space

### State Communication (WCAG 4.1.2)

- [ ] Loading state on submit button is announced (e.g. `aria-busy="true"` or live region)
- [ ] Disabled state uses `disabled` attribute or `aria-disabled="true"`
- [ ] Password visibility state is communicated (toggle label updates)

### Page Structure (WCAG 1.3.1 / 2.4.2)

- [ ] Page has a descriptive `<title>` (e.g. "Log in — Example App")
- [ ] Form has a heading (h1 or h2) identifying it as the login form
- [ ] Landmark regions are used (`<main>`, `<form>`)
- [ ] Language attribute set on `<html>`

## Contexts

### Desktop (mouse + keyboard)
- Standard WCAG thresholds apply
- Tab order and keyboard shortcuts are critical
- Password managers should be able to fill fields (no `autocomplete="off"`)

### Mobile (touch only)
- Touch targets >= 44px recommended (AAA)
- On-screen keyboard should not obscure inputs or the submit button
- Input type should trigger appropriate keyboard (`type="email"`, `type="password"`)
- Auto-zoom on focus should not break layout (font-size >= 16px)

### Keyboard-only
- Full form completion possible without a pointer
- Focus indicator clearly visible throughout the flow
- Enter key submits from any input

## Anti-Paths

| Anti-Path | Check |
|-----------|-------|
| Placeholder-only labels | Inputs rely on placeholder text as the only label |
| Color-only error | Invalid fields shown only with a red border, no text or icon |
| Missing error association | Error text is visible but not linked to the input via ARIA |
| Icon-only toggle | Show/hide password button is an eye icon with no accessible name |
| Auto-submit on paste | Form submits immediately when pasting credentials, with no confirmation |
| Focus lost after error | After failed submission, focus is not managed — user is stranded |
| Timeout with no warning | Session times out on the login page with no advance notice |

## Traceability

| Signal | Element | Check |
|--------|---------|-------|
| Email label contrast | `<label for="email">` | 4.5:1 against background |
| Submit button size | `<button type="submit">` | >= 24x24px (AA) |
| Error announcement | Error banner | `role="alert"` or `aria-live` present |
| Tab order | All interactive elements | Logical top-to-bottom sequence |
| Password toggle label | Show/hide button | Label updates on toggle |

## Notes

- Login pages are often the first interaction with an app. Accessibility failures here block everything downstream.
- Test with a screen reader (VoiceOver, NVDA) to verify the full login flow is announced correctly.
- Verify that CAPTCHA, if present, has an accessible alternative (WCAG 1.1.1).
- Check that "remember me" checkbox, if present, has a visible label and is keyboard accessible.
