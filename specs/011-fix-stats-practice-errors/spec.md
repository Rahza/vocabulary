# Feature Specification: Stats Visualization & Practice Page Fixes

**Feature Branch**: `011-fix-stats-practice-errors`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "In the overview, the visualisation of the overall progress in the boxes is not correct, the boxes don't have a height. Practice page is not working: Runtime ReferenceError containerReveal is not defined src/app/practice/page.tsx (104:17) @ PracticePage"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Functional Practice Page (Priority: P1)

As a learner, I want to use the Practice page without any runtime crashes so that I can study my vocabulary categories effectively.

**Why this priority**: Core application functionality is currently broken. Fixing a runtime crash is the highest priority.

**Independent Test**: Can be tested by navigating to the Practice page (`/practice`) and selecting a tag. Success is defined by the page loading correctly without throwing a `ReferenceError`.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I click on the "Practice" link, **Then** the page loads successfully and I can select a topic.
2. **Given** a selected topic, **When** the practice session begins, **Then** the UI elements are rendered without crashing.

---

### User Story 2 - Visible Progress Visualization (Priority: P1)

As a learner, I want to see a clear visual representation of my word distribution across Leitner boxes on the dashboard so that I can gauge my learning progress at a glance.

**Why this priority**: Essential for the "Detailed Progress Analytics" feature value. A visualization with zero height provides no information to the user.

**Independent Test**: Can be tested by opening the dashboard and verifying that the "Box Verteilung" chart has visible bars with heights relative to the number of words in each box.

**Acceptance Scenarios**:

1. **Given** I have words in various Leitner boxes, **When** I view the dashboard, **Then** the progress distribution chart displays bars with non-zero heights for non-empty boxes.

---

### Edge Cases

- **Practice page with no vocabulary**: Ensure the page handles empty collections gracefully instead of crashing or showing a blank state.
- **Progress bars with 100% capacity**: Ensure that if all words are in one box, the bar doesn't exceed its container bounds.
- **Mobile responsiveness**: Verify the progress visualization is visible and correctly scaled on narrow mobile screens.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Resolve the `ReferenceError: containerReveal is not defined` in `src/app/practice/page.tsx` by correctly importing or defining the required animation variants.
- **FR-002**: Fix the CSS or Framer Motion properties in the progress distribution component to ensure bars have a visible, relative height.
- **FR-003**: Ensure all animation variants used in the application are exported from a shared library or defined locally in the component.
- **FR-004**: System MUST accurately map the `boxDistribution` data to the vertical scale of the progress chart.

### Key Entities

- **ProgressDistribution**: The UI component responsible for rendering the Leitner box histogram.
- **AnimationVariants**: Shared motion definitions (e.g., `containerReveal`, `itemReveal`).

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Practice page load time is < 500ms without console errors.
- **SC-002**: Progress distribution bars have a minimum visible height of 4px for boxes containing at least one word.
- **SC-003**: 100% of reported runtime errors in `src/app/practice/page.tsx` are eliminated.
