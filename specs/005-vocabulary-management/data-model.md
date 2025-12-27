# Data Model: Vocabulary Management

This feature primarily uses the existing `VocabularyPair` and `LeitnerState` entities but introduces logic for bulk updates and global tag synchronization.

## Entities

### VocabularyPair (Existing)

Represents a word/phrase pair.

- `id`: UUID (String)
- `german`: String
- `czech`: String
- `mnemonic`: String (Optional)
- `tags`: String[]
- `difficulty`: 'Beginner' | 'Intermediate' | 'Advanced'
- `createdAt`: ISO Timestamp (String)

### LeitnerState (Existing)

Tracks learning progress for a specific vocabulary item and direction.

- `vocabId`: UUID (String)
- `direction`: 'DE_TO_CZ' | 'CZ_TO_DE'
- `box`: Number (1-5)
- `lastReviewed`: ISO Timestamp (String)
- `nextReview`: ISO Timestamp (String)
- `history`: ReviewResult[]

## State Transitions

### Progress Reset

- **Action**: `resetProgress`
- **Effect**:
  - `box` -> 1
  - `history` -> []
  - `nextReview` -> Now
  - `lastReviewed` -> Now

### Bulk Tagging

- **Action**: `addTag` (Bulk)
- **Input**: `ids: string[]`, `tag: string`
- **Effect**: Appends `tag` to `tags` array of all items matching `ids`, ensuring no duplicates.

- **Action**: `removeTag` (Bulk)
- **Input**: `ids: string[]`, `tag: string`
- **Effect**: Filters out `tag` from `tags` array of all items matching `ids`.
