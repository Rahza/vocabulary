# Tasks: Dynamic Language Pair Selection

**Input**: Design documents from `specs/023-dynamic-language-pairs/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Update types and configuration context for language pairs

- [X] T001 Update `UserSettings` interface to include `sourceLanguage`, `targetLanguage`, and `languagePairSelected` in `src/models/types.ts`
- [X] T002 Update `defaultSettings` and `updateSettings` to handle language pairs in `src/contexts/SettingsContext.tsx`
- [X] T003 [P] Define `SUPPORTED_LANGUAGES` constant in `src/constants/languages.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the onboarding UI and shared logic

**⚠️ CRITICAL**: Onboarding UI must be ready before blocking the app layout

- [X] T004 Create `LanguageOnboarding` component with source/target selection in `src/components/onboarding/LanguageOnboarding.tsx`
- [X] T005 [P] Implement validation logic (Source != Target) in `LanguageOnboarding.tsx`
- [X] T006 [P] Add Framer Motion entrance/exit animations to the onboarding overlay in `LanguageOnboarding.tsx`

---

## Phase 3: User Story 1 - Initial Language Pair Setup (Priority: P1) 🎯 MVP

**Goal**: Force users to select a language pair on first launch

**Independent Test**: Clear LocalStorage, open the app, and verify the onboarding screen blocks all content until "Start" is clicked with a valid pair.

- [X] T007 Integrate `LanguageOnboarding` overlay into the root layout in `src/app/[locale]/layout.tsx`
- [X] T008 [P] Ensure `SettingsProvider` correctly exposes `isOnboarded` state to the layout
- [X] T009 [US1] Implement "Start" handler to save the selection and flip the `languagePairSelected` flag

**Checkpoint**: MVP Ready - New users can select their languages and enter the app.

---

## Phase 4: User Story 2 - Dynamic AI Generation (Priority: P1)

**Goal**: Update AI prompts to use selected languages

**Independent Test**: Generate vocabulary and verify the AI uses the selected pair instead of hardcoded German-Czech.

- [X] T010 [US2] Update `generateVocabulary` to accept and use `sourceLanguage` and `targetLanguage` names in `src/services/ai/OpenAIService.ts`
- [X] T011 [US2] Update `generateSingleMnemonic` to use dynamic language names in `src/services/ai/OpenAIService.ts`
- [X] T012 [P] [US2] Update `handleGenerate` in `src/app/[locale]/generate/page.tsx` to pass languages from settings to the AI service

---

## Phase 5: User Story 3 - Adaptive Diacritics Keyboard (Priority: P1)

**Goal**: Load correct diacritics based on the target language

**Independent Test**: Switch target language to "Spanish" and verify the virtual keyboard shows "ñ", "á", etc.

- [X] T013 [US3] Create `DIACRITICS` lookup table in `src/constants/languages.ts`
- [X] T014 [US3] Modify `VirtualKeyboard` to accept `targetLanguage` prop and render appropriate keys in `src/components/keyboard/VirtualKeyboard.tsx`
- [X] T015 [US3] Update `Flashcard` component to pass the current `targetLanguage` to the `VirtualKeyboard` in `src/components/trainer/Flashcard.tsx`

---

## Phase 6: User Story 4 - Language Pair Reset (Priority: P2)

**Goal**: Ensure app reset triggers onboarding

**Independent Test**: Click "Reset All Data" in settings and verify the user is redirected to the onboarding screen.

- [X] T016 [US4] Verify that the existing `handleConfirmReset` in `src/app/[locale]/settings/page.tsx` clears the language pair flags correctly

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final audit and verification

- [X] T017 Audit all UI strings for "German" or "Czech" and replace with dynamic references (e.g. `sourceLanguage`) in Dashboard and Collection views
- [X] T018 Run production build verification with `npm run build`
- [X] T019 Verify WCAG contrast for the new onboarding UI in Light and Dark mode

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 types.
- **User Story 1 (Phase 3)**: Depends on Phase 2 UI.
- **User Story 2 & 3 (Phases 4-5)**: Depend on User Story 1 being functional.
- **Polish (Final Phase)**: Runs after all features are complete.

### Parallel Opportunities

- T003 can be done while T001/T002 are in progress.
- T005 and T006 can be done in parallel with T004.
- Phases 4 and 5 (AI and Keyboard) can be worked on in parallel.

---

## Implementation Strategy

### MVP First (Onboarding)

1. Enable `sourceLanguage` and `targetLanguage` in settings.
2. Build the blocking onboarding screen.
3. Validate that users can't skip it.

### Core Loop Integration

1. Inject languages into AI prompts.
2. Switch keyboard diacritics.
3. Replace hardcoded "German/Czech" labels in the UI.
