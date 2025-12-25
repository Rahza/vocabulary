# Feature Specification: UX Quality Enhancements

**Feature Branch**: `009-ux-quality-enhancements`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "The TagManager is not usable, three tags per row are too many, I can't see all the buttons for each tag. Add a \"typo helper\" - if only one character in a word is wrong, notify the user and let them try again, because it might be unintentional. Re-work the progress overview: More clearly show the progress (overall and per tag/category), to also see how many words are in which stage."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Typo Assistance (Priority: P1)

As a learner, I want the system to recognize when I've made a minor typo (one character off) so that I don't get punished for a simple slip of the hand and can correct my entry.

**Why this priority**: Directly impacts the "playful" and encouraging nature of the app. Preventing frustration from simple typos is a high-value UX improvement.

**Independent Test**: Can be tested in Trainer/Practice mode by entering a word with exactly one wrong character (or one missing/extra character). Success is defined by the system showing a "Typo?" hint instead of an immediate "Incorrect" state.

**Acceptance Scenarios**:

1. **Given** the correct answer is "Ahoj", **When** I type "Ahox", **Then** the system notifies me of a potential typo and allows me to edit my answer.
2. **Given** a typo notification is visible, **When** I correct the word to the exact match, **Then** the item is marked as correct.

---


### User Story 2 - Usable Tag Manager (Priority: P2)

As a user with many tags, I want the Tag Manager to be easy to use on all screen sizes so that I can manage my categories without UI elements overlapping or being hidden.

**Why this priority**: Current UI layout is reported as "unusable" due to density issues. Fixing navigation/management layout is essential for organized users.

**Independent Test**: Can be tested by navigating to the Tag Manager on a mobile device or narrow window and verifying all action buttons (edit, delete) are clearly visible and clickable.

**Acceptance Scenarios**:

1. **Given** the Tag Manager, **When** viewed on a mobile screen, **Then** tags are laid out in a way that all action buttons are accessible without horizontal scrolling or overlapping.

---


### User Story 3 - Detailed Progress Analytics (Priority: P2)

As a motivated learner, I want to see a detailed breakdown of my progress (both overall and per tag) so that I can see exactly how many words are in each stage of the Leitner system.

**Why this priority**: Provides clear feedback on learning success and helps users identify which categories need more focus.

**Independent Test**: Open the dashboard/stats view and verify that counts for each Box (1-5) are visible for the entire collection and when filtering by a specific tag.

**Acceptance Scenarios**:

1. **Given** the progress overview, **When** I view my stats, **Then** I see a chart or list showing the distribution of words across Box 1, Box 2, Box 3, Box 4, and Box 5.
2. **Given** a specific tag "Travel", **When** I look at its stats, **Then** I see the progress distribution specifically for words in that category.

---


### Edge Cases

- **Typo helper with very short words**: If a word only has 2-3 characters, a 1-character difference is 33-50% of the word. (Policy: Only enable typo helper for words with length > 2).
- **Multiple typos**: If 2 or more characters are wrong, the word is marked incorrect as usual.
- **Tag Manager with 0 tags**: Ensure an appropriate empty state is displayed.
- **Words with 0 progress data**: Ensure they are counted as "Box 1" or "New" in analytics.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST calculate the Levenshtein distance between the user input and the correct answer.
- **FR-002**: If the distance is exactly 1 and the word length is > 2, the system MUST show a "Typo detected" warning instead of failing the card.
- **FR-003**: The Tag Manager list MUST be redesigned to use a more flexible layout (e.g., one tag per row on mobile, two on tablet) to ensure all buttons are visible.
- **FR-004**: The progress overview MUST display a numerical and visual breakdown of items per Leitner Box (1 through 5).
- **FR-005**: The system MUST provide per-tag progress analytics, showing the box distribution for items within that tag.
- **FR-006**: Users MUST be able to re-submit an answer after a typo warning is triggered.

### Key Entities *(include if feature involves data)*

- **ProgressStats**: A data structure representing the count of items in each stage (Box 1-5).
- **LevenshteinMatch**: Result of the typo check logic.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of single-character typos (insert, delete, replace) are caught by the typo helper for words > 2 chars.
- **SC-002**: Tag Manager action buttons (Rename, Delete) have a minimum hit area of 44x44px on mobile.
- **SC-003**: Users can see the exact count of "Mastered" (Box 5) words per category in the dashboard.
- **SC-004**: 0% overlap between UI text and action buttons in the Tag Manager across standard breakpoints (320px to 1440px).