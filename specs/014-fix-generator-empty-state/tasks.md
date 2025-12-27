# Tasks: Generator Empty State Fix

**Spec**: [specs/014-fix-generator-empty-state/spec.md](specs/014-fix-generator-empty-state/spec.md)

## Dependencies

- **Phase 1: Component Refinement**: Foundational UI logic changes to support smoother transitions.
- **Phase 2: State Refactoring**: Core logic to fix the empty screen bug (US1, US2).
- **Phase 3: Quality & Polish**: Verification and final cleanup.

## Implementation Strategy

We will first modify the `GeneratedList` component to remain visible (even if empty) during transitions, which is the root cause of the flicker. Then, we will refactor the state management in the `GeneratePage` to ensure that data is only cleared _after_ the view has transitioned back to the form. This ensures visual continuity.

---

## Phase 1: Component Refinement

**Goal**: Prepare UI components for smoother state transitions.

- [x] T001 [P] Modify `src/components/generator/GeneratedList.tsx` to remove the early return `null` when items are empty
- [x] T002 Update `src/components/generator/GeneratedList.tsx` to handle empty item arrays gracefully during exit animations

## Phase 2: User Story 1 & 2 - Reliable State Transitions (Priority: P1)

**Goal**: Fix the blank screen bug during save and discard operations.
**Independent Test**: Generate vocabulary, click "Behalten!" (Save), and verify the form reappears without a blank screen flicker.

- [x] T003 [US1] Refactor `handleSave` in `src/app/generate/page.tsx` to switch `view` to 'form' before clearing `generated` list
- [x] T004 [US1] Refactor `handleConfirmDiscard` in `src/app/generate/page.tsx` to switch `view` to 'form' before clearing `generated` list
- [x] T005 [US2] Ensure that any error state in `handleGenerate` doesn't hide the form in `src/app/generate/page.tsx`
- [x] T006 [US1] Add a short delay or use an animation callback to clear the `generated` data only after the results list has unmounted in `src/app/generate/page.tsx`

## Phase 3: Polish & Quality Audit

**Goal**: Ensure zero regressions and full standard compliance.

- [x] T007 Run `npm run lint` and verify 0 new errors in the generator page
- [x] T008 [P] Add a simple unit test for the `GeneratePage` state transitions in a new test file (if feasible) or verify manually
- [x] T009 Verify that button disabled states are correctly synced with `isLoading` in `src/app/generate/page.tsx`
