# Research: Stats Visualization & Practice Page Fixes

## 1. Practice Page ReferenceError

**Status**: Resolved
**Decision**: Import the missing animation variants from `src/lib/animations.ts`.
**Rationale**: The investigation confirmed that `containerReveal` and `itemReveal` are utilized in the `PracticePage` component's JSX but are not included in the import statements. This is a classic "missing import" bug resulting from a previous refactor or incomplete implementation.

## 2. ProgressDistribution Bar Heights

**Status**: Resolved
**Decision**: Redesign the bar container's flex/height properties.
**Rationale**:

- In `ProgressDistribution.tsx`, the `motion.div` bar uses a percentage-based height (e.g., `height: "50%"`).
- In standard CSS, percentage heights are relative to the _immediate parent's_ height.
- Currently, the immediate parent (`div.relative.w-full.group`) has no height defined, so the child resolves to `0`.
- **Fix**: Set the parent container to `h-full` or `flex-1` within the outer `h-32` container, allowing the bars to grow correctly from the bottom up.
