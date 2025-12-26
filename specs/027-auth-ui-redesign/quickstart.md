# Quickstart: Auth UI Redesign Visual Audit

## 1. Local Development
1. Ensure the development server is running: `npm run dev`.
2. Navigate to `/login`.
3. Verify the following:
   - Form is contained within a standard `Card`.
   - Title uses the `Heading` component with `font-black`.
   - Submit button is the `playful` variant.
   - Entry animations (`containerReveal`) are smooth.

## 2. Animation Check
- Hover over the "Sign In" button; it should trigger the `bouncyButton` variant.
- Toggle between Login and Signup using the links at the bottom; check for consistent transitions.

## 3. Dark Mode
- Switch the system theme to dark and verify that the `Card` and `Input` components adapt correctly using the project's Tailwind colors.

## 4. Error Handling
- Enter invalid credentials to trigger an error.
- Verify the error message styling is consistent with other error toasts or inline alerts in the app.
