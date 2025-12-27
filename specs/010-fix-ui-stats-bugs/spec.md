# Feature Specification: UI & Stats Bug Fixes

**Feature Branch**: `010-fix-ui-stats-bugs`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "The tag manager is still unusable. On small screens, just display one tag per row. In the overview, the total count for words is not correct."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Responsive Tag Manager (Priority: P1)

As a mobile user, I want the Tag Manager to display only one tag per row so that the tag names are not truncated and the action buttons are clearly accessible.

**Why this priority**: Corrects a usability blocker identified in the previous version. Essential for managing the app on smaller devices.

**Independent Test**: Open the Tag Manager on a device with a screen width < 640px and verify that tags are stacked vertically (one per row).

**Acceptance Scenarios**:

1. **Given** a mobile screen size, **When** I view the Tag Manager, **Then** each tag occupies its own row.
2. **Given** a tablet or desktop screen size, **When** I view the Tag Manager, **Then** tags are displayed in multiple columns as before.

---

### User Story 2 - Accurate Collection Stats (Priority: P1)

As a learner, I want the total word count in the overview to be accurate so that I have a reliable understanding of my collection size and progress.

**Why this priority**: Functional correctness of the dashboard is critical for user trust and tracking growth.

**Independent Test**: Manually count the unique vocabulary items in the grimoire and compare it with the "Total Words" count on the dashboard.

**Acceptance Scenarios**:

1. **Given** a collection of 50 unique words, **When** I view the dashboard, **Then** the total count should display exactly 50.
2. **Given** I add a new word through the generator, **When** I return to the dashboard, **Then** the total count should increment by exactly 1.

---

### Edge Cases

- **Very long tag names**: On single-row mobile view, ensure text wrap or truncation still allows "Edit" and "Delete" icons to be visible.
- **Empty collection**: Dashboard should show 0 instead of a blank or error state.
- **Deleted tags**: Ensure the count correctly updates immediately after a tag or word is deleted.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The Tag Manager grid MUST use a single-column layout for screen widths below the 640px (Tailwind 'sm') breakpoint.
- **FR-002**: The `getStats` calculation MUST accurately count the number of unique `VocabularyPair` entities, regardless of their Leitner box distribution or tags.
- **FR-003**: The total count calculation MUST be verified to ensure it doesn't double-count words that have two review directions.
- **FR-004**: Dashboard UI components MUST re-render with fresh data whenever the vocabulary collection is modified.

### Key Entities

- **VocabularyStats**: Metadata structure updated to reflect accurate collection size.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of tags in Tag Manager are stacked vertically on screens < 640px wide.
- **SC-002**: Dashboard "Total Words" count matches the database record count with 100% accuracy.
- **SC-003**: UI state update latency for total count after a word addition/deletion is < 200ms.
