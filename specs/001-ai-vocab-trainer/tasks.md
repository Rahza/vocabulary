# Tasks: AI Vocabulary Trainer

**Input**: Design documents from `/specs/001-ai-vocab-trainer/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Next.js App Router project structure in src/
- [x] T002 Install dependencies (openai, framer-motion, lucide-react, clsx, tailwind-merge)
- [x] T003 [P] Configure Tailwind CSS in tailwind.config.ts and src/app/globals.css
- [x] T004 [P] Setup lib utils for styling (cn helper) in src/lib/utils.ts
- [x] T005 [P] Create initial layout with navigation in src/app/layout.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Define TypeScript interfaces (VocabularyPair, LeitnerState) in src/models/types.ts
- [x] T007 Implement Repository Interface definition in src/services/storage/IVocabularyRepository.ts
- [x] T008 Implement LocalStorage Repository logic in src/services/storage/LocalStorageRepository.ts
- [x] T009 Create Settings Context for OpenAI API Key management in src/contexts/SettingsContext.tsx
- [x] T010 Create Settings Page to input API Key in src/app/settings/page.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - AI Vocabulary Generation (Priority: P1) 🎯 MVP

**Goal**: Generate new German-Czech vocabulary pairs with mnemonics using OpenAI

**Independent Test**: Generate a list of words, check browser console/network for AI response, verify words appear in storage.

### Implementation for User Story 1

- [x] T011 [P] [US1] Implement OpenAI Service for vocabulary generation in src/services/ai/OpenAIService.ts
- [x] T012 [P] [US1] Create UI components for Generator form (Theme, Difficulty, Count) in src/components/generator/GeneratorForm.tsx
- [x] T013 [P] [US1] Create UI components for displaying generated results in src/components/generator/GeneratedList.tsx
- [x] T014 [US1] Implement Generate Page integrating Form, Service, and Repository in src/app/generate/page.tsx
- [x] T015 [US1] Add error handling for invalid API keys or network issues in src/app/generate/page.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Leitner System Trainer (Priority: P1)

**Goal**: Practice vocabulary using spaced repetition with typing and diacritics

**Independent Test**: Complete a training session, verify correct answers move cards to next box, incorrect ones reset them.

### Implementation for User Story 2

- [x] T016 [P] [US2] Implement Leitner System logic (scheduling, box movement) in src/services/leitner/LeitnerService.ts
- [x] T017 [P] [US2] Create Virtual Keyboard component for Czech/German diacritics in src/components/keyboard/VirtualKeyboard.tsx
- [x] T018 [P] [US2] Create Flashcard/Input component in src/components/trainer/Flashcard.tsx
- [x] T019 [US2] Implement Trainer Page logic (fetching due items, handling answers) in src/app/trainer/page.tsx
- [x] T020 [US2] Integrate Virtual Keyboard and Answer Validation logic in src/app/trainer/page.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Flexible Practice Mode (Priority: P2)

**Goal**: Practice specific groups without affecting Leitner progress

**Independent Test**: Practice a specific tag, verify no changes to "Next Review" dates in LocalStorage.

### Implementation for User Story 3

- [x] T021 [P] [US3] Add method to get vocabulary by tag in src/services/storage/LocalStorageRepository.ts
- [x] T022 [P] [US3] Create Tag Selection component in src/components/practice/TagSelector.tsx
- [x] T023 [US3] Implement Practice Page (reuse Flashcard component, no Leitner updates) in src/app/practice/page.tsx
- [x] T024 [US3] Implement session summary view (Score/Duration) in src/components/practice/SessionSummary.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Progress & Statistics (Priority: P3)

**Goal**: View overall and group-specific progress

**Independent Test**: Check dashboard after training, verify numbers match actual data.

### Implementation for User Story 4

- [x] T025 [P] [US4] Implement stats aggregation logic (counts per box, per tag) in src/services/storage/StatsService.ts
- [x] T026 [P] [US4] Create Charts/Stats display components in src/components/dashboard/StatsOverview.tsx
- [x] T027 [US4] Update Dashboard Page to display real statistics in src/app/page.tsx

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T028 [P] Add Framer Motion animations to Flashcard transitions in src/components/trainer/Flashcard.tsx
- [x] T029 [P] Update UI with Lucide icons across all pages
- [x] T030 Add "Reset Data" functionality in Settings for debugging in src/app/settings/page.tsx
- [x] T031 Final design review and responsiveness check (Mobile vs Desktop)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3+)**: All depend on Foundational phase
  - US1 (Gen) and US2 (Trainer) can technically run in parallel if repository is ready
  - US3 (Practice) depends on Repository methods
  - US4 (Stats) depends on Repository/Stats logic

### Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup & Foundational
2. Implement AI Generation (US1) -> Content creation enabled
3. Implement Leitner Trainer (US2) -> Learning enabled
4. **STOP and VALIDATE**: Core loop (Create -> Learn) is functional

### Incremental Delivery

1. Add Practice Mode (US3) for flexibility
2. Add Stats (US4) for motivation
3. Polish UI and Animations