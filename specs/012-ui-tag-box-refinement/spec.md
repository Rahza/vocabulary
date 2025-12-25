# Feature Specification: Tag Management & Progress Visualization Refinement

**Feature Branch**: `012-ui-tag-box-refinement`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "In the tag management, only show one tag per row. The tag name is not visible right now. The vocabulary \"boxes\" are boring (just numbered), give them proper names/icons/emojis (at least on hover)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Single-Column Tag Manager (Priority: P1)

As a user, I want the Tag Manager to show only one tag per row with visible names, so that I can easily read and manage my tags without clutter.

**Why this priority**: Directly addresses usability issues in the Tag Manager where text is reportedly invisible or layout is broken.

**Independent Test**: Can be fully tested by opening the Tag Management page and verifying the layout and text visibility.

**Acceptance Scenarios**:

1. **Given** the Tag Management page, **When** viewed on any screen size, **Then** each tag occupies exactly one full row.
2. **Given** a list of tags, **When** viewing the Tag Manager, **Then** the name of each tag is clearly visible and legible.

---

### User Story 2 - Playful Leitner Boxes (Priority: P2)

As a learner, I want the vocabulary boxes to have descriptive names and icons instead of just numbers, so that I feel more motivated by my progress.

**Why this priority**: Enhances the "playful" nature of the application and provides better feedback on learning stages.

**Independent Test**: Can be tested by checking the dashboard and word detail views to see if boxes are represented by names and icons.

**Acceptance Scenarios**:

1. **Given** the progress overview, **When** I look at the boxes, **Then** I see an icon and a name (e.g., "Keimling", "Meister") instead of just "Box 1".
2. **Given** a word card, **When** I hover over or view its progress box, **Then** the descriptive name and icon are displayed.

---

### Edge Cases

- **Very long tag names**: Ensure that in the single-row layout, extremely long tag names wrap or truncate gracefully without pushing action buttons off-screen.
- **Empty box states**: Ensure that boxes with 0 words still show their name and icon in the distribution chart.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST force a single-column layout for the Tag Manager list items regardless of screen width.
- **FR-002**: System MUST ensure tag name text is visible and not hidden by other UI elements or container constraints.
- **FR-003**: System MUST define and display a unique icon/emoji and a descriptive name for each of the 5 Leitner boxes.
  - Suggested mapping (German):
    - Box 1: 🌱 Keimling
    - Box 2: 🌿 Setzling
    - Box 3: 🌳 Jungbaum
    - Box 4: 🏰 Erfahren
    - Box 5: 🏆 Meister
- **FR-004**: Progress charts and distribution displays MUST use these new names and icons.

### Key Entities *(include if feature involves data)*

- **LeitnerBoxDefinition**: A mapping of box index (1-5) to its name and icon.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of tags in Tag Manager are displayed in a single-column list.
- **SC-002**: Tag names are visible in the Tag Manager UI.
- **SC-003**: All 5 Leitner boxes are identified by names and icons in the dashboard distribution chart.