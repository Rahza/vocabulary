# Tasks: System Bug Fixes & UI Refinements

**Spec**: [specs/008-fix-system-refinements/spec.md](specs/008-fix-system-refinements/spec.md)

## Dependencies

- **Phase 1: Setup**: Foundational UI component (ConfirmDialog)
- **Phase 2: Shuffling**: Core logic for US1
- **Phase 3: Reactivity**: Logic for US2
- **Phase 4: Navigation & Flow**: Integration for US3 and US4
- **Phase 5: Quality**: Global fixes and refinements

## Implementation Strategy

We will first implement the `ConfirmDialog` as it's a foundational component for multiple user stories. Then we will address the critical shuffling and reactivity bugs (P1). Finally, we'll improve navigation, fix the generator flow, and polish the remaining UI elements like progress bars and prompts.

---

## Phase 1: Setup & Foundational UI

**Goal**: Create reusable confirmation component.

- [x] T001 Create `ConfirmDialog` component in `src/components/ui/ConfirmDialog.tsx` using `framer-motion`
- [x] T002 Implement `useConfirm` hook or simple state-driven pattern for calling the dialog

## Phase 2: User Story 1 - Consistent Trainer Shuffling (P1)

**Goal**: Fix shuffling bugs and implement distancing rule.
**Independent Test**: Session items from the same word must be separated by at least 2 other items.

- [x] T003 Fix reference error in `src/lib/shuffle.ts` (replace `array` with `items`)
- [x] T004 Implement distancing logic in `smartShuffle` function within `src/lib/shuffle.ts`
- [x] T005 [US1] Call `smartShuffle` in `loadDueItems` within `src/app/trainer/page.tsx`
- [x] T006 Add unit test for distancing rule in `src/lib/shuffle.test.ts`

## Phase 3: User Story 2 - Smooth Mnemonic Regeneration (P1)

**Goal**: Ensure UI updates immediately after regeneration.
**Independent Test**: Click "Regenerate" and see text update without closing the drawer.

- [x] T007 [US2] Add local state `mnemonic` to `WordDetail` in `src/components/vocabulary/WordDetail.tsx` to handle immediate updates
- [x] T008 [US2] Sync local state when `item` prop changes in `src/components/vocabulary/WordDetail.tsx`

## Phase 4: User Story 3 - Robust Generator Navigation (P1)

**Goal**: Fix blank screen and replace OS alerts.
**Independent Test**: Discard suggestions and see the generator form reappear.

- [x] T009 [US3] Replace `confirm()` with `ConfirmDialog` in `src/app/generate/page.tsx`
- [x] T010 [US3] Fix conditional rendering in `src/app/generate/page.tsx` to ensure `GeneratorForm` shows when `generated` is empty

## Phase 5: User Story 4 - Discovery of Tag Management (P2)

**Goal**: Make Tag Manager easy to find.
**Independent Test**: Navigate to `/tags` from `/vocabulary`.

- [x] T011 [US4] Add "Manage Tags" button/link to the header or filter section in `src/app/vocabulary/page.tsx`

## Phase 6: Polish & Quality Audit

**Goal**: Fix remaining refinements and lint errors.

- [x] T012 Fix progress calculation logic in `src/app/trainer/page.tsx` (show `current/total`)
- [x] T013 Refine AI prompt in `src/services/ai/OpenAIService.ts` to request generic tags
- [x] T014 Replace remaining `confirm()` calls in `src/app/vocabulary/page.tsx` and `src/app/tags/page.tsx` with `ConfirmDialog`
- [x] T015 Run `npm run lint` and fix all remaining ESLint errors
- [x] T016 Verify all tests pass in non-interactive mode
