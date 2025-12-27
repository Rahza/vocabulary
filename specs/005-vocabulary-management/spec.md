# Feature Specification: Vocabulary Management

**Feature Branch**: `005-vocabulary-management`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "Create a vocabulary to view, search and filter (by tags, progress, freetext) vocabulary. Allow the user to individually reset the progress of a word, to delete it, and to manage its tags (add, remove tags). Also add a tag manager to add/remove tags. Build a functionality to easily bulk assign/remove tags from vocabulary"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Browse and Filter Vocabulary (Priority: P1)

As a learner, I want to see a list of all my vocabulary so that I can review what I've collected. I need to be able to search by typing the word or its translation, and filter by specific tags or by how well I know the word (learning progress).

**Why this priority**: This is the core functionality that allows users to access and organize their learning material. Without this, the other management features have no context.

**Independent Test**: Can be fully tested by opening the vocabulary list, entering text in a search bar, and selecting filter options. Success is defined by the list correctly reflecting the search/filter criteria.

**Acceptance Scenarios**:

1. **Given** a collection of vocabulary words, **When** I type a word in the search box, **Then** only words matching that text (term or translation) are displayed.
2. **Given** words with different tags and progress levels, **When** I select a specific tag or progress filter, **Then** only matching words are shown.

---

### User Story 2 - Individual Word Management (Priority: P1)

As a learner, I want to be able to delete words I no longer need, reset the progress of a word if I feel I've forgotten it, and quickly add or remove tags for a specific word.

**Why this priority**: Allows for maintenance of the vocabulary list and fine-tuning of the learning process for specific items.

**Independent Test**: Can be tested by selecting a word and clicking delete, reset, or editing its tags, then verifying the change in the list or database.

**Acceptance Scenarios**:

1. **Given** a specific word in the list, **When** I choose to reset its progress, **Then** its learning state returns to the "unlearned" or "new" status.
2. **Given** a word I want to remove, **When** I click delete and confirm, **Then** the word is removed from my collection.

---

### User Story 3 - Tag Manager (Priority: P2)

As an organized learner, I want a dedicated place to create and delete tags so that I can keep my categorization system clean and consistent across all words.

**Why this priority**: Provides the structure needed for the tagging system to be useful at scale.

**Independent Test**: Can be tested by opening the tag manager, creating a new tag, and ensuring it appears in tag selection lists for words. Deleting a tag should remove it from all words.

**Acceptance Scenarios**:

1. **Given** the tag manager, **When** I create a new tag "Medical", **Then** "Medical" is available to be assigned to any word.
2. **Given** a tag assigned to multiple words, **When** I delete that tag in the manager, **Then** it is removed from all those words.

---

### User Story 4 - Bulk Tag Actions (Priority: P3)

As a power user, I want to select multiple words at once and add or remove tags from all of them simultaneously.

**Why this priority**: Significant time-saver for users with large vocabulary sets, though not strictly required for basic management.

**Independent Test**: Can be tested by selecting multiple words in the list and applying a "Bulk Add Tag" action, then verifying all selected words have the new tag.

**Acceptance Scenarios**:

1. **Given** multiple selected words, **When** I apply a bulk "Add Tag" action, **Then** all selected words receive the tag.

---

### Edge Cases

- **Search with no results**: The system should display a clear message indicating no matches were found.
- **Deleting a tag in use**: Deleting a tag from the tag manager should remove it from all vocabulary items without deleting the items themselves.
- **Bulk actions with empty selection**: The bulk action buttons should be disabled or prompt the user to select items first.
- **Duplicate tags**: Prevent creating two tags with the same name (case-insensitive).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide a searchable list of all vocabulary items.
- **FR-002**: System MUST allow filtering by tag(s) and by progress level (e.g., box number or category).
- **FR-003**: System MUST provide an interface to reset the progress of a selected word to its initial state.
- **FR-004**: System MUST allow permanent deletion of vocabulary items with a user confirmation.
- **FR-005**: System MUST provide an interface to add or remove tags from an individual word.
- **FR-006**: System MUST include a Tag Manager to create and delete tags globally.
- **FR-007**: System MUST allow selecting multiple vocabulary items and applying "Add Tag" or "Remove Tag" actions to the entire selection.
- **FR-008**: System MUST prevent the creation of duplicate tag names.

### Key Entities _(include if feature involves data)_

- **VocabularyItem**: Represents a learning unit. Contains the foreign term, native translation, mnemonic, tags list, and progress metadata (e.g., current box in Leitner system).
- **Tag**: Represents a category. Has a unique name.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can find any word in a list of 500+ items using search or filters in under 3 seconds.
- **SC-002**: Resetting progress or deleting a word requires no more than 2 clicks (action + confirmation).
- **SC-003**: Bulk tagging 20 words is at least 5x faster than tagging them individually.
- **SC-004**: System maintains data integrity when tags are deleted from the Tag Manager (no orphaned tag references).
