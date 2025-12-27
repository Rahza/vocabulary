# Tasks: Connect Pairs Practice Mode

**Input**: Design documents from `specs/019-connect-pairs-practice/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Initial infrastructure and utilities

- [x] T001 [P] Implement pair shuffling utility in `src/lib/shuffle.ts`
- [x] T002 Define `PracticeMode` and matching-related types in `src/models/types.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Refactor practice page to host multiple modes

**⚠️ CRITICAL**: No user story work can begin until the page supports mode switching

- [x] T003 Refactor `src/app/practice/page.tsx` to include a state-driven view switcher (Selection, Classic, ConnectPairs)
- [x] T004 Create skeletal `MatchingGame` component in `src/components/practice/MatchingGame.tsx`

**Checkpoint**: Foundation ready - both modes can be hosted independently.

---

## Phase 3: User Story 1 - Mode Selection (Priority: P1) 🎯 MVP

**Goal**: Allow users to choose between Classic and Connect Pairs practice modes.

**Independent Test**: Navigate to `/practice` and verify two distinct buttons/cards are visible for mode selection.

### Implementation for User Story 1

- [x] T005 [P] [US1] Create `ModeSelector` component in `src/components/practice/ModeSelector.tsx`
- [x] T006 [US1] Integrate `ModeSelector` into `src/app/practice/page.tsx` selection state
- [x] T007 [US1] Ensure "Classic" selection correctly launches existing practice flow

**Checkpoint**: User Story 1 complete - Users can now choose the new mode path.

---

## Phase 4: User Story 2 - Session Configuration (Priority: P1)

**Goal**: Configure tags and question count for the Connect Pairs session.

**Independent Test**: Select "Connect Pairs", choose specific tags and a question count, then verify the game starts with those parameters.

### Implementation for User Story 2

- [x] T008 [P] [US2] Update `TagSelector` or create specialized configuration component in `src/components/practice/ConnectPairsConfig.tsx`
- [x] T009 [US2] Implement multi-tag selection logic and question count input
- [x] T010 [US2] Pass configuration state to the `MatchingGame` component via `src/app/practice/page.tsx`

**Checkpoint**: User Story 2 complete - Sessions are now fully configurable.

---

## Phase 5: User Story 3 - Interactive Pair Matching (Priority: P1)

**Goal**: Implement the matching grid with randomized columns and visual feedback.

**Independent Test**: Complete a matching round by tapping correct pairs; verify green highlights and removal. Try incorrect pairs; verify red highlights and shake animation.

### Implementation for User Story 3

- [x] T011 [P] [US3] Implement randomized column generation (5 pairs) in `src/components/practice/MatchingGame.tsx`
- [x] T012 [US3] Implement tap-selection logic for left and right columns
- [x] T013 [US3] Implement matching validation logic (German text matches Czech text)
- [x] T014 [US3] Add Framer Motion shake animation for incorrect matches in `src/components/practice/MatchingGame.tsx`
- [x] T015 [US3] Add Framer Motion success animations and removal for matched pairs
- [x] T016 [US3] Implement round transition logic (move to next "question" when 5 pairs matched)
- [x] T017 [US3] Ensure zero Leitner progress updates upon session completion

**Checkpoint**: User Story 3 complete - The "Connect Pairs" mode is fully functional.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final UI refinements and build validation

- [x] T018 [P] Apply playful design system (shadows, radii) to matching cards in `src/components/practice/MatchingGame.tsx`
- [x] T019 [P] Add progress indicator for matching rounds (e.g., "Round 2/10")
- [x] T020 Run full visual regression check using `specs/019-connect-pairs-practice/quickstart.md` scenarios
- [x] T021 Run `npm run build` to ensure no production issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T002.
- **User Story 1 (Phase 3)**: Depends on Phase 2.
- **User Story 2 (Phase 4)**: Depends on Phase 3 completion.
- **User Story 3 (Phase 5)**: Depends on Phase 4 data passing.
- **Polish (Final Phase)**: Depends on User Story 3 being functional.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T005 and T008 can technically be built in parallel as component UI.
- T018 and T019 can be done in parallel during polish.

---

## Parallel Example: Setup & Foundational

```bash
# Prepare types and utilities together:
Task: "Implement pair shuffling utility in src/lib/shuffle.ts"
Task: "Define PracticeMode and matching-related types in src/models/types.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Refactor the practice page to allow choosing a mode.
2. Ensure existing practice still works.
3. Build the configuration screen for the new mode.

### Full Interactive Delivery

1. Implement the core matching logic.
2. Add "juice" (animations, feedback).
3. Final polish and build verification.
