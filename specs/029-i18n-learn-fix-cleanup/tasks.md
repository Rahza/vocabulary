# Tasks: I18n Fixes, Learn Mode Fix & UI Cleanup

**Branch**: `029-i18n-learn-fix-cleanup`
**Spec**: `specs/029-i18n-learn-fix-cleanup/spec.md`

## Dependencies

- **Phase 1 (Setup)**: Must complete before testing US1.
- **Phase 3 (US1)**: Depends on Phase 1 setup.
- **Phase 4 (US2)**: Independent, but improves robustness of the Trainer.
- **Phase 5 (US3)**: Independent UI cleanup.

## Implementation Strategy

1.  **I18n Parity**: Create and fill all missing localization keys to ensure 100% coverage.
2.  **Logic Observability**: Wrap the Trainer's data loading in error handling to identify Firestore index failures immediately.
3.  **UI Refactoring**: Relocate account management actions to the Settings page.

## Phase 1: Setup

*Goal: Initialize missing localization assets.*

- [x] T001 Create `messages/es.json` based on `messages/en.json` structure
- [x] T002 Create `messages/fr.json` based on `messages/en.json` structure
- [x] T003 Create `messages/it.json` based on `messages/en.json` structure

## Phase 2: Foundational (Observability)

*Goal: Improve error reporting for data fetching.*

- [x] T004 Add `try-catch` block and developer logging to `loadDueItems` in `src/app/[locale]/trainer/page.tsx`

## Phase 3: [US1] Multilingual Consistency

*Goal: Achieve 100% translation coverage across all supported languages.*

- [x] T005 [P] [US1] Replace remaining English strings in `messages/de.json` with correct German translations
- [x] T006 [P] [US1] Replace remaining English strings in `messages/cs.json` with correct Czech translations
- [x] T007 [P] [US1] Populate `messages/es.json` with Spanish translations
- [x] T008 [P] [US1] Populate `messages/fr.json` with French translations
- [x] T009 [P] [US1] Populate `messages/it.json` with Italian translations

## Phase 4: [US2] Working Learn Mode

*Goal: Fix the "empty queue" bug in Trainer mode.*

- [x] T010 [US2] Audit `getDueReviews` in `src/services/storage/FirebaseRepository.ts` to ensure it uses the correct timezone-aware ISO string comparison
- [x] T011 [US2] Implement user-facing error message in `TrainerPage.tsx` if the Firestore query fails (e.g., due to missing index)

## Phase 5: [US3] Settings UI Cleanup

*Goal: Relocate the Sign Out button.*

- [x] T012 [US3] Remove the "Sign Out" button and associated `LogOut` icon from `src/components/layout/Navigation.tsx`
- [x] T013 [US3] Add a "Sign Out" section to `src/app/[locale]/settings/page.tsx` using the `Button` component with a destructive/outline style
- [x] T014 [US3] Ensure the "Sign Out" action in Settings triggers the Firebase sign-out and redirects to `/login`

## Phase 6: Polish & Validation

*Goal: Final verification.*

- [x] T015 Perform a final visual audit of all 6 language modes to ensure zero English fallback text
- [x] T016 Verify that the Trainer queue correctly populates after adding a new word in each language mode
- [x] T017 Run `npm run type-check` to ensure no regressions in TypeScript coverage