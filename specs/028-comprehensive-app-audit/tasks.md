# Tasks: Comprehensive Application Audit & Optimization

**Branch**: `028-comprehensive-app-audit`
**Spec**: `specs/028-comprehensive-app-audit/spec.md`

## Dependencies

- **Phase 1 (Setup)** is a prerequisite for static analysis and build verification.
- **Phase 2 (Foundational)** defines the strict types used in subsequent phases.
- **Phase 3 (US1)** refactors the data layer, which improves performance for all views.
- **Phase 4 (US2)** standardizes the UI across all functional pages.
- **Phase 5 (US3)** increases reliability before the final release.

## Implementation Strategy

1.  **Type Safety First**: We will eliminate `any` types to ensure the rest of the refactoring is guided by the compiler.
2.  **Infrastructure Refactor**: Optimize the `FirebaseRepository` to reduce document reads.
3.  **UI Alignment**: Iteratively update pages to use the standardized `src/components/ui` components.
4.  **Verification**: Continuously run the test suite and type-checker to prevent regressions.

## Phase 1: Setup

*Goal: Ensure the development environment is ready for strict audit requirements.*

- [ ] T001 Verify `tsconfig.json` has `strict: true` and zero `noImplicitAny` violations
- [ ] T002 Update `eslint.config.mjs` to fail on `any` usage or suppressed type errors

## Phase 2: Foundational (Type Safety & Error Handling)

*Goal: Establish strict domain models and centralized error management.*

- [ ] T003 [US1] Replace all `any` usages in `src/models/types.ts` with strict interfaces from `data-model.md`
- [ ] T004 [US1] Refactor `IVocabularyRepository.ts` to use strict types for all parameters and return values
- [ ] T005 [US1] Implement a centralized error logging utility in `src/lib/error-handler.ts`
- [ ] T006 [US1] Update `AuthProvider.tsx` to use the centralized error handler for login/signup failures

## Phase 3: [US1] Technical Excellence (Firestore Optimization)

*Goal: Transition from client-side filtering to server-side queries.*

- [ ] T007 [US1] Refactor `getDueReviews` in `src/services/storage/FirebaseRepository.ts` to use `where` and `orderBy` queries
- [ ] T008 [US1] Refactor `getVocabularyByTag` in `FirebaseRepository.ts` to use Firestore server-side filtering
- [ ] T009 [US1] Optimize `getStats` and `getGlobalStats` to use aggregated queries or minimal snapshots
- [ ] T010 [US1] Implement a "Loading Skeleton" pattern in `src/components/ui/Skeleton.tsx` for data-heavy views

## Phase 4: [US2] Design Consistency (UI Standardization)

*Goal: Unify the visual language across all screens.*

- [ ] T011 [US2] Standardize the Dashboard (`src/app/[locale]/page.tsx`) to strictly use `Heading` and `Card` components
- [ ] T012 [US2] Redesign Vocabulary Collection (`src/app/[locale]/vocabulary/page.tsx`) to use standardized filters and list items
- [ ] T013 [US2] Audit Practice Setup (`src/components/practice/PracticeConfig.tsx`) for component and spacing consistency
- [ ] T014 [US2] Update Trainer Page (`src/app/[locale]/trainer/page.tsx`) to use unified loading skeletons and consistent card styling
- [ ] T015 [US2] Verify all buttons in the app use the `Button` component with correct `playful` or `outline` variants

## Phase 5: [US3] Robustness & Reliability (Test Coverage)

*Goal: Increase business logic coverage to >80%.*

- [ ] T016 [P] [US3] Create comprehensive unit tests for `LeitnerService` in `src/services/leitner/LeitnerService.test.ts`
- [ ] T017 [P] [US3] Add integration tests for `FirebaseRepository` operations (mocking Firestore)
- [ ] T018 [US3] Implement end-to-end tests for the "Review Session" flow using Vitest or a similar tool
- [ ] T019 [US3] Verify graceful handling of network timeouts in `FirebaseRepository.ts`

## Phase 6: Polish & Performance

*Goal: Final verification and optimizations.*

- [ ] T020 Audit browser console for any remaining warnings or hydration mismatches
- [ ] T021 Run a final build (`npm run build`) to ensure zero type or lint regressions
- [ ] T022 Document indexing requirements for Firestore in the project root for deployment readiness
