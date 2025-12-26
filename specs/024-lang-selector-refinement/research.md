# Research: Language Selector Refinement

## Technical Decisions

### 1. Data Model Refactoring
To support generic language pairs (e.g., French -> Spanish) as requested and implied by the move to generic constants, we must refactor the `VocabularyPair` and `LeitnerState` data models.

**Decision**: 
- Rename `VocabularyPair.german` to `VocabularyPair.source`
- Rename `VocabularyPair.czech` to `VocabularyPair.target`
- Rename `LeitnerState.direction` values:
  - `'DE_TO_CZ'` -> `'SOURCE_TO_TARGET'`
  - `'CZ_TO_DE'` -> `'TARGET_TO_SOURCE'`

**Rationale**: 
Keeping `german` and `czech` fields while storing other languages (like English or Spanish) creates significant technical debt and developer confusion. A generic model reflects the new dynamic nature of the application.

### 2. Data Migration Strategy
Since the application uses `LocalStorage`, we must migrate data on the client side when the application initializes.

**Decision**:
Implement a migration logic in `LocalStorageRepository` (or a dedicated migration service) that runs on instantiation.
- **Trigger**: Check if stored data matches the old schema (has `german` field).
- **Action**: 
  - Map `german` -> `source`
  - Map `czech` -> `target`
  - Update `direction` in Leitner states.
  - Save back to LocalStorage.
  - Handle potential conflicts/errors gracefully.

### 3. Localization (i18n)
We will use the existing `next-intl` setup.

**Decision**:
- Add new keys in `messages/{locale}.json` for the onboarding screen.
- Use `useTranslations` hook in `LanguageOnboarding.tsx`.
- Ensure language names are localized in the selection list (e.g., "German" shows as "Deutsch" when the app language is German).

### 4. Constants and Types
**Decision**:
- Create a `constants/languages.ts` (or update existing) to export `DIRECTION_FORWARD` and `DIRECTION_BACKWARD` constants.
- Define `SupportedLanguage` as a strict union type.
- Enforce `UserSettings` to use `SupportedLanguage`.

## Alternatives Considered

### Keep `german`/`czech` fields
- **Pros**: Less work, no migration needed.
- **Cons**: Extremely confusing code (e.g., `vocab.german` holding Spanish text). Violated "Strict Typing" and "Generic" goals.
- **Verdict**: Rejected. The refactor is necessary for long-term health.

### Server-side Migration
- **N/A**: This is a client-side only app (LocalStorage).

## Unresolved Questions (Resolved)
- **Q**: How to handle the user's active "Source/Target" settings during migration? 
- **A**: The migration assumes the existing data *was* German/Czech. We will default the `UserSettings` to Source=German, Target=Czech if not already set, to preserve the context of the existing data.
