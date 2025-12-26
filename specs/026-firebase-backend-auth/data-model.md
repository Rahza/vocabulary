# Data Model: Firebase Backend

## Firestore Collection Structure

Data is organized by user ID (`uid`) to ensure strict isolation and efficient querying.

### 1. `users/{uid}/vocabulary`
Stores individual vocabulary pairs.

- **Document ID**: Auto-generated (or word hash).
- **Fields**:
  - `source`: string (e.g., "Hund")
  - `target`: string (e.g., "Dog")
  - `mnemonic`: string
  - `tags`: array of strings
  - `difficulty`: string ("Beginner" | "Intermediate" | "Advanced")
  - `createdAt`: timestamp
  - `ownerId`: string (matches `uid`)

### 2. `users/{uid}/leitner`
Tracks progress for each vocabulary item.

- **Document ID**: Matches corresponding `vocabulary` document ID + direction suffix (e.g., `{vocabId}_forward`).
- **Fields**:
  - `vocabId`: reference to vocabulary document
  - `direction`: string ("SOURCE_TO_TARGET" | "TARGET_TO_SOURCE")
  - `box`: number (1-5)
  - `lastReviewed`: timestamp
  - `nextReview`: timestamp
  - `history`: array of objects (`{ date: timestamp, success: boolean }`)
  - `ownerId`: string

### 3. `users/{uid}/settings`
User preferences.

- **Document ID**: `current` (single document)
- **Fields**:
  - `language`: string (UI language)
  - `sourceLanguage`: string
  - `targetLanguage`: string
  - `dailyGoal`: number
  - `languagePairSelected`: boolean

## Validation Rules (Security Rules)

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
