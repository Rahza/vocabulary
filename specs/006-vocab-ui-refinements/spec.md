# Feature Specification: Vocabulary UI/UX Refinements

**Feature Branch**: `006-vocab-ui-refinements`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "Add a button to generate vocabulary in the collection. The checkboxes look a bit off. Don't display the mnemonic of each word directly in the overview, only in the \"detail view\" (todo). Try to fit more words on the screen, make them a bit smaller, so that management is a bit easier."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Compact Overview (Priority: P1)

As a learner with a large vocabulary, I want to see a compact list of my words so that I can browse and manage many items without excessive scrolling.

**Why this priority**: Directly addresses the user's primary pain point about management ease and screen space efficiency.

**Independent Test**: Can be tested by comparing the number of visible words on a single screen before and after the change. Success is seeing at least 30-50% more items simultaneously.

**Acceptance Scenarios**:

1. **Given** a list of 20 vocabulary items, **When** I view the collection page, **Then** more items are visible above the fold compared to the previous version.
2. **Given** the compact view, **When** I scroll, **Then** the scrolling feels more efficient for large lists.

---

### User Story 2 - Generator Integration (Priority: P1)

As a user managing my collection, I want a direct way to generate new words without leaving the management context.

**Why this priority**: Simplifies the "Manage -> Find Gaps -> Add New" workflow loop.

**Independent Test**: Can be tested by finding a "Generate" button on the collection page and verifying it triggers the generation flow.

**Acceptance Scenarios**:

1. **Given** the vocabulary collection page, **When** I click the "Generate" button, **Then** I am presented with the vocabulary generation interface (inline or via navigation).

---

### User Story 3 - Word Detail View (Priority: P2)

As a learner, I want to keep the overview clean but still access helpful information like mnemonics when I need them.

**Why this priority**: Essential for keeping the overview compact while preserving the "playful" learning value of mnemonics.

**Independent Test**: Can be tested by clicking on a word card and verifying a "Detail View" (drawer or modal) opens showing the mnemonic.

**Acceptance Scenarios**:

1. **Given** the vocabulary list, **When** I click a word card, **Then** a detail view opens showing the mnemonic and other metadata.
2. **Given** the collection overview, **When** I browse words, **Then** mnemonics are hidden by default to save space.

---

### User Story 4 - Polished Selection UI (Priority: P2)

As a user performing bulk actions, I want the selection checkboxes to look integrated and professional.

**Why this priority**: Improves the visual quality and perceived stability of the management tools.

**Independent Test**: Can be tested by visually inspecting the checkbox alignment and styling during bulk selection mode.

**Acceptance Scenarios**:

1. **Given** the bulk selection mode is active, **When** I view the cards, **Then** checkboxes are perfectly aligned and match the "playful" design system.

---

### Edge Cases

- **Very long terms/translations**: Ensure they wrap or truncate gracefully in the compact view without breaking the grid/list layout.
- **Empty mnemonics**: Ensure the detail view handles missing mnemonics without showing ugly empty states.
- **Mobile responsiveness**: Verify that "compact" doesn't mean "unclickable" on mobile devices (touch targets must remain accessible).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide a "Generate Vocabulary" button directly within the collection/management view.
- **FR-002**: System MUST hide the mnemonic text from the primary list items in the vocabulary overview.
- **FR-003**: System MUST implement a Detail View (Modal or Drawer) that displays the full word information, including the mnemonic aid.
- **FR-004**: System MUST reduce the vertical height and padding of vocabulary list cards to maximize information density.
- **FR-005**: System MUST refine the styling and alignment of checkboxes used for bulk selection.
- **FR-006**: The "Detail View" MUST provide access to the same actions available in the overview (Reset, Delete, Edit Tags).

### Key Entities _(include if feature involves data)_

- **VocabularyItem**: Use existing entity, no schema changes required.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Increase the number of visible vocabulary items on a standard mobile screen by at least 40%.
- **SC-002**: Users can navigate from collection to generation in 1 click.
- **SC-003**: Mnemonics are 100% hidden in the overview list.
- **SC-004**: Checkbox alignment matches the text baseline or center within 1px.
