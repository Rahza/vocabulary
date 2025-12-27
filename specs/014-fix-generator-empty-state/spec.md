# Feature Specification: Generator Empty State Fix

**Feature Branch**: `014-fix-generator-empty-state`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "After adding new vocabulary using the wizard, there is still only an empty page visible (heading \"Generator - Neue Karten erstellen\" and nothing below it). Finally investigate and fix this bug for good."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Reliable Generator Reset (Priority: P1)

As a learner, after I have successfully generated and saved new vocabulary words, I want the generator to return to its initial form state so that I can immediately start another generation process without having to reload the page or being stuck on an empty screen.

**Why this priority**: This is a critical usability fix. The current "empty page" state is a dead-end that requires a page refresh, which breaks the flow of creating content.

**Independent Test**: Can be tested by navigating to the Generator, generating words, clicking "Save" (or "Behalten!"), and verifying that the generation form reappears immediately.

**Acceptance Scenarios**:

1. **Given** I am viewing the generated results list, **When** I click "Save", **Then** the vocabulary is saved and the UI transitions back to the initial "Topic/Level/Count" form.
2. **Given** I am viewing the generated results list, **When** I click "Discard", **Then** the UI transitions back to the initial form.

---

### User Story 2 - Resilient State Transitions (Priority: P1)

As a user, I want the UI to gracefully handle the transition between generating, viewing results, and resetting, so that no matter the outcome (error, empty results, or successful save), I always have a way forward.

**Why this priority**: Ensures robustness of the core value proposition (AI generation).

**Independent Test**: Verify that the "loading" and "empty results" states also allow the user to return to the form or try again.

**Acceptance Scenarios**:

1. **Given** the system is loading words, **When** generation fails, **Then** an error message is shown AND the form is available to try again.

---

### Edge Cases

- **Saving 0 items**: If the user deletes all suggestions from the list manually, verify that clicking "Save" still returns to the form correctly.
- **Fast navigation**: Verify that navigating away and back to the generator resets the state correctly.
- **Concurrent requests**: Ensure state doesn't get "stuck" if multiple clicks happen rapidly.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The Generator page MUST maintain an internal state that explicitly tracks the current "View" (e.g., 'form' vs 'results').
- **FR-002**: Upon successful saving of vocabulary items, the system MUST reset the results list and switch the active view back to the generation form.
- **FR-003**: The "Discard" action MUST reset the results list and switch the active view back to the generation form.
- **FR-004**: System MUST ensure that `generated.length === 0` always results in the form being displayed if not in a loading or error state.
- **FR-005**: All UI transitions in the generator MUST be managed via a robust state machine or explicit state flags to prevent "dead-end" empty states.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of save operations in the generator lead back to the generation form without requiring a manual page refresh.
- **SC-002**: 100% of discard operations in the generator lead back to the generation form.
- **SC-003**: Zero instances of the "Generator heading only" empty page state during standard usage flows.
