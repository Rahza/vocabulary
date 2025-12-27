# Research: I18n Fixes, Learn Mode Fix & UI Cleanup

## Technical Decisions

### 1. I18n Coverage
**Decision**: Standardize all 6 supported languages by ensuring `de.json` and `cs.json` are complete and creating `es.json`, `fr.json`, and `it.json`.
**Rationale**: The manual audit revealed English fallback strings in existing localization files. Creating missing files is required by the `SUPPORTED_LANGUAGES` definition in the codebase.

### 2. Learn Mode Fix (Firestore Indexes)
**Decision**: Document the required Firestore composite indexes and add error handling to `TrainerPage.tsx`.
**Rationale**: The query `where('nextReview', '<=', nowISO).orderBy('nextReview')` requires an index in Firestore. If the index is missing, the query silently returns an empty set or throws an error that is currently swallowed because of a lack of `try-catch` in `loadDueItems`.
**Findings**: The `nextReview` field is correctly initialized as an ISO string during vocabulary creation, so the logic is sound but the infrastructure (indexes) and observability (error handling) are lacking.

### 3. UI Cleanup (Sign Out Relocation)
**Decision**: Remove the `Sign Out` button from `Navigation.tsx` and place it in `SettingsPage.tsx` using the `Button` component with a `destructive` or `outline` variant.
**Rationale**: Standardizes navigation by keeping the bottom bar focused on functional learning areas. Placing account management in Settings follows common UX patterns.

## Best Practices Found

- **Firestore Observability**: Always wrap data fetching calls in `try-catch` and log errors to provide developer feedback (especially for index errors).
- **Localization Fallback**: `next-intl` handles fallbacks, but having 100% key coverage prevents UI "flicker" between languages.

## Unresolved Questions (Resolved)
- **Q**: Which languages are missing?
- **A**: `es` (Spanish), `fr` (French), and `it` (Italian) are missing localization files entirely despite being in the supported list.
- **Q**: Why are newly added words not showing up?
- **A**: Likely missing Firestore index for the due review query.
