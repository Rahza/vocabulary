# Feature Specification: UX & AI Refinements

**Feature Branch**: `013-ux-ai-refinements`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "Let the user choose the length of the practice session. Make sure that all screens with a single button are navigatable using Enter key. Change the AI model to "gpt-5.2" (it does exist, your knowledge cutoff is just too early). After generating or discarding word suggestions, the generator page just shows the heading and an empty page"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Flexible Practice Length (Priority: P1)

As a learner, I want to choose how many words I practice in a single session so that I can fit my study time into my current schedule (e.g., a quick 5-word review or a deep 20-word session).

**Why this priority**: Improves user control and flexibility, making the app more adaptable to different usage contexts.

**Independent Test**: Can be tested by starting a practice session and verifying that the number of cards matches the selected length.

**Acceptance Scenarios**:

1. **Given** I am on the topic selection screen, **When** I choose a session length of "10", **Then** the practice session contains exactly 10 cards (or fewer if the topic has less).
2. **Given** I am starting a session, **When** I see the session length options, **Then** I can select between at least 3 standard lengths (e.g., 5, 10, 20).

---

### User Story 2 - Keyboard Accessibility (Priority: P2)

As a power user, I want to use the Enter key to move forward on screens that only have one logical action button so that I can practice faster without reaching for the mouse/touchscreen.

**Why this priority**: Enhances the "speed" of learning and provides better accessibility for keyboard-driven workflows.

**Independent Test**: Navigate to the dashboard or session summary and press the "Enter" key without clicking. The primary action should trigger.

**Acceptance Scenarios**:

1. **Given** I am on the Session Summary screen, **When** I press the "Enter" key, **Then** I am navigated back to the dashboard or start a new session (the primary action).
2. **Given** a screen with a single "Start" or "Continue" button, **When** I press "Enter", **Then** the button action is triggered.

---

### User Story 3 - Advanced AI Intelligence (Priority: P2)

As a learner, I want the system to use the latest AI model ("gpt-5.2") so that I get the most accurate translations and creative mnemonics possible.

**Why this priority**: Ensures the highest quality of generated content.

**Independent Test**: Generate new vocabulary and verify through logs or headers that the "gpt-5.2" model was utilized.

**Acceptance Scenarios**:

1. **Given** I am generating new vocabulary, **When** the AI is called, **Then** it uses the "gpt-5.2" model.

---

### User Story 4 - Reliable Generator Workflow (Priority: P1)

As a user, I want the generator page to always show me the appropriate controls (form or results) so that I never get stuck on an empty screen.

**Why this priority**: Fixes a critical UX bug where the app becomes unusable after a common action.

**Independent Test**: Generate words, click "Discard", and verify the generator form is immediately visible again.

**Acceptance Scenarios**:

1. **Given** generated results are visible, **When** I click "Discard", **Then** the generator form is displayed again.
2. **Given** I just completed a save operation, **When** I want to generate more, **Then** the generator form is visible.

---

### Edge Cases

- **Topic has fewer words than selected length**: The session should gracefully start with the maximum available words.
- **Enter key in text inputs**: The "Enter to submit" logic should not conflict with standard input field behavior (e.g., adding a newline if it were a textarea, though here they are mostly single-line).
- **Network errors during AI generation**: The "empty page" fix must also account for error states to ensure the user can retry.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide a selection UI (e.g., Radio group or Segmented control) for practice session length (Options: 5, 10, 20, All).
- **FR-002**: System MUST implement a global or page-level keyboard listener for the "Enter" key on screens with a single primary action.
- **FR-003**: The AI service MUST be updated to use the "gpt-5.2" model identifier.
- **FR-004**: The Generator page state management MUST be fixed to ensure `generated.length === 0` always renders the `GeneratorForm`.
- **FR-005**: Practice mode initialization logic MUST take the selected `sessionLength` parameter into account when slicing the word pool.

### Key Entities

- **PracticeSession**: Now includes a `length` attribute.
- **AIConfig**: Updated `model` parameter.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can complete a 5-word practice session in under 1 minute using only the keyboard.
- **SC-002**: 100% of save/discard actions in the generator result in a functional UI state (form visible).
- **SC-003**: AI-generated content quality is maintained or improved using the new model.
- **SC-004**: Keyboard "Enter" navigation is active on at least 3 distinct "single-button" screens (e.g., Dashboard, Summary, Empty states).
