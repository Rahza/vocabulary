# Tasks: Tag Management & Progress Visualization Refinement

**Spec**: [specs/012-ui-tag-box-refinement/spec.md](specs/012-ui-tag-box-refinement/spec.md)

## Dependencies

- **Phase 1: Setup**: Must complete before any UI updates.
- **Phase 2: Tag Manager (US1)**: Independent of box refinements.
- **Phase 3: Progress Visualization (US2)**: Depends on Phase 1 constants.

## Implementation Strategy

We will first centralize the box definitions to ensure UI consistency. Then we will fix the urgent usability issue in the Tag Manager (US1). Finally, we will roll out the playful box names and icons across the dashboard and detail views (US2).

---

## Phase 1: Setup

**Goal**: Establish centralized constants for the new box naming scheme.

- [x] T001 [P] Create `src/constants/box-definitions.ts` with the `BOX_DEFINITIONS` mapping (🌱 Keimling to 🏆 Meister)

## Phase 2: User Story 1 - Single-Column Tag Manager (Priority: P1)

**Goal**: Redesign Tag Manager for visibility and management ease.
**Independent Test**: Open `/tags`; verify one tag per row and names are clearly visible.

- [x] T002 [US1] Update `src/components/tags/TagList.tsx` to use a strict single-column grid (`grid-cols-1`)
- [x] T003 [US1] Remove typography classes (e.g., `tracking-widest`) that cause text clipping in `src/components/tags/TagList.tsx`
- [x] T004 [US1] Ensure `min-w-0` and proper flex properties are set on the tag name container in `src/components/tags/TagList.tsx`

## Phase 3: User Story 2 - Playful Leitner Boxes (Priority: P2)

**Goal**: Replace numbers with descriptive names and icons.
**Independent Test**: Dashboard and Word Detail show "🌳 Jungbaum" or similar instead of "Box 3".

- [x] T005 [US2] Update `src/components/dashboard/ProgressDistribution.tsx` to use icons and names from `BOX_DEFINITIONS`
- [x] T006 [US2] Update `src/components/vocabulary/WordDetail.tsx` to show descriptive box names and icons
- [x] T007 [US2] Update mastered status label in `src/components/dashboard/StatsOverview.tsx` to align with the "Meister" theme

## Phase 4: Polish & Cross-Cutting

**Goal**: Final verification and code quality.

- [x] T008 [P] Verify mobile responsiveness of the single-column tag rows
- [x] T009 [P] Verify hover/tooltip states for box names in the distribution chart
- [x] T010 Run `npm run lint` and verify build success
