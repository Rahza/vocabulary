# Research: System Bug Fixes & UI Refinements

## 1. Shuffling Algorithm (Distancing Rule)
**Status**: Resolved
**Decision**: Fix the bug in `smartShuffle` and implement a distance-aware picker.
**Rationale**: 
- `src/lib/shuffle.ts` had a critical reference error (`array` vs `items`). 
- The current implementation is too simple. We need a "backoff" or "buffer" strategy where the last 2 vocabulary IDs are kept in a history, and the next item picked from the pool must not match those IDs unless the pool only contains matching IDs.
- **Task**: Integrate `smartShuffle` into `TrainerPage.loadDueItems`.

## 2. Generator Blank Screen
**Status**: Resolved
**Decision**: Verify the `AnimatePresence` and conditional rendering in `src/app/generate/page.tsx`.
**Rationale**: When `generated` becomes `[]`, the UI should switch back to `GeneratorForm`. If a blank screen appears, it's likely a state sync issue or an animation hanging. We will ensure the form is rendered as the fallback.

## 3. Mnemonic UI Synchronization
**Status**: Resolved
**Decision**: Update `WordDetail` to manage its own internal word state synced with the `item` prop.
**Rationale**: `onRefresh` triggers a re-fetch in the parent, but React might not immediately push the new object down to the already-open Drawer if the reference update is swallowed. We will force a local state update in `WordDetail` when `item` changes or after the save is confirmed.

## 4. Custom Confirmation Dialog
**Status**: Resolved
**Decision**: Create a `ConfirmDialog` component using `framer-motion` and `lucide-react`.
**Rationale**: Native OS alerts are jarring and don't match the playful theme. We will implement a standard modal-like confirm component.

## 5. Trainer Progress Logic
**Status**: Resolved
**Decision**: Adjust progress formula to `((sessionCount) / initialCount) * 100` and increment `sessionCount` at the start of each card view or adjust the display text to `sessionCount + 1 / initialCount`.
**Rationale**: Users expect to see progress reflecting the current card they are on, not just completed ones.

## 6. AI Tag Refinement
**Status**: Resolved
**Decision**: Add "Use generic category tags (e.g. Numbers, Colors) and avoid word-specific or literal tags" to the prompt in `OpenAIService.ts`.
**Rationale**: Prevents low-value tags like "1" for the word "one".
