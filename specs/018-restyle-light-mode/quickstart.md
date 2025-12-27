# Quickstart & Test Scenarios: Restyle Light Mode

## Setup

1. Switch to the `018-restyle-light-mode` branch.
2. Run `npm run dev`.
3. Open `http://localhost:3000/settings` and select "Light" theme.

## Manual Test Scenarios

### TS-001: Light Mode Visual Audit

- **Action**: Navigate to Dashboard, Vocabulary, Trainer, and Settings.
- **Expected**:
  - The background should be clean white.
  - Cards should have a soft shadow and a very subtle border.
  - Text must be clearly readable (high contrast).
  - Buttons and inputs should feel "modern" and less "harsh" than before.

### TS-002: Theme Independence (Dark Mode Regression)

- **Action**: Switch to "Dark" theme.
- **Expected**: Dark mode appearance must remain exactly as it was before the changes. Check borders, backgrounds, and shadows.

### TS-003: Contrast Verification

- **Action**: Use a contrast checker tool on core elements (text on card background, text on app background).
- **Expected**: All combinations must pass WCAG AA standards.

## Automated Verification

- Run `npm run lint` to ensure no styling violations.
- Run `npm run build` to verify no compilation errors.
