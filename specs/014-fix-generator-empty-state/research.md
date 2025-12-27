# Research: Generator Empty State Fix

## 1. Root Cause: Race Condition in State Clearing

**Status**: Resolved
**Decision**: Prevent clearing the `generated` list state until the "results" view has successfully exited the DOM.
**Rationale**:

- `AnimatePresence` with `mode="wait"` performs an exit animation for the results component.
- `GeneratedList` currently returns `null` if `items.length === 0`.
- When the user saves or discards, both `view` is changed to "form" and `generated` is set to `[]`.
- During the 0.3s exit transition, `GeneratedList` renders `null`, showing a blank page under the heading.
- **Fix**: Remove the `if (items.length === 0) return null;` guard in `GeneratedList.tsx` or clear the data _after_ the view switch completes.

## 2. Transition Polish

**Status**: Resolved
**Decision**: Use an explicit state transition flow.
**Rationale**: To ensure the user always sees a functional UI, we will keep the data visible during the exit animation. This provides visual continuity and prevents the "dead-end" appearance.

## 3. UI Consistency Audit

**Status**: Resolved
**Decision**: Verify that all buttons in the generator (form submission, save, discard) handle loading and disabled states correctly.
**Rationale**: Prevents double-submissions or overlapping animations.
