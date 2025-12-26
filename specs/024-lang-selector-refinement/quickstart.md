# Quickstart: Language Selector Refinement

## Prerequisites
- Node.js 18+
- Repository cloned and dependencies installed (`npm install`)

## Implementation Steps

1.  **Define Types & Constants**:
    -   Update `src/models/types.ts` with `VocabularyPair` refactor and `LanguageDirection`.
    -   Create `src/constants/languages.ts` with generic direction constants.

2.  **Implement Migration Logic**:
    -   Modify `LocalStorageRepository.ts` to check for legacy data (`german` property) on initialization.
    -   Write a private method `migrateData()` that transforms the data and saves it back.

3.  **Refactor Repository**:
    -   Update all methods in `LocalStorageRepository` to use `source`/`target` and generic directions.

4.  **Update UI Components**:
    -   Refactor `LanguageOnboarding.tsx` to use localized strings and proper types.
    -   Update `LanguageSelector.tsx` for settings.
    -   Update `WordDetail.tsx`, `Flashcard.tsx`, etc., to read `vocab.source`/`target`.

5.  **Verify**:
    -   Run the app with existing data (if possible to mock) and verify migration.
    -   Check "First Time Setup" flow.

## Testing Guide

### Unit Tests
-   **Migration**: Create a test that seeds `localStorage` with legacy data, initializes the repository, and asserts that data is transformed correctly.
-   **Repository**: Test CRUD operations with the new generic types.

### Manual Verification
1.  **Onboarding**: Clear storage (`localStorage.clear()`), reload, and verify the localized welcome screen and language selection.
2.  **Constraints**: Try selecting "German" -> "German" and ensure it's blocked.
3.  **Migration**: If you have old data, reload and ensure your vocabulary is still visible and correct.
