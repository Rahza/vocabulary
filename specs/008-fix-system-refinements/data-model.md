# Data Model: Refinements

The core `VocabularyPair` and `LeitnerState` entities remain unchanged. This document defines the transient structures for the trainer queue.

## Transient Entities

### TrainingQueue (Refined)

An ordered list of `ReviewItem` entries.

- `items`: `ReviewItem[]`
- `Constraint`: No two items with the same `vocabId` may be within 2 indices of each other (Min distance = 2).

### ReviewItem

- `vocab`: `VocabularyPair`
- `direction`: `'DE_TO_CZ' | 'CZ_TO_DE'`
- `vocabId`: `string` (derived from `vocab.id`)
