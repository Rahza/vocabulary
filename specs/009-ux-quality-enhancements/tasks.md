# Tasks: UX Quality Enhancements

**Spec**: [specs/009-ux-quality-enhancements/spec.md](specs/009-ux-quality-enhancements/spec.md)

## Dependencies

- **Phase 1: Setup**: Prerequisite for US3 (Analytics) and foundational logic.
- **Phase 2: Typo Helper**: High priority functional improvement (US1).
- **Phase 3: Analytics**: Dashboard and stats improvements (US3).
- **Phase 4: Tag Manager**: UI layout refinements (US2).
- **Phase 5: Polish**: Consistency and bug fixes.

## Implementation Strategy

We will start by laying the technical foundation (Levenshtein utility and data model expansions). Then we will implement the high-priority Typo Helper to improve the learning experience immediately. Next, we will tackle the analytical components for the dashboard, followed by the responsive redesign of the Tag Manager.

---

## Phase 1: Setup & Foundational Extensions

**Goal**: Establish utilities and data structures for refinements.

- [x] T001 Implement `getLevenshteinDistance` utility in `src/lib/string.ts`
- [x] T002 [P] Update `TagStats` interface in `src/models/types.ts` to include `boxDistribution`
- [x] T003 Update `LocalStorageRepository.getStats` in `src/services/storage/LocalStorageRepository.ts` to calculate full box distribution

## Phase 2: User Story 1 - Typo Assistance (Priority: P1)

**Goal**: Detect 1-character typos and allow user correction.
**Independent Test**: Enter "Ahox" for "Ahoj"; system shows typo warning and allows re-entry.

- [x] T004 [US1] Update `Flashcard` component in `src/components/trainer/Flashcard.tsx` to handle `typo` result state
- [x] T005 [US1] Implement typo check logic in `handleAnswer` within `src/app/trainer/page.tsx`
- [x] T006 [US1] Implement typo check logic in `handleAnswer` within `src/app/practice/page.tsx`
- [x] T007 [P] [US1] Add unit tests for typo detection logic in `src/lib/string.test.ts`

## Phase 3: User Story 3 - Detailed Progress Analytics (Priority: P2)

**Goal**: Show granular breakdown of items per Leitner box.
**Independent Test**: Dashboard shows counts for each Box (1-5) correctly.

- [x] T008 [P] [US3] Create `ProgressDistribution` component in `src/components/dashboard/ProgressDistribution.tsx`
- [x] T009 [US3] Integrate `ProgressDistribution` into `src/components/dashboard/StatsOverview.tsx`
- [x] T010 [US3] Update Dashboard page in `src/app/page.tsx` to pass the expanded stats to components

## Phase 4: User Story 2 - Usable Tag Manager (Priority: P2)

**Goal**: Redesign Tag Manager for better accessibility and responsiveness.
**Independent Test**: Verify buttons are visible and not overlapping on screens as narrow as 320px.

- [x] T011 [US2] Redesign `TagList` component in `src/components/tags/TagList.tsx` using responsive grid and `min-width: 0`
- [x] T012 [US2] Ensure "Edit" and "Delete" actions are always accessible (not just on hover)

## Phase 5: Trainer Refinement & Shuffling

**Goal**: Improve shuffling quality.

- [x] T013 Implement buffered distancing logic in `smartShuffle` within `src/lib/shuffle.ts`
- [x] T014 [P] Add unit test for advanced distancing in `src/lib/shuffle.test.ts`

## Phase 6: Polish & Quality Audit

**Goal**: Final cleanup and consistency check.

- [x] T015 Run `npm run lint` and fix any new issues
- [x] T016 Verify mobile touch targets for all redesigned Tag Manager buttons
- [x] T017 Verify German localization for "Typo detected" and other new UI strings
