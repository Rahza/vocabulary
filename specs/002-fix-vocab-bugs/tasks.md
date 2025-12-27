# Tasks: Fix Vocab Bugs & Improve UX

**Input**: Design documents from `/specs/002-fix-vocab-bugs/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install sonner dependency

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement "smart shuffle" logic with lookback constraint in src/lib/shuffle.ts
- [x] T003 Configure Toaster component in src/app/layout.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Correct Virtual Keyboard (Priority: P1)

**Goal**: Fix the character set to be exclusively Czech (removing German umlauts).

**Independent Test**: Open the trainer and verify only Czech diacritics are present.

### Implementation for User Story 1

- [x] T004 [US1] Update character array in src/components/keyboard/VirtualKeyboard.tsx

**Checkpoint**: User Story 1 functional

---

## Phase 4: User Story 2 - Intelligent Shuffling (Priority: P1)

**Goal**: Prevent immediate repetition of the same word.

**Independent Test**: Run a session with a small set of words and verify spacing.

### Implementation for User Story 2

- [x] T005 [P] [US2] Integrate shuffle logic into Trainer Page in src/app/trainer/page.tsx
- [x] T006 [P] [US2] Integrate shuffle logic into Practice Page in src/app/practice/page.tsx

**Checkpoint**: User Story 2 functional

---

## Phase 5: User Story 3 - Modern Notifications (Priority: P2)

**Goal**: Replace blocking alerts with Toasts.

**Independent Test**: Trigger "Save" or "Reset" and verify Toast appears.

### Implementation for User Story 3

- [x] T007 [P] [US3] Replace alert() with toast() in src/app/generate/page.tsx
- [x] T008 [P] [US3] Replace alert() with toast() in src/app/settings/page.tsx

**Checkpoint**: User Story 3 functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verification

- [x] T009 [P] Remove any unused imports or console logs related to old logic

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3+)**: Depend on Foundational (T002/T003)
  - US1 (Keyboard) is independent of others.
  - US2 (Shuffle) depends on T002.
  - US3 (Notifications) depends on T003.

### Parallel Opportunities

- T005 and T006 can run in parallel.
- T007 and T008 can run in parallel.
- US1, US2, and US3 implementation phases can largely run in parallel after foundational work.
