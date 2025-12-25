# Data Model: Matching Game Refinements

## Entities

### SessionParameters (Update)
Represents the configuration used to start a practice session.

| Field | Type | Description |
|-------|------|-------------|
| mode | `PracticeMode` | 'classic' or 'connect-pairs' |
| tags | `string[]` | List of selected tags (multi-selection support) |
| length | `number` | Number of questions or rounds |

## State Transitions (Play Again)

1. **Session End**: User reaches the `summary` view.
2. **Click "Nochmal!"**: `onRestart` is triggered.
3. **Logic Check**: 
    - If `mode === 'classic'`, call `handleConfigSelect(selectedTag, selectedLength)`.
    - If `mode === 'connect-pairs'`, call `handleMatchingStart(activeSessionTags, selectedLength)`.
4. **Session Reset**: State is cleared, vocabulary is re-fetched/re-shuffled, and view switches to `practice`.
