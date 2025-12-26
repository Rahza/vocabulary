# Quickstart: Audit Verification

## 1. Static Analysis
Run type-checking and linting to ensure no regressions and strict adherence to rules.
```bash
npm run type-check
npm run lint
```

## 2. Test Coverage
Verify that core services meet the >80% coverage target.
```bash
npx vitest run --coverage
```

## 3. Query Optimization
1. Open Chrome DevTools -> Network -> Fetch/XHR.
2. Navigate to the Trainer page.
3. Verify that the Firestore request for "leitner" includes query parameters (where/orderBy) instead of fetching the entire collection.

## 4. Design Standardization
Manual audit of the following pages to ensure they use the `src/components/ui` components:
- [ ] Login / Signup
- [ ] Dashboard
- [ ] Vocabulary Collection
- [ ] Practice Setup
- [ ] Trainer (Flashcards)
- [ ] Settings
