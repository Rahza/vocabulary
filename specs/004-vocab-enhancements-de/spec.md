# Feature Specification: Vocabulary Enhancements & German Localization

**Feature Branch**: `004-vocab-enhancements-de`
**Created**: 2025-12-25
**Status**: Draft
**Input**: User description: "Adjust/implement the following features: 1. Make sure that no duplicate vocabulary is generated 2. After generating vocabulary suggestions, let the user delete individual suggestions 3. In practice mode: Let the user skip (show solution), show the mnemonic and get a „tip“ (reveal letter by letter with each button press) 4. Make sure the whole app (also all tags, mnemonics) is in the source language (German)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - German Localization (Priority: P1)

As a German-speaking user, I want the entire application interface, including buttons, labels, and instructions, to be in German so that I can navigate and use the app comfortably in my native language. Additionally, generated content like mnemonics and tags should be in German to help me understand the foreign terms.

**Why this priority**: This is a fundamental requirement for the target audience and affects the usability of the entire application.

**Independent Test**: Can be tested by navigating through all screens (Home, Generator, Practice, Settings) and verifying that all text is in German. Also, generating new vocabulary should result in German tags and mnemonics.

**Acceptance Scenarios**:

1. **Given** the application is open, **When** I view any screen (Dashboard, Generator, Practice), **Then** all static text, labels, and button text are in German.
2. **Given** I am generating new vocabulary, **When** the results are displayed, **Then** the mnemonics and tags are in German.

---

### User Story 2 - Refined Vocabulary Generation (Priority: P1)

As a learner, I want to generate new vocabulary without seeing duplicates of words I already have, and I want to be able to remove specific suggestions before saving, so that my vocabulary list remains clean and relevant.

**Why this priority**: Prevents database clutter and frustration from redundant learning items, improving the efficiency of the generation process.

**Independent Test**: Can be tested by generating vocabulary for a topic that already has some words, verifying no duplicates appear, and deleting a suggestion from the list before saving.

**Acceptance Scenarios**:

1. **Given** I have existing vocabulary for a specific topic, **When** I generate more words for that topic, **Then** none of the existing words are included in the suggestions.
2. **Given** a list of generated vocabulary suggestions, **When** I click a delete/remove button on a specific item, **Then** that item is removed from the list and is not saved to my collection.

---

### User Story 3 - Enhanced Practice Assistance (Priority: P2)

As a learner in practice mode, I want options to get hints (reveal letters), see the mnemonic, or see the full solution (skip) if I am stuck, so that I can learn at my own pace and get help when needed without frustration.

**Why this priority**: Enhances the learning experience by providing graded assistance mechanisms, which is standard for flashcard apps.

**Independent Test**: Can be tested by starting a practice session and using the "Tip", "Show Mnemonic", and "Show Solution" buttons on a card.

**Acceptance Scenarios**:

1. **Given** I am in practice mode on a card, **When** I click the "Tip" button, **Then** the next hidden character of the solution is revealed.
2. **Given** I am in practice mode, **When** I click "Show Mnemonic", **Then** the mnemonic text for the current word is displayed.
3. **Given** I am in practice mode, **When** I click "Show Solution" or "Skip", **Then** the full answer is revealed and I can proceed to the next card.

### Edge Cases

- What happens when a user requests a hint but all letters are already revealed? (Should probably disable the button or show full solution state).
- What happens if the generator cannot find enough non-duplicate words? (Should notify the user or return fewer results).
- What happens if a word has no mnemonic? (Button should be disabled or show "No mnemonic available").

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST check for existing vocabulary items in the user's collection before generating new ones to prevent exact duplicates (matching Foreign Term).
- **FR-002**: System MUST allow users to delete/dismiss individual vocabulary items from the generated list before confirming the save operation.
- **FR-003**: In Practice Mode, the system MUST provide a "Skip" or "Show Solution" action that reveals the full answer and treats the card as "incorrect" or "skipped" for the current session.
- **FR-004**: In Practice Mode, the system MUST provide a "Show Mnemonic" toggle to display the mnemonic aid if available.
- **FR-005**: In Practice Mode, the system MUST provide a "Tip" button that reveals the solution string one character at a time with each press (left-to-right).
- **FR-006**: The entire application UI (navigation, headers, button labels, help text) MUST be localized in German.
- **FR-007**: The AI prompt for vocabulary generation MUST explicitly request that `mnemonics` and `tags` be returned in German.
- **FR-008**: The AI prompt for vocabulary generation MUST include a list of existing terms (or a check mechanism) to avoid duplicates, OR the system must filter duplicates post-generation. (Filtering post-generation is safer and easier to implement reliably).

### Key Entities

- **VocabularyItem**:
    - `term`: String (Foreign language word)
    - `translation`: String (German translation)
    - `mnemonic`: String (German mnemonic aid)
    - `tags`: Array<String> (German tags)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of generated vocabulary items are unique compared to the existing database (no duplicates).
- **SC-002**: Users can successfully remove at least one suggestion from the generation result list before saving.
- **SC-003**: In a practice session, users can access 3 distinct help actions: Reveal Letter, Show Mnemonic, Show Solution.
- **SC-004**: 100% of visible static UI text is in German.
- **SC-005**: 100% of newly generated mnemonics and tags are in German.