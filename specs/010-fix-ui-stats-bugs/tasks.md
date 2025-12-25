# Tasks: UI & Stats Bug Fixes

**Spec**: [specs/010-fix-ui-stats-bugs/spec.md](specs/010-fix-ui-stats-bugs/spec.md)

## Dependencies

- **Phase 1: Foundational**: Repository fixes must precede UI updates to ensure data accuracy.
- **Phase 2: Tag Manager**: UI redesign for mobile responsiveness.
- **Phase 3: Dashboard**: UI updates to display accurate global stats.

## Implementation Strategy

We will first fix the core logic in the repository to ensure that "Total Words" reflects the actual number of unique vocabulary items. This prevents double-counting early in the pipeline. Next, we will address the Tag Manager's layout issues on small screens. Finally, we will update the Dashboard components to use the corrected statistics.

---

## Phase 1: Foundational (Repository & Data)

**Goal**: Fix the statistics aggregation logic.

- [x] T001 Update `getStats` in `src/services/storage/LocalStorageRepository.ts` to include a global count of unique words
- [x] T002 Verify `getStats` avoids double-counting words with multiple directions or tags in the global summary
- [x] T003 Ensure `getAllVocabulary().length` is used as the source of truth for total word count in `src/services/storage/LocalStorageRepository.ts`

## Phase 2: User Story 1 - Responsive Tag Manager (Priority: P1)

**Goal**: Fix the Tag Manager layout for small screens.
**Independent Test**: Open `/tags` on mobile; each tag should occupy its own row with visible edit/delete icons.

- [x] T004 [US1] Update `src/components/tags/TagList.tsx` grid classes to enforce `grid-cols-1` below the 640px breakpoint
- [x] T005 [US1] Reduce horizontal padding and adjust gaps in `src/components/tags/TagList.tsx` for mobile view
- [x] T006 [US1] Ensure tag name truncation in `src/components/tags/TagList.tsx` still leaves room for action buttons on narrow screens

## Phase 3: User Story 2 - Accurate Collection Stats (Priority: P1)

**Goal**: Update the Dashboard to display corrected statistics.
**Independent Test**: Dashboard "Total Words" must match the actual count of unique items in the repository.

- [x] T007 [US2] Update `src/components/dashboard/StatsOverview.tsx` to receive and display the corrected global total count
- [x] T008 [US2] Remove the summing logic (`.reduce`) for global totals in `src/components/dashboard/StatsOverview.tsx` to avoid double-counting
- [x] T009 [US2] Update `src/app/page.tsx` to fetch and pass the authoritative global count from the repository

## Phase 4: Polish & Quality Audit

**Goal**: Final verification and consistency.

- [x] T010 [P] Verify layout stability in Tag Manager during tag editing on mobile
- [x] T011 [P] Audit all dashboard labels for German localization consistency
- [x] T012 Run `npm run lint` and verify build success
