# Data Model

## Entities

### VocabularyItem

Represents a single vocabulary unit for learning.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | `string` (UUID) | Unique identifier | Required |
| `term` | `string` | The foreign word (to be learned) | Required, Unique (case-insensitive) |
| `translation` | `string` | The native language equivalent (German) | Required |
| `mnemonic` | `string` | A memory aid sentence/phrase | Optional |
| `tags` | `string[]` | Categories or topics | Optional |
| `difficulty` | `number` (1-5) | Leitner system level | Default: 1 |
| `createdAt` | `number` (Timestamp) | Creation date | Required |

## Storage Schema (LocalStorage)

**Key**: `vocabulary_v1`
**Value**: `VocabularyItem[]`
