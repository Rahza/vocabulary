# Data Model: Audit & Optimization

## Firestore Refinements

To support server-side filtering and reduce data usage, the following query patterns and index requirements are defined.

### 1. Vocabulary Collection (`users/{uid}/vocabulary`)
- **Optimization**: Add composite index for `(uid, tags)` to support server-side tag filtering.
- **Fields**: No changes to existing fields, but ensure `ownerId` is consistently used for rules.

### 2. Leitner Collection (`users/{uid}/leitner`)
- **Optimization**: Add composite index for `(uid, nextReview ASC)` to support efficient due review fetching.
- **Query Refactor**: Change `getDueReviews` from client-side filter to `collection(db, 'leitner').where('nextReview', '<=', now).orderBy('nextReview')`.

## Type System Refinement

### Domain Interfaces (Refactored)
Replace all `any` usages with these strict interfaces.

```typescript
export interface VocabularyPair {
  id: string;
  source: string;
  target: string;
  mnemonic: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: string;
  ownerId: string;
}

export interface LeitnerState {
  vocabId: string;
  direction: 'SOURCE_TO_TARGET' | 'TARGET_TO_SOURCE';
  box: 1 | 2 | 3 | 4 | 5;
  lastReviewed: string;
  nextReview: string;
  history: ReviewResult[];
  ownerId: string;
}
```

## Security Rules (Verified)
Ensure rules remain isolated and performant.

```javascript
match /users/{userId}/{document=**} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```
