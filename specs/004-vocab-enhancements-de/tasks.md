# Tasks: Vocabulary Enhancements & German Localization

**Spec**: [specs/004-vocab-enhancements-de/spec.md](specs/004-vocab-enhancements-de/spec.md)

## Dependencies

- **Phase 1: Setup**: Technical prerequisites (Testing, Interfaces)
- **Phase 2: Localization**: Foundation for all UI (blocking for visual consistency)
- **Phase 3: Generation Logic**: Independent backend/service logic
- **Phase 4: Practice Enhancements**: UI interactions depending on data model

## Implementation Strategy

We will start by establishing the testing infrastructure (Vitest) to ensure all subsequent logic changes are verifiable. Then we will tackle the German localization (P1) as it affects all components. Next, we implement the duplicate prevention and refined generation flow (P1), followed by the enhanced practice mode features (P2).

## Phase 1: Setup & Infrastructure

**Goal**: Initialize testing framework and define core interfaces.

- [x] T001 Install Vitest and React Testing Library dependencies
- [x] T002 Configure Vitest in `vitest.config.ts` and update `package.json` scripts
- [x] T003 Create `IVocabularyRepository` interface in `src/services/storage/IVocabularyRepository.ts` with `exists` method
- [x] T004 Create `IVocabularyGenerator` interface in `src/services/ai/IVocabularyGenerator.ts` matching contracts

## Phase 2: User Story 1 - German Localization (P1)

**Goal**: Ensure the entire application interface and generated content is in German.
**Independent Test**: Navigate to all pages; all text should be German. Generate new word; result should be German.

- [x] T005 [US1] [P] Update `src/components/layout/Navigation.tsx` with German labels
- [x] T006 [US1] [P] Update `src/app/page.tsx` (Dashboard) with German text
- [x] T007 [US1] [P] Update `src/app/generate/page.tsx` with German text
- [x] T008 [US1] [P] Update `src/app/practice/page.tsx` with German text
- [x] T009 [US1] [P] Update `src/app/settings/page.tsx` with German text
- [x] T010 [US1] [P] Update `src/components/generator/GeneratorForm.tsx` labels to German
- [x] T011 [US1] [P] Update `src/components/practice/SessionSummary.tsx` text to German
- [x] T012 [US1] Update `src/services/ai/OpenAIService.ts` prompt to request German translations, mnemonics, and tags

## Phase 3: User Story 2 - Refined Vocabulary Generation (P1)

**Goal**: Prevent duplicates and allow managing suggestions.
**Independent Test**: Generate words for an existing topic; no duplicates appear. Delete a suggestion; it's removed.

- [x] T013 [US2] Create test `src/services/storage/LocalStorageRepository.test.ts` for `exists` method
- [x] T014 [US2] Implement `exists` method in `src/services/storage/LocalStorageRepository.ts`
- [x] T015 [US2] Update `src/services/ai/OpenAIService.ts` to fetch existing terms and filter/exclude duplicates
- [x] T016 [US2] Update `src/components/generator/GeneratedList.tsx` to add "Delete" button for each item
- [x] T017 [US2] Update `src/app/generate/page.tsx` to handle deletion state before saving

## Phase 4: User Story 3 - Enhanced Practice Assistance (P2)

**Goal**: Add "Tip", "Show Mnemonic", and "Skip" features to practice mode.
**Independent Test**: Start practice; usage of Tip reveals letters, Show Mnemonic works, Skip shows solution.

- [x] T018 [US3] Create test `src/components/trainer/Flashcard.test.tsx` for new interaction states
- [x] T019 [US3] Update `src/components/trainer/Flashcard.tsx` to add "Tip", "Show Mnemonic", "Skip" buttons
- [x] T020 [US3] Implement "Tip" logic (reveal one char at a time) in `src/components/trainer/Flashcard.tsx`
- [x] T021 [US3] Implement "Show Mnemonic" toggle logic in `src/components/trainer/Flashcard.tsx`
- [x] T022 [US3] Implement "Skip/Show Solution" logic in `src/components/trainer/Flashcard.tsx` and parent `src/app/practice/page.tsx`

## Phase 5: Polish & Cross-Cutting

**Goal**: Final consistency checks and cleanup.

- [x] T023 Run full lint check and fix any minor issues
- [x] T024 Manual verification of German grammar in UI texts
- [x] T025 Verify mobile responsiveness of new buttons in Flashcard component
