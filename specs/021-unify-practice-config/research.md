# Research & Technical Decisions: Unified Practice Configuration

## Terminology & UX

- **Decision**: Use "Sitzungslänge" (Session Length) as the common term for the count selection.
- **Rationale**: It's neutral and applies to both "Questions" (Classic) and "Rounds" (Connect Pairs).
- **Classic Specifics**: The number chosen (3, 5, 10) will represent the number of words to be tested.
- **Matching Specifics**: The number chosen (3, 5, 10) will represent the number of matching rounds (each round having 5 pairs).

## Component Abstraction

- **Decision**: Refactor `ConnectPairsConfig.tsx` into a generic `PracticeConfig.tsx`.
- **Rationale**: `ConnectPairsConfig` already has the superior multi-tag selection and "Back" button logic. It just needs to be parameterized.
- **Action**: Remove `TagSelector.tsx` once `PracticeConfig.tsx` is integrated.

## Classic Mode Multi-Tag Logic

- **Decision**: Update `handleConfigSelect` in `PracticePage.tsx` to accept `string[]` (tags).
- **Rationale**: Allows users to pool vocabulary from multiple categories for a single session.
- **Logic**: Fetch all words for all selected tags -> Deduplicate by ID -> Shuffle -> Slice to requested length.

## UI Consistency

- **Decision**: Add a "Beenden" button to the top-right of the Classic practice view.
- **Rationale**: Matches the `MatchingGame` UI and provides a way to exit a session without finishing it.
