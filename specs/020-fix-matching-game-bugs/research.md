# Research & Technical Decisions: Matching Game Refinements

## UI/UX: Visual Persistence

- **Decision**: Correct pairs will stay in the grid but with a "muted" style.
- **Rationale**: Keeps visual context and gives a sense of accomplishment as the grid fills with "completed" items.
- **Implementation**: 
    - Opacity: 0.5
    - Background: `bg-playful-green/20`
    - Pointer-events: `none` (to prevent re-selection)

## Interaction: Precise Error Feedback

- **Decision**: Highlight only the two selected items on error.
- **Rationale**: The current implementation might be accidentally highlighting the "correct" match or providing confusing feedback. Strictly limiting the error state to the user's selection is more intuitive.
- **Implementation**: 
    - Update `incorrectIds` state management to only include `selectedLeft.id` and `selectedRight.id`.
    - Ensure the timeout resets these IDs correctly without affecting other items.

## Logic: "Play Again" Functional Loop

- **Decision**: Implement a robust session configuration capture in `PracticePage`.
- **Rationale**: The "Play again" button likely fails because it doesn't correctly re-invoke the start logic with the same parameters (especially for multi-tag Connect Pairs sessions).
- **Implementation**: 
    - Ensure `handleRestart` in `PracticePage` correctly routes to `handleMatchingStart` when in `connect-pairs` mode.
    - Store `selectedTags` (plural) for matching sessions.
