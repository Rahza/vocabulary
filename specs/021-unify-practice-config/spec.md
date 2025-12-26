# Feature Specification: Unified Practice Configuration & UI Consistency

**Feature Branch**: `021-unify-practice-config`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "In the \"normal\" practice mode config screen, there is no back button and also I would like to be able to select multiple tags as well, like in the matching mode. If possible, abstract the tag selection, so that we can use the same in both places. Also unify the \"number of rounds\" selection. Also, after starting the \"normal\" practice, also add the \"Beenden\" button like in the matching mode."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Unified Session Configuration (Priority: P1)

As a user, I want a consistent experience when configuring any practice session (Classic or Connect Pairs) so that I can easily select multiple topics and session lengths using a familiar interface.

**Why this priority**: Core UX improvement. Consistency reduces cognitive load and enables the requested multi-tag feature for classic mode.

**Independent Test**: Can be tested by opening the configuration screen for both "Classic" and "Connect Pairs" modes and verifying they share the same UI for tag selection and round count.

**Acceptance Scenarios**:

1. **Given** I have selected "Classic" practice mode, **When** I see the configuration screen, **Then** I can select multiple tags simultaneously.
2. **Given** any practice configuration screen, **When** I look at the "Rounds" selection, **Then** it follows a unified design (e.g., button grid with 3, 5, 10 options).

---

### User Story 2 - Navigation & Exit (Priority: P1)

As a user, I want to be able to go back to the mode selection from the configuration screen and end an active session at any time so that I have full control over my navigation.

**Why this priority**: Essential for basic usability. Currently, users are "stuck" in the config screen or active classic sessions.

**Independent Test**: Verify the presence and functionality of the "Back" button in config and the "Beenden" button in active classic sessions.

**Acceptance Scenarios**:

1. **Given** I am on any practice configuration screen, **When** I click the "Zurück" button, **Then** I am returned to the mode selection screen.
2. **Given** I am in an active "Classic" practice session, **When** I click the "Beenden" button, **Then** the session is terminated and I am returned to the selection or dashboard.

---

### Edge Cases

- **Mixed Mode Restrictions**: "Classic" mode uses "Cards" (total questions), while "Connect Pairs" uses "Rounds" (sets of 5 pairs). The UI should clarify this or unify the terminology (e.g., "Session Length").
- **Empty Selection**: Ensure the "Start" button remains disabled if no tags are selected in either mode.
- **Back navigation during active session**: Confirm if "Beenden" should require a confirmation dialog to prevent accidental exits.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide a unified `PracticeConfig` component used by both Classic and Connect Pairs modes.
- **FR-002**: `PracticeConfig` MUST support multi-tag selection for all modes.
- **FR-003**: `PracticeConfig` MUST include a "Zurück" (Back) button that returns the user to mode selection.
- **FR-004**: System MUST include a "Beenden" (End) button in the Classic practice UI, matching the Connect Pairs implementation.
- **FR-005**: The session length selection MUST be unified across both modes (e.g., using 3, 5, 10 as standard options).
- **FR-006**: System MUST update the Classic practice logic to fetch and shuffle vocabulary from multiple selected tags.

### Key Entities _(include if feature involves data)_

- **SessionConfig**: Represents the unified configuration (mode, array of tags, length).

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of practice modes use the same abstracted tag selection component.
- **SC-002**: Navigation: Users can return to mode selection from any config screen in 1 click.
- **SC-003**: Feature Parity: Classic mode supports multi-tag selection just like Connect Pairs.
- **SC-004**: UI Consistency: Both practice modes display an "End" button during active gameplay.
