# Research: UX Quality Enhancements

## 1. String Similarity (Typo Helper)
**Status**: Resolved
**Decision**: Implement a custom `getLevenshteinDistance` utility in `src/lib/string.ts`.
**Rationale**: We only need a simple distance calculation to detect 1-character errors. Using a lightweight utility avoids adding external dependencies while maintaining control over the logic (e.g., case sensitivity, length constraints).
**Application**: A distance of exactly 1 will trigger a "Typo" state in the `Flashcard` component.

## 2. Granular Progress Stats
**Status**: Resolved
**Decision**: Expand the `TagStats` interface to include a `boxDistribution` object.
**Rationale**: 
- **Current**: Only `masteredWords` (Box 5) and `learningWords` (Box 1-4).
- **Proposed**: `boxDistribution: { 1: number, 2: number, 3: number, 4: number, 5: number }`.
- This allows the dashboard to show a detailed histogram or breakdown of the collection state.

## 3. Tag Manager Layout
**Status**: Resolved
**Decision**: Redesign `TagList.tsx` using a CSS Grid or Flexbox with specific constraints.
**Rationale**: 
- Remove `group-hover` dependency for action buttons (always show or use a clear edit icon).
- Implement a responsive grid: 1 column on mobile (< 640px), 2 columns on tablet, 3+ on desktop.
- Use `min-width: 0` on text containers to prevent overflow.

## 4. Trainer Shuffling Distancing
**Status**: Resolved
**Decision**: Implement a "Buffered Shuffle" in `src/lib/shuffle.ts`.
**Rationale**: Instead of a simple greedy approach, the algorithm will maintain a sliding window of the last 2 IDs and pick the first available item from the pool that doesn't match the window. If a conflict is unavoidable (e.g., at the very end of the pool), it will use the least-recent ID.
