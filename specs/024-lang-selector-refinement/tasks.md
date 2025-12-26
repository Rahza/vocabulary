# Tasks: Language Selector & I18n Refinement

**Branch**: `024-lang-selector-refinement`  
**Spec**: `specs/024-lang-selector-refinement/spec.md`

## Dependencies

- **Phase 1 (Setup)**: Defines types and constants used everywhere.
- **Phase 2 (Foundation)**: Migrates data and updates the repository. Blocking for all UI components that read data.
- **Phase 3 (US1/US2)**: Builds the Onboarding UI. Depends on Phase 1.
- **Phase 4 (US3)**: Adds logic to Onboarding. Depends on Phase 3.
- **Phase 5 (Integration)**: Fixes the rest of the app to work with the new data model. Depends on Phase 2.

## Implementation Strategy

1.  **Strict Typing First**: We will change the types first, which will break the build. This is intentional.
2.  **Fix Repository**: We will fix the repository and implement migration next.
3.  **Fix Integration**: We will fix the compilation errors in the rest of the app.
4.  **UI Features**: Finally, we will implement the new UI features (flags, localization, validation).

## Phase 1: Setup

_Goal: Define the new generic types and constants._

- [ ] T001 Create `src/constants/languages.ts` with `SUPPORTED_LANGUAGES`, `LanguageDirection` constants (`SOURCE_TO_TARGET`, `TARGET_TO_SOURCE`), and strict type definitions.
- [ ] T002 Update `src/models/types.ts` to replace `german`/`czech` with `source`/`target` in `VocabularyPair` and use `SupportedLanguage` in `UserSettings`.

## Phase 2: Foundation (Refactoring & Migration)

_Goal: Update the storage layer to handle generic languages and migrate existing data._

- [ ] T003 Update `IVocabularyRepository` in `src/services/storage/IVocabularyRepository.ts` to use generic `source`/`target` types.
- [ ] T004 Implement `migrateData()` method in `src/services/storage/LocalStorageRepository.ts` to transform legacy `german`/`czech` data to `source`/`target` on initialization.
- [ ] T005 Update `LocalStorageRepository.ts` CRUD methods (`addVocabulary`, `getVocabularyById`, etc.) to use `source`/`target` fields.
- [ ] T006 Update `LocalStorageRepository.ts` Leitner methods (`getLeitnerState`, `getDueReviews`) to use generic `LanguageDirection` constants.
- [ ] T007 [P] Create unit test `src/services/storage/LocalStorageRepository.test.ts` to verify data migration logic.

## Phase 3: Localized Onboarding (US1 & US2)

_Goal: Create a localized, visual onboarding screen._

- [ ] T008 [P] [US1] Add onboarding localization keys (welcome, language labels) to `messages/en.json`.
- [ ] T009 [P] [US1] Add onboarding localization keys to `messages/de.json`.
- [ ] T010 [P] [US1] Add onboarding localization keys to `messages/cs.json`.
- [ ] T011 [US1] Refactor `src/components/onboarding/LanguageOnboarding.tsx` to use `useTranslations` and strict `SupportedLanguage` types.
- [ ] T012 [US2] Update `src/components/onboarding/LanguageOnboarding.tsx` to display flag emojis next to language options.
- [ ] T013 [US1] Update styling in `src/components/onboarding/LanguageOnboarding.tsx` to vertically and horizontally center the "Welcome" container.

## Phase 4: Selection Validation (US3)

_Goal: Prevent invalid language pair configurations._

- [ ] T014 [US3] Add validation logic to `src/components/onboarding/LanguageOnboarding.tsx` to disable the target language button if it matches the selected source language.
- [ ] T015 [US3] Update `src/contexts/SettingsContext.tsx` to enforce `source !== target` validation before saving settings.

## Phase 5: System Integration (US4)

_Goal: Update the rest of the application to support the new data model._

- [ ] T016 [P] [US4] Update `src/components/trainer/Flashcard.tsx` to use `vocab.source` and `vocab.target` instead of hardcoded fields.
- [ ] T017 [P] [US4] Update `src/components/vocabulary/WordDetail.tsx` to render generic source/target labels and values.
- [ ] T018 [P] [US4] Update `src/services/ai/OpenAIService.ts` to dynamically use `sourceLanguage` and `targetLanguage` in prompt generation.
- [ ] T019 [P] [US4] Update `src/components/practice/MatchingGame.tsx` to map `source`/`target` correctly for the game logic.
- [ ] T020 [US4] Update `src/app/[locale]/trainer/page.tsx` to handle generic direction logic for review sessions.

## Phase 6: Polish

_Goal: Ensure code quality and correctness._

- [ ] T021 Run `npm run type-check` (or `tsc`) to verify zero type errors across the project.
- [ ] T022 Manual verification: Clear local storage and step through the new localized onboarding flow.
