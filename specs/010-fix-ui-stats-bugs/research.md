# Research: UI & Stats Bug Fixes

## 1. Stats Calculation Inaccuracy
**Status**: Resolved
**Decision**: Calculate "Total Words" directly from the full collection in the repository instead of summing per-tag statistics.
**Rationale**: Currently, `StatsOverview` sums the `totalWords` from each `TagStats` object. Since words can have multiple tags, they are being double or triple-counted in the global dashboard summary.
**Implementation**: Update `getStats` or the Dashboard component to use `allVocab.length` for the global count.

## 2. Tag Manager Mobile Layout
**Status**: Resolved
**Decision**: Simplify the responsive grid and reduce horizontal padding for tag items on small screens.
**Rationale**: The `max-w-md` container constraint on the root layout means "mobile" screens are already very narrow. The current flex/grid setup within the tag list doesn't leave enough room for tag names + edit icons.
**Implementation**: Ensure the grid is `grid-cols-1` on mobile and refine the spacing within `TagList.tsx`.

## 3. Data Integrity during Deletions
**Status**: Resolved
**Decision**: Ensure tag counts update immediately.
**Rationale**: Users reported counts not always reflecting recent deletions. 
**Implementation**: Verify that `loadData` is called after every delete/rename operation.
