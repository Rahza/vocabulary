# Feature Specification: Restyle Light Mode

**Feature Branch**: `018-restyle-light-mode`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "Light mode still looks super ugly and just uses the same components as dark mode in many place. Completely re-style light mode without modifying the dark mode look."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Polished Light Mode Experience (Priority: P1)

As a user, I want a light mode that feels like a first-class citizen, with a distinct and appealing visual design, so that I can enjoy using the app in bright environments.

**Why this priority**: High impact on perceived quality and user satisfaction.

**Independent Test**: Can be tested by switching to light mode and verifying that components have a unique, polished look compared to dark mode.

**Acceptance Scenarios**:

1. **Given** the application is in light mode, **When** I view the Dashboard or Vocabulary List, **Then** the backgrounds, cards, and text use a refined light-themed palette that is not just an inversion of dark mode.
2. **Given** I am in light mode, **When** I interact with buttons and inputs, **Then** they show distinct visual feedback (hover, focus) optimized for a light background.

---

### User Story 2 - Theme Independence (Priority: P1)

As a developer, I want to ensure that restyling the light mode does not break or change the appearance of the dark mode, so that existing users of dark mode are not negatively impacted.

**Why this priority**: Essential constraint to prevent regressions in the primary user preference.

**Independent Test**: Can be tested by verifying that dark mode appearance remains identical before and after the light mode changes.

**Acceptance Scenarios**:

1. **Given** I have applied new light mode styles, **When** I switch to dark mode, **Then** all elements look exactly as they did before the restyling effort began.

---

### Edge Cases

- Ensuring high contrast ratios (WCAG) are maintained in the new light mode design.
- Handling components that might have hardcoded colors that don't adapt well to the new light palette.
- Verifying transition animations between light and dark mode remain smooth.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a revised color palette for light mode, focusing on soft shadows, subtle borders, and a clean white/gray background structure.
- **FR-002**: System MUST update base UI components (Button, Card, Badge, Heading, Input) to have specific "light mode" variants that differ visually from dark mode (e.g., using shadows instead of heavy borders).
- **FR-003**: Restyling MUST be strictly isolated to the light mode theme classes or media queries.
- **FR-004**: System MUST ensure 100% functional parity between light and dark mode interactions.

### Key Entities *(include if feature involves data)*

- **ThemeConfiguration**: The set of CSS variables and Tailwind classes defining the light mode visual state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of pages in `src/app/` utilize the new light mode styling.
- **SC-002**: Zero visual changes detected in dark mode after implementation (verified by manual audit or regression comparison).
- **SC-003**: 100% of text elements in light mode meet or exceed WCAG AA contrast standards (4.5:1 for normal text).
- **SC-004**: Component abstraction: Base UI components in `src/components/ui/` are updated to support the new light mode design without duplicating logic.

## Assumptions

- Dark mode is considered the "baseline" or "original" design and is already satisfactory.
- The project uses Tailwind CSS v4 and `next-themes`, making it easy to target `.light` or `[data-theme='light']`.