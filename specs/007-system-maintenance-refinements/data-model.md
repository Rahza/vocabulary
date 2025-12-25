# Data Model: System Refinements

This feature introduces new state transitions for global data maintenance.

## Entities (Existing)

### VocabularyItem
- `id`: UUID (String)
- `german`: String
- `czech`: String
- `mnemonic`: String (Optional)
- `tags`: String[]
- `difficulty`: String
- `createdAt`: ISO Timestamp (String)

## State Transitions

### Global Tag Rename
- **Action**: `renameTagGlobal`
- **Input**: `oldName: string`, `newName: string`
- **Effect**: 
    - Iterates over all `VocabularyItem` records.
    - Replaces all occurrences of `oldName` with `newName` in the `tags` array.
    - Ensures no duplicate tags are created if `newName` already existed in the array.

### Single-Word Mnemonic Update
- **Action**: `updateMnemonic`
- **Input**: `id: string`, `newMnemonic: string`
- **Effect**: Updates the `mnemonic` field of the specific `VocabularyItem`.

### Selection Persistence
- **Action**: Bulk Action (Add Tag / Remove Tag / Delete)
- **Effect**: Performs the action but keeps the `selectedIds` state in the UI component unchanged.
