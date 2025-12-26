# Research: Comprehensive Application Audit & Optimization

## Technical Decisions

### 1. Firestore Query Optimization
**Decision**: Transition from client-side filtering to server-side Firestore queries using composite indexes.
**Rationale**: Fetching entire collections (`getAllVocabulary`, `getAllLeitnerStates`) and filtering in memory is inefficient and expensive as the dataset grows. Using `where` clauses and `orderBy` reduces document reads and client-side processing.
**Best Practice**: Leverage Firestore's `query` and `where` capabilities for `getDueReviews` and `getVocabularyByTag`.

### 2. Standardized UI Components
**Decision**: Enforce usage of `Heading`, `Card`, `Button`, and `Input` from `src/components/ui` across all pages.
**Rationale**: Eliminates redundant custom Tailwind classes and ensures a unified visual language (border-radii, shadows, animations).
**Best Practice**: Use `itemReveal` and `containerReveal` animations consistently for page transitions.

### 3. Strict Type Safety
**Decision**: Eliminate all instances of `any` and `unknown` in core domain logic (`IVocabularyRepository`, `LeitnerService`).
**Rationale**: Enhances developer productivity and prevents runtime errors. Use Zod (if needed) for Firestore data validation.
**Best Practice**: Define explicit interfaces for Firestore document mappings.

### 4. Test Coverage Increase
**Decision**: Prioritize testing for `FirebaseRepository` and `LeitnerService` using Vitest.
**Rationale**: These services contain the core business logic. Mocking Firestore calls will allow for fast, reliable unit tests.
**Best Practice**: Aim for >80% coverage on service-layer files.

## Alternatives Considered

- **Keeping Client-Side Filtering**: Rejected because it doesn't scale and leads to high Firestore read counts.
- **Using a Component Library (e.g., Shadcn)**: Rejected to maintain the custom "playful" design already established in the `src/components/ui` folder.

## Best Practices Found

- **Next.js Loading States**: Use `loading.tsx` and React Suspense with custom skeleton components for better perceived performance.
- **Error Boundaries**: Implement a global error boundary to catch and report Firestore/Auth failures gracefully.
