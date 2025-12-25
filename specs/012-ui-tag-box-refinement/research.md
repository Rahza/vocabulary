# Research: Tag Management & Progress Visualization Refinement

## 1. Tag Manager Usability Fix
**Status**: Resolved
**Decision**: Enforce a single-column grid (`grid-cols-1`) for the Tag Management page and remove restrictive typography classes that cause clipping.
**Rationale**: The previous `grid-cols-1 md:grid-cols-2 xl:grid-cols-3` layout, combined with the root `max-w-md` container, made tag rows too narrow. By forcing a single column, we ensure ample horizontal space for tag names and action buttons. Removing `tracking-widest` will further improve text fit.

## 2. Centralized Box Definitions
**Status**: Resolved
**Decision**: Create a centralized constant object `BOX_DEFINITIONS` in `src/constants/box-definitions.ts`.
**Rationale**: Currently, box names and logic are scattered across `ProgressDistribution.tsx`, `WordDetail.tsx`, and `StatsOverview.tsx`. Centralizing the mapping of index (1-5) to name and icon simplifies maintenance and ensures UI consistency.

**Mapping**:
- 1: 🌱 Keimling
- 2: 🌿 Setzling
- 3: 🌳 Jungbaum
- 4: 🏰 Erfahren
- 5: 🏆 Meister

## 3. Visualization Enhancements
**Status**: Resolved
**Decision**: Update `ProgressDistribution` to show box icons by default and names on hover (or as secondary labels).
**Rationale**: Icons provide a quick visual cue, while names provide context. This satisfies the user's desire for a less "boring" numbered system.
