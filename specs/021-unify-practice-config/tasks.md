# Tasks: Unified Practice Configuration & UI Consistency

**Input**: Design documents from `specs/021-unify-practice-config/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup & Abstraction

**Purpose**: Create the unified configuration component and prepare for refactoring

- [x] T001 Create `src/components/practice/PracticeConfig.tsx` by refactoring `ConnectPairsConfig.tsx` into a generic component
- [x] T002 Update `src/components/practice/PracticeConfig.tsx` to use unified terminology ("Sitzungslänge") and standard round options (3, 5, 10)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic updates to support multi-tag pooling

**⚠️ CRITICAL**: No user story work can begin until the pooling logic is ready

- [x] T003 Refactor `handleConfigSelect` in `src/app/practice/page.tsx` to accept an array of tags (`string[]`) instead of a single tag
- [x] T004 [P] Update pooling logic in `src/app/practice/page.tsx` to fetch, deduplicate, and shuffle vocabulary from multiple tags

---

## Phase 3: User Story 1 - Unified Session Configuration (Priority: P1) 🎯 MVP

**Goal**: Use the new `PracticeConfig` for both modes and enable multi-tag classic practice.

**Independent Test**: Start "Klassisch" mode, select multiple tags, and verify the session starts with pooled vocabulary.

### Implementation for User Story 1

- [x] T005 [US1] Replace `TagSelector` and `ConnectPairsConfig` usage in `src/app/practice/page.tsx` with the new `PracticeConfig`
- [x] T006 [US1] Remove deprecated components `src/components/practice/TagSelector.tsx` and `src/components/practice/ConnectPairsConfig.tsx`
- [x] T007 [US1] Ensure `PracticeConfig` correctly passes `selectedTags` and `rounds` to the start handlers in `src/app/practice/page.tsx`

**Checkpoint**: User Story 1 complete - Multi-tag selection is functional for all modes using a single component.

---

## Phase 4: User Story 2 - Navigation & Exit (Priority: P1)

**Goal**: Implement "Back" and "End" controls for better user flow.

**Independent Test**: Click "Zurück" in config to return to mode selection. Click "Beenden" during a Classic session to exit immediately.

### Implementation for User Story 2

- [x] T008 [US2] Ensure "Zurück" button in `PracticeConfig.tsx` correctly invokes the `onBack` callback to reset view state in `src/app/practice/page.tsx`
- [x] T009 [US2] Add "Beenden" button to the top-right of the Classic practice view in `src/app/practice/page.tsx`
- [x] T010 [US2] Match the styling of the new "Beenden" button with the one in `MatchingGame.tsx`

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final UI refinements and build validation

- [x] T011 [P] Ensure "Beenden" button in Classic mode uses consistent `playful-red` styling
- [x] T012 Run production build verification with `npm run build`
- [x] T013 Verify that "Play again" logic still works correctly with the new pooled tag state in `src/app/practice/page.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Abstraction)**: Must complete first to provide the new component.
- **Phase 2 (Foundational)**: Must complete before US1 can be fully functional.
- **User Story 1 (Phase 3)**: Depends on Phase 1 and 2.
- **User Story 2 (Phase 4)**: Runs concurrently with/after US1.
- **Polish (Phase 5)**: Depends on all implementation phases.

### Parallel Opportunities

- T004 (logic) and T002 (UI terminology) can technically run in parallel if handled in different files.
- T011 can run in parallel with other polish tasks.

---

## Implementation Strategy

### MVP First (Unified Config)

1. Build `PracticeConfig.tsx`.
2. Update classic mode to support multiple tags.
3. Switch `PracticePage` to use the new component for both modes.

### Full Loop Fix

1. Add "Back" and "End" navigation controls.
2. Verify "Play again" loop.
3. Final build check.
