# Feature Specification: AI Vocabulary Trainer

**Feature Branch**: `001-ai-vocab-trainer`
**Created**: 2025-12-25
**Status**: Draft
**Input**: User description: "Build an AI asssited application to learn vocabulary for German (source) <> Czech (target). Let the user prompt an AI model to generate new vocabulary pairs (enter a theme, difficulty and number of vocabulary to generate). Also generate a mnemonic for each pair. There is a vocabulary trainer, based on the Leitner method (spaced repetition). Make sure that vocabulary is learned and repeated in both directions. The user needs to type the word. Provide a diacritics keyboard. Apart from the "progressing mode", also provide a practice mode that can be used arbitrarily often without influencing placement of vocabulary. It should provide short, bite size sessions (not all vocabulary at once). Automatically tag and group vocabulary (one word can have multiple tags/groups). Let the user view current progress and statistics (overall and based on tags/groups). Let the user practice specific groups."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI Vocabulary Generation (Priority: P1)

As a learner, I want to generate new German-Czech vocabulary pairs by providing a theme, difficulty, and count, so that I can expand my vocabulary with relevant words and mnemonics.

**Why this priority**: Core value proposition. Without content generation, the trainer has nothing to teach.

**Independent Test**: Can be fully tested by generating a list of words and verifying they match the requested theme and include mnemonics.

**Acceptance Scenarios**:

1. **Given** the user enters theme "Travel", difficulty "Beginner", and count "5", **When** they request generation, **Then** 5 German-Czech pairs related to travel with mnemonics are displayed and saved.
2. **Given** the user enters an invalid count (e.g., -1), **When** they request generation, **Then** an error message is shown.

---

### User Story 2 - Leitner System Trainer (Priority: P1)

As a learner, I want to practice my vocabulary using a spaced repetition system where I type the answers, so that I efficiently memorize words in both directions.

**Why this priority**: The primary learning mechanism. Essential for the "trainer" aspect.

**Independent Test**: Verify that correct answers move cards to the next Leitner box and incorrect answers reset/move them back.

**Acceptance Scenarios**:

1. **Given** a word in German, **When** the user types the correct Czech translation using the diacritics keyboard, **Then** the word is marked correct and advanced in the Leitner system.
2. **Given** a word in Czech, **When** the user types an incorrect German translation, **Then** the word is marked incorrect and moved to the first Leitner box.
3. **Given** a training session, **When** the user is tested, **Then** the direction (DE->CZ or CZ->DE) varies or is configurable.

---

### User Story 3 - Flexible Practice Mode (Priority: P2)

As a learner, I want to practice specific vocabulary groups in short sessions without affecting my long-term progress, so that I can reinforce specific topics before a test or trip.

**Why this priority**: Adds significant usability and flexibility beyond strict spaced repetition.

**Independent Test**: Complete a practice session and verify that the "Next Review Date" or Leitner box of the practiced words remains unchanged.

**Acceptance Scenarios**:

1. **Given** a specific tag "Food", **When** the user starts a practice session for this tag, **Then** only words with the "Food" tag are presented.
2. **Given** a practice session, **When** the user completes it, **Then** their main Leitner progress is NOT updated.
3. **Given** a large vocabulary set, **When** a session starts, **Then** it is limited to a "bite-size" number of words (e.g., 20).

---

### User Story 4 - Progress & Statistics (Priority: P3)

As a learner, I want to view my overall and group-specific progress, so that I can track my improvement and identify weak areas.

**Why this priority**: Provides motivation and feedback, but the app is functional without it.

**Independent Test**: Perform some training sessions and verify that the statistics dashboard reflects the changes (e.g., count of learned words increases).

**Acceptance Scenarios**:

1. **Given** the user has learned 50 words, **When** they view the dashboard, **Then** the total word count and Leitner box distribution are shown.
2. **Given** multiple tags, **When** the user filters stats by tag, **Then** progress specific to that tag is displayed.

### Edge Cases

- What happens when the AI service is unavailable? (Should show a friendly error and allow offline practice of existing words).
- How does the system handle words with multiple valid translations? (Should ideally accept any valid standard translation or the specific one generated).
- What happens if a generated word is a duplicate of an existing one? (Should merge or skip to avoid redundancy).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST integrate with an AI model to generate German-Czech vocabulary pairs and mnemonics based on user-provided theme, difficulty, and count.
- **FR-002**: System MUST automatically assign tags/groups to generated vocabulary based on the theme and content.
- **FR-003**: System MUST implement the Leitner system logic for the "Progressing Mode", scheduling reviews based on previous performance.
- **FR-004**: System MUST provide a "Practice Mode" that allows reviewing specific tags/groups without updating Leitner state.
- **FR-005**: System MUST require user input via typing for all reviews.
- **FR-006**: System MUST provide an on-screen helper or keyboard extension for entering Czech/German diacritics (e.g., ä, ö, ü, ß, š, č, ř, ž, ý, á, é, í, ů, ú, ň, ď, ť).
- **FR-007**: System MUST support bi-directional learning (DE->CZ and CZ->DE).
- **FR-008**: System MUST persist vocabulary data, Leitner state, and user statistics locally.
- **FR-009**: System MUST limit sessions to a manageable size (e.g., 20 words) by default.
- **FR-010**: System MUST display statistics: total words, words per Leitner box, and progress per tag.

### Assumptions

- User has an active internet connection for generating new vocabulary (offline mode supported for practice only).
- The AI service provider API is available and accessible.
- Users have basic familiarity with German and Czech character sets.

### Key Entities

- **VocabularyPair**: ID, GermanWord, CzechWord, Mnemonic, CreatedAt.
- **Tag**: ID, Name (e.g., "Travel", "Food"), LinkedVocabularyIDs.
- **LeitnerState**: VocabularyID, CurrentBox (1-5), NextReviewDate, LastReviewedAt, Direction (DE->CZ or CZ->DE).
- **PracticeSession**: ID, Date, Mode (Progress/Practice), Score, Duration.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can generate a set of 10 new words with mnemonics in under 60 seconds (dependent on AI latency).
- **SC-002**: 90% of generated words are correctly tagged without manual user intervention.
- **SC-003**: Users complete 80% of started "bite-size" practice sessions (indicating appropriate length).
- **SC-004**: Typing input allows for 100% correct entry of all necessary diacritics using the provided tools.