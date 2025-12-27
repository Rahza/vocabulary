# Feature Specification: Matching Game Refinements & Bug Fixes

**Feature Branch**: `020-fix-matching-game-bugs`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "In the Matching game mode, don't let correct pairs disappear, rather fade them out and mark them in a green-ish color (or something else which fits to the style and design system). Also, when selecting a wrong pair, it also highlights the \"correct\" wrong. Instead, it should just briefly highlight the two wrongly selected ones. \"Play again\" doesn't work yet either."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Persisting Matched Pairs (Priority: P1)

As a user, I want correctly matched pairs to remain visible on the screen but with a distinct "completed" state, so that I can maintain visual context of the entire set while I continue matching the remaining words.

**Why this priority**: Improves visual continuity and user satisfaction by showing progress without removing elements.

**Independent Test**: Can be tested by matching a pair in the game and verifying it stays on screen with reduced opacity and a green highlight.

**Acceptance Scenarios**:

1. **Given** I am in a Matching session, **When** I match a pair correctly, **Then** both words stay on the screen.
2. **Given** a matched pair, **When** it enters the completed state, **Then** it is styled with a green background/border and has an opacity of approximately 0.5.

---

### User Story 2 - Accurate Error Highlighting (Priority: P1)

As a user, I want only the two words I selected to be highlighted when I make a mistake, so that the feedback is focused strictly on my current selection.

**Why this priority**: Prevents confusion caused by "spoiler" highlights of correct answers during an error.

**Independent Test**: Select two mismatched words and verify that ONLY those two cards flash red/shake.

**Acceptance Scenarios**:

1. **Given** two mismatched words are selected, **When** the error animation triggers, **Then** only those two specific cards show the error state (red highlight/shake).

---

### User Story 3 - Functional Session Restart (Priority: P1)

As a user, I want the "Play again" button on the summary screen to work correctly for all practice modes, so that I can immediately start a new session with the same settings.

**Why this priority**: Critical for a smooth user loop and reducing friction.

**Independent Test**: Complete a "Connect Pairs" session, click "Play again", and verify the game restarts with the same tags and round count.

**Acceptance Scenarios**:

1. **Given** I have finished a practice session (Classic or Connect Pairs), **When** I click "Nochmal!" (Play again), **Then** a new session starts immediately with the previous parameters.

---

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Matched pairs MUST NOT disappear from the grid.
- **FR-002**: System MUST apply a "completed" visual state to matched pairs: `opacity: 0.5` and `bg-playful-green/20` (or similar themed green).
- **FR-003**: Error feedback MUST be restricted to the two currently selected items.
- **FR-004**: The "Play again" logic in `PracticePage` MUST support multi-tag sessions and specific mode restarts.
- **FR-005**: Matching round transition MUST account for pairs staying on screen (ensuring all 5 pairs are matched before moving).

### Key Entities _(include if feature involves data)_

- **SessionParameters**: The combination of `mode`, `tags`, and `length` used to start a session.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Matched pairs remain visible at 50% opacity.
- **SC-002**: Incorrect selection highlights exactly 2 items.
- **SC-003**: "Play again" reloads the session in < 200ms.
- **SC-004**: Zero visual regressions in Dark Mode for these refinements.
