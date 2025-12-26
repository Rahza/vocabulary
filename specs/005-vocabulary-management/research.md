# Research: Vocabulary Management

## 1. Client-Side Search and Filtering

**Status**: Resolved
**Decision**: Use React `useMemo` and standard string/array methods for filtering the vocabulary list in the frontend.
**Rationale**: With a target scale of 500-2000 items, client-side filtering is nearly instantaneous on modern devices. Keeping the entire collection in memory after initial load avoids unnecessary storage reads during active searching.
**Alternatives Considered**:

- _IndexedDB with search index_: Overkill for this scale; LocalStorage JSON parsing is fast enough.
- _Server-side search_: N/A as this is a local-first application.

## 2. Bulk Action UI/UX

**Status**: Resolved
**Decision**: Implement a checkbox-based selection system. When one or more items are selected, a floating or docked "Bulk Actions" bar will appear.
**Rationale**: This is a standard pattern in management interfaces (e.g., Gmail, File Explorers). It allows users to clearly see their selection while having access to actions like "Delete", "Add Tag", and "Remove Tag".
**Alternatives Considered**:

- _Right-click context menu_: Less discoverable and harder to implement for touch devices.

## 3. Data Integrity during Tag Operations

**Status**: Resolved
**Decision**: When deleting a tag from the "Tag Manager", the system will perform a linear scan of all vocabulary items and remove that tag from their `tags` array.
**Rationale**: Since tags are stored as embedded strings in `VocabularyPair`, global management requires updating multiple records. While O(n), the operation is rare and manageable within LocalStorage limits for the expected data size.
**Alternatives Considered**:

- _Normalized Tag Table_: Would require significant refactoring of the current data model. Linear scan is simpler and sufficient for the MVP.

## 4. Progress Reset Mechanism

**Status**: Resolved
**Decision**: Resetting a word's progress will reset its `LeitnerState` to `box: 1`, clear its review history, and set `nextReview` to the current time.
**Rationale**: This effectively makes the word "new" in the system without deleting the content itself.
