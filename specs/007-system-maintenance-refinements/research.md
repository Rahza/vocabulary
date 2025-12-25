# Research: System Maintenance & Refinements

## 1. Trainer Mode Fixes
**Status**: Resolved
**Decision**: Implement the `onSkip` callback in `src/app/trainer/page.tsx`.
**Rationale**: The `Flashcard` component already supports a Skip button, but the `TrainerPage` (the parent) doesn't provide the logic to handle it. Adding a handler that advances the queue without marking progress will fix the button.
**Aids Restriction**: We will add a `hideAids` prop or similar to `Flashcard` to disable Tips and Mnemonics in Trainer mode specifically.

## 2. Bulk Selection Persistence
**Status**: Resolved
**Decision**: Remove the `setSelectedIds([])` calls from bulk operation handlers in `src/app/vocabulary/page.tsx`.
**Rationale**: These calls explicitly clear the selection state upon successful completion. Removing them will allow the user to perform multiple operations on the same selection.

## 3. Non-Interactive Testing
**Status**: Resolved
**Decision**: Update `package.json` scripts.
**Rationale**: 
- Change `"test": "vitest"` to `"test": "vitest run"`.
- Add `"test:watch": "vitest"`.
This ensures `npm test` is CI-friendly while providing a dedicated watch script for development.

## 4. Single-Word Mnemonic Refresh
**Status**: Resolved
**Decision**: Extend `OpenAIService` with a `generateSingleMnemonic(german: string, czech: string)` method.
**Rationale**: The current service is optimized for bulk generation. A specialized method with a focused prompt ("Generate ONLY a mnemonic for X and Y in German") will provide a better user experience for individual card updates.

## 5. Global Tag Renaming
**Status**: Resolved
**Decision**: 
1. Add `renameTag(oldName: string, newName: string)` to `LocalStorageRepository`.
2. Update `TagList.tsx` to include an edit button/input.
**Rationale**: Global renaming is a missing core feature for vocabulary organization. The implementation will perform a linear scan of all vocabulary items to update their `tags` array.
