# Tasks: Auth UI Redesign

**Branch**: `027-auth-ui-redesign`
**Spec**: `specs/027-auth-ui-redesign/spec.md`

## Dependencies

- **Phase 1 (Setup)** is a prerequisite for all other phases.
- **Phase 2 (Login)** and **Phase 3 (Signup)** can be executed in any order, but Login is prioritized.
- **Phase 4 (Polish)** depends on the completion of both Login and Signup pages.

## Implementation Strategy

1. **Incremental Component Swapping**: Replace elements one by one (`Heading`, then `Card`, then `Button`) to ensure functional parity at each step.
2. **Standard Animation Wrapper**: Wrap the main content in a `motion.div` using `containerReveal` early to establish the visual flow.
3. **Utility Refactor**: Replace all custom gradients and flex values with Tailwind variables established in the project's v4 configuration.

## Phase 1: Setup

*Goal: Prepare the environment and components.*

- [x] T001 Audit `src/components/ui/Input.tsx` to ensure it's ready for use in auth forms.
- [x] T002 Verify `containerReveal` and `itemReveal` variants in `src/lib/animations.ts` match the dashboard behavior.

## Phase 2: [US1] Unified Login Experience

*Goal: Redesign the login page using standard UI components.*

- [x] T003 Replace custom title with `Heading` component in `src/app/[locale]/(auth)/login/page.tsx`.
- [x] T004 Wrap the login form in a `Card` component in `src/app/[locale]/(auth)/login/page.tsx`.
- [x] T005 Replace form submit button with `Button` (variant="playful") in `src/app/[locale]/(auth)/login/page.tsx`.
- [x] T006 [P] Replace raw email/password inputs with `Input` component in `src/app/[locale]/(auth)/login/page.tsx`.
- [x] T007 Apply `containerReveal` and `itemReveal` animations to form elements in `src/app/[locale]/(auth)/login/page.tsx`.
- [x] T008 Remove all hardcoded linear gradients and custom shadow classes from `src/app/[locale]/(auth)/login/page.tsx`.

## Phase 3: [US2] Unified Signup Experience

*Goal: Redesign the signup page using standard UI components.*

- [x] T009 Replace custom title with `Heading` component in `src/app/[locale]/(auth)/signup/page.tsx`.
- [x] T010 Wrap the signup form in a `Card` component in `src/app/[locale]/(auth)/signup/page.tsx`.
- [x] T011 Replace form submit button with `Button` (variant="playful") in `src/app/[locale]/(auth)/signup/page.tsx`.
- [x] T012 [P] Replace raw inputs with `Input` component in `src/app/[locale]/(auth)/signup/page.tsx`.
- [x] T013 Apply `containerReveal` and `itemReveal` animations to form elements in `src/app/[locale]/(auth)/signup/page.tsx`.
- [x] T014 Remove all hardcoded gradients and legacy styles from `src/app/[locale]/(auth)/signup/page.tsx`.

## Phase 4: [US3] Polish & Global Consistency

*Goal: Ensure seamless transitions and accessibility.*

- [x] T015 Ensure `bouncyButton` animation is correctly triggered on hover for all auth buttons.
- [x] T016 Verify accessibility labels (ARIA) are preserved after component replacement.
- [x] T017 Perform visual audit in both Light and Dark modes per `quickstart.md`.
- [x] T018 Run `npm run lint` to ensure zero style regressions.