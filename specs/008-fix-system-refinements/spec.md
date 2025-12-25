# Feature Specification: System Bug Fixes & UI Refinements

**Feature Branch**: `008-fix-system-refinements`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "I can't find the Tag management page. When regenerating the mnemonic, the UI doesn't update (need to manually close and re-open the word). Update the word generation prompt to only generate generic tags, not too specific ones (the number \"eins\" gets the tag \"1\" now, for example, we don't want that). In the trainer, the shuffling is not working properly (I get first the German and then the Czech word in a sequence - there should be at least 2 other words in between the same word). After discarding the generated word suggestions, the generator displays just a blank screen. And instead of using the OS alert box for confirming discarding words, instead use a component. The progress in the top right in the trainer is also not displayed correctly."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent Trainer Shuffling (Priority: P1)

As a learner, I want the trainer to show me a varied sequence of words so that I don't get the same word in different directions (e.g., DE->CZ then CZ->DE) consecutively, which would make the answer too obvious.

**Why this priority**: Directly impacts the educational effectiveness of the trainer.

**Independent Test**: Can be tested by starting a session with 5 words (10 items total) and verifying that no two items from the same word are within 2 positions of each other.

**Acceptance Scenarios**:

1. **Given** a session starts, **When** cards are shuffled, **Then** there are at least 2 other distinct words between any two cards representing the same vocabulary pair.

---


### User Story 2 - Smooth Mnemonic Regeneration (Priority: P1)

As a learner, I want to see my new mnemonic immediately after I click "Regenerate" so that I know the magic worked and I can use the new aid.

**Why this priority**: Fixes a broken UX flow where the user thinks the action failed because the UI didn't update.

**Independent Test**: Open a word detail, click "Regenerate Mnemonic", and verify the text updates on screen within the same view.

**Acceptance Scenarios**:

1. **Given** a word's detail drawer is open, **When** I trigger a mnemonic refresh, **Then** the UI displays the new mnemonic as soon as it is received from the AI.

---


### User Story 3 - Robust Generator Navigation (Priority: P1)

As a user, I want the generator to stay functional even if I decide to discard the AI's current suggestions, so that I can immediately try a different prompt.

**Why this priority**: Prevents a "dead end" in the app where the user has to manually reload the page.

**Independent Test**: Generate words, click "Discard", and verify the generator form is visible again.

**Acceptance Scenarios**:

1. **Given** generated suggestions are visible, **When** I click "Discard", **Then** the suggestions vanish and the generator form reappears.

---


### User Story 4 - Discovery of Tag Management (Priority: P2)

As an organized user, I want to easily find the page where I can manage my tags globally so that I can keep my collection clean.

**Why this priority**: Essential for the "management" aspect of the app which was previously hidden or hard to find.

**Independent Test**: Navigate from the collection view to the tag management view in one clear step.

**Acceptance Scenarios**:

1. **Given** the vocabulary collection page, **When** I look at the interface, **Then** there is a clear link or tab to "Manage Tags".

---


### Edge Cases

- **Small vocabulary sets**: If there are fewer than 3 words in a session, the "distancing" shuffling rule should gracefully fall back to the maximum possible distance.
- **AI generating bad tags**: The prompt needs to be specific enough to prevent "literal" tags (like "1" or "word-itself").
- **Discarding during loading**: Discard action should be handled correctly even if the generation hasn't finished (if possible) or the button should be disabled.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a clear navigation link to the Tag Management page (`/tags`) from the main Vocabulary view.
- **FR-002**: The `WordDetail` component MUST reactively update the displayed mnemonic after a successful regeneration.
- **FR-003**: The AI vocabulary generation prompt MUST explicitly instruct the model to return category-based tags (e.g., "Numbers", "Colors", "Verbs") and exclude literal or word-specific tags.
- **FR-004**: The `smartShuffle` or equivalent logic in the Trainer MUST implement a minimum distance of 2 distinct words between different directions of the same vocabulary item.
- **FR-005**: The Generator page MUST reset to its initial state (showing the form) after suggestions are discarded.
- **FR-006**: Replace all occurrences of `window.confirm` and `window.alert` for discard/delete actions with a custom themed confirmation component (e.g., a "ConfirmDialog").
- **FR-007**: Fix the Trainer progress calculation to accurately show "Current Index / Total Items" in the header.

### Key Entities

- **VocabularyPair**: Mnemonic field and Tags array are refined.
- **ReviewQueue**: Shuffling logic determines the sequence.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Shuffling distancing rule verified: No word pair repeats within 3 cards in a 10+ card session.
- **SC-002**: UI update latency after mnemonic regen is < 100ms after the data is saved.
- **SC-003**: Generator form is visible 100% of the time after discarding results.
- **SC-004**: 0 usage of native OS dialogs for user confirmations.
- **SC-005**: Trainer progress indicator matches the number of cards actually seen by the user.