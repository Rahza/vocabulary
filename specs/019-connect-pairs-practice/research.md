# Research & Technical Decisions: Connect Pairs Practice Mode

## UI/UX: Matching Interface

- **Decision**: Use a two-column grid layout where each word is a clickable/tappable card.
- **Rationale**: Provides a clear visual separation between the two languages.
- **Interaction Pattern**:
  - User taps a word in the left column (e.g., German).
  - Left word becomes "active" (highlighted).
  - User taps a word in the right column (e.g., Czech).
  - System checks for match.
  - If match: Both cards turn green and eventually disappear/disable.
  - If mismatch: Cards turn red, shake, and then reset highlight.
- **Alternatives Considered**: Drag and drop. Rejected because it's harder to implement reliably on mobile and less efficient for quick practice sessions.

## Animations: Framer Motion Integration

- **Decision**: Use Framer Motion `AnimatePresence` and `layout` props.
- **Rationale**: Enables smooth transitions when items are removed or when the next round starts.
- **Specifics**:
  - Shake animation for incorrect matches using `x: [-10, 10, -10, 10, 0]`.
  - Scale/fade out for matched pairs.
  - Entrance animations for each new round.

## State Management: Round Logic

- **Decision**: Local state within the `PracticePage` or a dedicated `ConnectPairsSession` component.
- **Rationale**: Simple enough for local state; doesn't need global storage since no Leitner progress is updated.
- **State Structure**:
  ```typescript
  interface MatchingState {
    leftItems: string[]; // Randomized German words
    rightItems: string[]; // Randomized Czech words
    matches: Record<string, string>; // Maps German -> Czech
    selectedLeft: string | null;
    selectedRight: string | null;
    completedPairs: string[]; // IDs of matched pairs
    mistakes: number;
  }
  ```

## Mobile Optimization

- **Decision**: Limit to 5 pairs per screen (FR-008).
- **Rationale**: 10 items (5 per column) fit comfortably on a mobile screen without excessive scrolling or too-small tap targets.
- **Implementation**: Use `flex-1` for cards to ensure they fill the available space.
