# Research: Vocabulary Enhancements & German Localization

## 1. Testing Framework

**Status**: Resolved
**Decision**: Add `vitest` and `@testing-library/react`.
**Rationale**: The project currently lacks a test runner despite `GEMINI.md` references. To adhere to Constitution Principle I (Engineering Excellence), we must introduce testing capabilities to verify the new features (duplicate logic, generation). Vitest is chosen for its speed and compatibility with modern React ecosystems.
**Alternatives**:

- _Jest_: Slower, more configuration required for TS/Next.js.
- _No tests_: Violates constitution.

## 2. Localization Strategy

**Status**: Resolved
**Decision**: Direct Text Replacement (Hardcoded German).
**Rationale**: The requirement is to make the app's source language German ("make sure the whole app... is in... German"). There is no explicit requirement for multi-language support (switching between EN/DE). Implementing full i18n adds unnecessary complexity (Principle II: Maintainability - keep it simple). We will replace English strings with German strings directly in the components.
**Alternatives**:

- _Next-intl / react-i18next_: Overkill for a single-language requirement.
- _Custom Dictionary_: Good for future-proofing, but adds abstraction layer not currently needed.

## 3. Duplicate Prevention

**Status**: Resolved
**Decision**: Pre-generation Check + Post-generation Filter.
**Rationale**:

1.  **Pre-check**: We can't easily feed _all_ existing words to OpenAI context limit.
2.  **Post-filter**: The critical check must happen _before saving_. `LocalStorageRepository.addVocabulary` should throw or return status if a duplicate exists.
3.  **Generator Logic**: When generating, we will fetch _all_ existing terms (lightweight for local app) and filter them out of the AI suggestions if possible, or visually mark/remove them in the UI.
    **Implementation**: Enhance `LocalStorageRepository` with `exists(term: string): boolean`.

## 4. Practice Mode Hints

**Status**: Resolved
**Decision**: Local Component State.
**Rationale**: The "Tip" feature (reveal letter) is transient UI state. We will add `revealedIndices` or `revealCount` to the `Flashcard` component state.
