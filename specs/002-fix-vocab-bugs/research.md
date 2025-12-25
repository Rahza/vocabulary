# Research & Technical Decisions: Fix Vocab Bugs

## Shuffle Algorithm

- **Problem**: Ensure minimum distance of 2 between identical words (vocabID match) in the review queue.
- **Decision**: Greedy Construction with Backtracking or Relaxation.
- **Algorithm**:
  1. Start with a randomized list of items.
  2. Build a new `queue` item by item.
  3. For each slot, try to pick an item from the source list that hasn't been used recently (last 2 items in `queue`).
  4. If no valid item exists (e.g., end of list with only duplicates left), force pick one (best effort).
- **Rationale**: Simple to implement for small lists (<100 items). Deterministic enough for testing.

## Notifications (Toasts)

- **Problem**: `window.alert()` is blocking and ugly.
- **Decision**: Use `sonner` library.
- **Rationale**:
  - Very lightweight (~1kb).
  - Modern, beautiful default design (black/white).
  - Easy integration (`<Toaster />` in layout, `toast()` function anywhere).
  - Fits "Engineering Excellence" (standard library vs custom code maintenance).

## Virtual Keyboard

- **Problem**: German chars present, Czech chars missing.
- **Decision**: Hardcoded update to the character array.
- **Data**: `['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š', 'ť', 'ú', 'ů', 'ý', 'ž']`.
