# Feature Specification: Connect Pairs Practice Mode

**Feature Branch**: `019-connect-pairs-practice`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "In the practice tab, keep the current, classic vocabulary practice mode but add a new mode: connect pairs. Let the user choose a number of questions, one or multiple tags and then for each \"question\", let them connect multiple words (one language per side, left and right) to connect the correct translations"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mode Selection (Priority: P1)

As a user, I want to choose between "Classic" and "Connect Pairs" modes in the practice tab so that I can diversify my learning experience.

**Why this priority**: Fundamental requirement to access the new feature without losing existing functionality.

**Independent Test**: Can be fully tested by navigating to the practice tab and verifying two distinct mode options are available.

**Acceptance Scenarios**:

1. **Given** I am on the Practice tab, **When** I see the mode selection screen, **Then** I can select "Classic Practice" or "Connect Pairs".
2. **Given** I have selected "Connect Pairs", **When** I proceed to the next step, **Then** I am prompted to configure the session (tags and question count).

---

### User Story 2 - Session Configuration (Priority: P1)

As a user, I want to select specific tags and the number of questions for my "Connect Pairs" session so that I can focus on specific topics and control the session length.

**Why this priority**: Essential for personalizing the learning session.

**Independent Test**: Can be tested by selecting different tags and question counts and verifying the session loads the correct vocabulary.

**Acceptance Scenarios**:

1. **Given** I am configuring a "Connect Pairs" session, **When** I select multiple tags, **Then** only words matching those tags are included in the session.
2. **Given** I select "10 questions", **When** the session starts, **Then** I am presented with 10 pair-matching screens.

---

### User Story 3 - Interactive Pair Matching (Priority: P1)

As a user, I want to match words from two columns by tapping/clicking them so that I can practice my translation skills in a highly interactive way.

**Why this priority**: Core interaction of the new mode.

**Independent Test**: Can be tested by starting a session and matching items, observing visual feedback for correct/incorrect matches.

**Acceptance Scenarios**:

1. **Given** a matching screen with 5 German words on the left and 5 Czech words on the right, **When** I tap a German word and its correct Czech translation, **Then** both items are highlighted as correct and potentially removed or disabled.
2. **Given** I tap an incorrect translation, **When** the match is attempted, **Then** the UI provides visual feedback (e.g., shake animation or red highlight) indicating an error.

---

### Edge Cases

- **Insufficient Vocabulary**: What happens if the selected tags contain fewer words than required for the requested number of questions? (Default: Show all available or adjust count).
- **Session Interruption**: How is progress handled if the user leaves the tab mid-session? (Default: Progress is not saved for practice mode unless completed).
- **Small Screens**: How do pairs render on mobile devices? (5 pairs are manageable).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Practice tab MUST feature a selection screen for the two modes: Classic and Connect Pairs.
- **FR-002**: The system MUST allow users to select one or multiple tags for the matching session.
- **FR-003**: The system MUST allow users to choose the number of matching screens ("questions") for the session.
- **FR-004**: Each "question" screen MUST present two columns of words (German and Czech) in randomized order.
- **FR-005**: The system MUST provide immediate visual feedback for correct and incorrect matches.
- **FR-006**: A matching screen is considered "complete" when all pairs are correctly matched.
- **FR-007**: A "Connect Pairs" session is for pure practice and MUST NOT update the Leitner progress or mastery of the involved words.
- **FR-008**: The number of pairs per screen MUST be 5.

### Key Entities *(include if feature involves data)*

- **PracticeSession**: Represents the current configuration (mode, tags, length, progress).
- **MatchingRound**: A single "question" containing a set of word pairs to be matched.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can start a "Connect Pairs" session in under 3 taps from the main tab.
- **SC-002**: The matching interface maintains 60fps animations during selection and feedback on target devices.
- **SC-003**: 100% of vocabulary pairs matching the selected tags are eligible for selection in the matching rounds.
- **SC-004**: Transition between matching rounds takes less than 300ms.