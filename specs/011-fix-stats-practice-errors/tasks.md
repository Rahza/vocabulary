# Tasks: Stats Visualization & Practice Page Fixes

**Spec**: [specs/011-fix-stats-practice-errors/spec.md](specs/011-fix-stats-practice-errors/spec.md)

## Dependencies

- **Phase 1: Practice Page Fix**: Fixes critical runtime crash (US1).
- **Phase 2: Stats Visualization Fix**: Fixes visual regression in dashboard (US2).
- **Phase 3: Verification**: Quality check.

## Implementation Strategy

The priority is to restore functionality to the Practice page by fixing the missing import. Simultaneously, the CSS bug in the progress chart will be corrected by ensuring proper parent-child height relationships.

## Parallel Execution Examples

- **US1 Fix** and **US2 Fix** can be implemented in parallel as they touch different files (`src/app/practice/page.tsx` vs `src/components/dashboard/ProgressDistribution.tsx`).

---

## Phase 1: User Story 1 - Functional Practice Page (Priority: P1)

**Goal**: Eliminate the runtime ReferenceError on the Practice page.
**Independent Test**: Navigate to `/practice`, select a tag, and confirm no ReferenceError is thrown.

- [x] T001 [P] [US1] Import `containerReveal` and `itemReveal` from `@/lib/animations` in `src/app/practice/page.tsx`
- [x] T002 [US1] Verify that `Flashcard` and `SessionSummary` components in `src/app/practice/page.tsx` are correctly utilizing these variants

## Phase 2: User Story 2 - Visible Progress Visualization (Priority: P1)

**Goal**: Ensure progress bars have a visible, relative height.
**Independent Test**: Dashboard progress bars must have a height relative to their value (e.g., 50% count = half-filled bar).

- [x] T003 [P] [US2] Update the parent container of the `motion.div` bar to have an explicit height (e.g., `flex-1`) in `src/components/dashboard/ProgressDistribution.tsx`
- [x] T004 [US2] Ensure the outer flex container (`h-32`) correctly distributes space to the bar containers in `src/components/dashboard/ProgressDistribution.tsx`

## Phase 3: Polish & Quality Audit

**Goal**: Ensure no regressions and code cleanliness.

- [x] T005 [P] Run `npm run lint` and verify 0 new errors
- [x] T006 [P] Verify that no other components are missing imports from `@/lib/animations`
- [x] T007 Verify mobile responsiveness of the fixed progress chart
