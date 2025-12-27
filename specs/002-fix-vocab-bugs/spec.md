# Feature Specification: Vocabulary Trainer Bug Fixes & Improvements

**Feature Branch**: `002-fix-vocab-bugs`
**Created**: 2025-12-25
**Status**: Draft
**Input**: User description: "Fix the following bugs: Remove the German Umlaute from the virtual keyboard and fix the Czech ones, some are missing. In all modes (progress and practice), shuffle the words, to make sure that for the same word in both directions, at least two other words are in between. Remove the alert() and replace them with a suitable JS design component."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Correct Virtual Keyboard (Priority: P1)

As a learner, I want the virtual keyboard to only show necessary Czech characters and not unnecessary German ones (which are easily accessible on standard keyboards), so that I can type efficiently without clutter.

**Why this priority**: Fixes a UI bug/annoyance that directly affects the core interaction (typing).

**Independent Test**: Open the trainer and verify only Czech diacritics are present in the virtual keyboard.

**Acceptance Scenarios**:

1. **Given** the trainer is open, **When** I view the virtual keyboard, **Then** German characters (ä, ö, ü, ß) are NOT visible.
2. **Given** the trainer is open, **When** I view the virtual keyboard, **Then** all standard Czech diacritics (á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž) are visible.

---

### User Story 2 - Intelligent Shuffling (Priority: P1)

As a learner, I want to avoid seeing the same word (or its reverse direction) immediately after reviewing it, so that the learning is more effective and not just short-term recall.

**Why this priority**: Improves the learning algorithm quality.

**Independent Test**: Run a session with a small set of words (e.g., 5) and verify the order of presentation ensures spacing.

**Acceptance Scenarios**:

1. **Given** a session with multiple words, **When** a word is presented, **Then** the same word (in either direction) MUST NOT appear in the next 2 slots.
2. **Given** a session with very few words (<3), **When** checking spacing, **Then** the constraint is relaxed or handled gracefully (e.g. show warning or loop).

---

### User Story 3 - Modern Notifications (Priority: P2)

As a user, I want to see notifications (like "Vocabulary saved") as non-intrusive toasts instead of browser alerts, so that the experience feels modern and doesn't block my interaction.

**Why this priority**: Improves UX/feel of the app.

**Independent Test**: Trigger an action that previously showed an alert (e.g., Save Vocabulary) and verify a Toast appears instead.

**Acceptance Scenarios**:

1. **Given** I generate vocabulary, **When** I click save, **Then** a toast message "Vocabulary saved" appears and disappears automatically.
2. **Given** I reset data in settings, **When** I confirm, **Then** a proper confirmation dialog (not `confirm()`) or toast appears. (Note: User said remove `alert()`, `confirm()` is often grouped, but strictly `alert()` was mentioned. I'll target `alert()` primarily but replacing `confirm()` with a UI dialog is better).
3. **Refinement**: The prompt specifically said "Remove the alert()". I will focus on `alert()` replacement with Toasts.

### Edge Cases

- **Shuffling**: What if there are only 1 or 2 words in the list? The "2 words between" constraint is impossible. System should handle this without infinite loop (e.g. just alternate).
- **Keyboard**: Are uppercase chars needed? Usually context implies lowercase for diacritics buttons, relying on shift key for base letter or long-press. We will assume lowercase buttons are sufficient as per standard mobile helpers.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST display a virtual keyboard containing ONLY Czech diacritics: á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž.
- **FR-002**: System MUST NOT display German characters (ä, ö, ü, ß) in the virtual keyboard.
- **FR-003**: System MUST implement a shuffle algorithm for all training/practice sessions that enforces a minimum gap of 2 items between occurrences of the same word ID (regardless of direction).
- **FR-004**: System MUST handle cases where the gap constraint cannot be met (e.g., list too small) by falling back to the best possible spacing.
- **FR-005**: System MUST replace all usages of `window.alert()` with a Toast notification component.

### Assumptions

- The standard keyboard on user's device is sufficient for German characters (umlauts are often accessible via long-press on vowels).
- `shadcn/ui` or a simple custom Toast component can be added.

### Key Entities

- **Toast**: ID, Message, Type (Success, Error, Info), Duration.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Virtual keyboard contains exactly 15 specific Czech character buttons.
- **SC-002**: In a session of 10 words, no word repeats within a 2-step window.
- **SC-003**: Zero occurrences of `alert(` string in the source code.
