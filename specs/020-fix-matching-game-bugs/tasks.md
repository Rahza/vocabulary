# Tasks: Matching Game Refinements & Bug Fixes

**Input**: Design documents from `specs/020-fix-matching-game-bugs/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup & Foundational

**Purpose**: Core infrastructure updates to support session parameters

- [X] T001 Update `src/app/practice/page.tsx` to store `activeSessionTags` (string[]) to handle multi-tag session restarts

---

## Phase 2: User Story 1 - Persisting Matched Pairs (Priority: P1) 🎯 MVP

**Goal**: Keep matched pairs visible with a faded green style.

**Independent Test**: Match a pair in the grid; verify it stays visible at 50% opacity with a green tint and becomes unclickable.

### Implementation for User Story 1

- [X] T002 [US1] Update `src/components/practice/MatchingGame.tsx` to remove the opacity-0 animation for `isCompleted` items
- [X] T003 [US1] Add `bg-playful-green/20` and `pointer-events-none` styling to completed items in `src/components/practice/MatchingGame.tsx`
- [X] T004 [US1] Ensure `opacity-50` is applied to completed items in `src/components/practice/MatchingGame.tsx`

**Checkpoint**: User Story 1 complete - Matched pairs now persist visually.

---

## Phase 3: User Story 2 - Accurate Error Highlighting (Priority: P1)

**Goal**: Isolate error feedback to selected items only.

**Independent Test**: Select a mismatch; verify only the two selected cards shake and turn red.

### Implementation for User Story 2

- [X] T005 [US2] Refactor `src/components/practice/MatchingGame.tsx` to strictly add only `selectedLeft.id` and `selectedRight.id` to `incorrectIds` state
- [X] T006 [US2] Verify timeout logic in `src/components/practice/MatchingGame.tsx` clears error state correctly for the two items

**Checkpoint**: User Story 2 complete - Error feedback is focused and accurate.

---

## Phase 4: User Story 3 - Functional Session Restart (Priority: P1)

**Goal**: Fix the "Play again" loop for all modes.

**Independent Test**: Finish a session and click "Nochmal!"; verify it restarts with correct parameters.

### Implementation for User Story 3

- [ ] T007 [US3] Capture the tags used in `handleMatchingStart` into `activeSessionTags` in `src/app/practice/page.tsx`
- [ ] T008 [US3] Update `handleRestart` in `src/app/practice/page.tsx` to call `handleMatchingStart` with `activeSessionTags` if mode is `connect-pairs`
- [ ] T009 [US3] Verify `SessionSummary.tsx` correctly triggers the `onRestart` callback

**Checkpoint**: User Story 3 complete - Session restart loop is functional for both modes.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final audit and quality check

- [X] T010 Audit contrast of "faded" matched items in both Light and Dark mode in `src/components/practice/MatchingGame.tsx`
- [X] T011 Run final visual audit of matching game animations
- [X] T012 Run production build verification with `npm run build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Must complete before US3 implementation.
- **Phase 2 (US1)**: Independent.
- **Phase 3 (US2)**: Independent.
- **Phase 4 (US3)**: Depends on Phase 1.
- **Phase 5 (Polish)**: Depends on all implementation phases.

### Parallel Opportunities

- US1 and US2 can technically be worked on in parallel within the same file if handled carefully, but sequential is safer for `MatchingGame.tsx`.
- US1/US2 (MatchingGame) and US3 (PracticePage) can be worked on in parallel.

---

## Implementation Strategy

### MVP First (Core Fixes)

1. Implement US1 and US2 in `MatchingGame.tsx` to fix immediate gameplay bugs.
2. Implement US3 in `PracticePage.tsx` to fix the user loop.

### Incremental Delivery

1. Correct matching logic (persistence + highlighting).
2. Session restart loop.
3. Visual polish and build check.
