# Tasks: Vocabulary Management

**Feature Branch**: `005-vocabulary-management`
**Implementation Plan**: [specs/005-vocabulary-management/plan.md](plan.md)

## Implementation Strategy

This feature will be implemented incrementally, starting with repository extensions to support the new management operations. We will then build the UI in layers, starting with the core vocabulary list and filtering (US1), followed by individual word management (US2), and finally the global tag manager (US3) and bulk actions (US4).

## Dependencies

- **Phase 1 (Setup)**: Must complete before any functional implementation.
- **Phase 2 (Foundational)**: Provides the UI structure for US1 and US2.
- **Phase 3 (US1)**: Prerequisite for US2 and US4 as it provides the list view.
- **Phase 4 (US2)**: Independent from US3 but shares some UI components.
- **Phase 5 (US3)**: Independent global management.
- **Phase 6 (US4)**: Depends on US1 (list selection) and US3 (tag list).

## Parallel Execution Examples

- **US1 UI** and **Repository Extensions** can be developed in parallel once the interface is defined.
- **Tag Manager UI** and **Vocabulary List UI** can be developed in parallel.

---

## Phase 1: Setup

**Goal**: Prepare the repository and types for management operations.

- [x] T001 [P] Extend `IVocabularyRepository` with management methods in `src/services/storage/IVocabularyRepository.ts`
- [x] T002 Implement `resetProgress` in `src/services/storage/LocalStorageRepository.ts`
- [x] T003 Implement `bulkDelete` in `src/services/storage/LocalStorageRepository.ts`
- [x] T004 Implement `bulkAddTag` and `bulkRemoveTag` in `src/services/storage/LocalStorageRepository.ts`
- [x] T005 Implement `deleteTagGlobal` and `renameTagGlobal` in `src/services/storage/LocalStorageRepository.ts`

## Phase 2: Foundational UI

**Goal**: Establish the routes and basic page structures.

- [x] T006 [P] Create vocabulary management page route in `src/app/vocabulary/page.tsx`
- [x] T007 [P] Create tag management page route in `src/app/tags/page.tsx`
- [x] T008 [P] Add navigation links for the new pages in `src/components/layout/Navigation.tsx`

## Phase 3: User Story 1 - Browse and Filter (Priority: P1)

**Goal**: Implement a performant, searchable, and filterable vocabulary list.
**Independent Test**: Verify that searching for "Space" correctly filters the list and that selecting a tag shows only matching words.

- [x] T009 [P] [US1] Create `SearchFilters` component with search bar and tag dropdown in `src/components/vocabulary/SearchFilters.tsx`
- [x] T010 [US1] Create `VocabularyList` component with basic word cards in `src/components/vocabulary/VocabularyList.tsx`
- [x] T011 [US1] Implement filtering logic using `useMemo` in `src/app/vocabulary/page.tsx`
- [x] T012 [US1] Implement empty state for search results in `src/components/vocabulary/VocabularyList.tsx`

## Phase 4: User Story 2 - Individual Word Management (Priority: P1)

**Goal**: Allow users to maintain individual vocabulary items.
**Independent Test**: Reset a word's progress and confirm it returns to Box 1. Delete a word and confirm it's removed.

- [x] T013 [P] [US2] Create `WordActions` component with Reset, Delete, and Tag edit buttons in `src/components/vocabulary/WordActions.tsx`
- [x] T014 [US2] Integrate `WordActions` into the vocabulary list cards in `src/components/vocabulary/VocabularyList.tsx`
- [x] T015 [US2] Implement delete confirmation dialog in `src/components/vocabulary/WordActions.tsx`
- [x] T016 [US2] Implement inline tag adding/removing for individual words in `src/components/vocabulary/WordActions.tsx`

## Phase 5: User Story 3 - Tag Manager (Priority: P2)

**Goal**: Provide global tag management capabilities.
**Independent Test**: Create a new tag and confirm it appears in the filter list. Delete a tag and confirm it's removed from all words.

- [x] T017 [P] [US3] Create `TagEditor` component for creating new tags in `src/components/tags/TagEditor.tsx`
- [x] T018 [P] [US3] Create `TagList` component with global delete actions in `src/components/tags/TagList.tsx`
- [x] T019 [US3] Integrate global tag deletion with `LocalStorageRepository` in `src/app/tags/page.tsx`
- [x] T020 [US3] Prevent duplicate tag creation in `src/components/tags/TagEditor.tsx`

## Phase 6: User Story 4 - Bulk Tag Actions (Priority: P3)

**Goal**: Enable time-saving bulk operations for large collections.
**Independent Test**: Select 5 words, apply a "Bulk Add Tag" action, and verify all 5 words now have that tag.

- [x] T021 [US4] Implement selection state (checkboxes) in `src/components/vocabulary/VocabularyList.tsx`
- [x] T022 [US4] Create `BulkActions` toolbar component in `src/components/vocabulary/BulkActions.tsx`
- [x] T023 [US4] Implement bulk add/remove tag logic in `src/components/vocabulary/BulkActions.tsx`
- [x] T024 [US4] Implement bulk delete logic in `src/components/vocabulary/BulkActions.tsx`

## Phase 7: Polish & Cross-Cutting

**Goal**: Ensure performance and visual consistency.

- [x] T025 [P] Verify search/filter performance with 500+ mock items
- [x] T026 Add Framer Motion transitions for list filtering in `src/components/vocabulary/VocabularyList.tsx`
- [x] T027 Ensure consistent German localization across all new management features
