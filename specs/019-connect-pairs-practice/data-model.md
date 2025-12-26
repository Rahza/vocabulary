# Data Model: Connect Pairs Practice Mode

## Entities

### PracticeMode

Distinguishes between session types.

- `CLASSIC`: Standard flashcard style.
- `CONNECT_PAIRS`: The new matching mode.

### MatchingItem

A single word card in the matching grid.

- `id`: Unique identifier (vocab ID).
- `text`: The word content.
- `language`: 'german' | 'czech'.

### RoundConfig

The configuration for a single matching round.

- `pairs`: Array of `VocabularyPair` objects (exactly 5).
- `leftColumn`: Shuffled German words.
- `rightColumn`: Shuffled Czech words.

## State Transitions (Matching Round)

1. **Initial**: All items displayed, `selectedLeft` and `selectedRight` are null.
2. **Select Left**: User taps a left item. `selectedLeft` updates.
3. **Select Right**: User taps a right item.
   - If `text(selectedLeft)` matches `text(selectedRight)`:
     - Add ID to `completedPairs`.
     - Reset selections.
   - Else:
     - Trigger error animation.
     - Increment `mistakes`.
     - Reset selections after delay.
4. **Round Complete**: `completedPairs.length === 5`. Trigger transition to next round or summary.
