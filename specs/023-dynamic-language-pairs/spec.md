# Feature Specification: Dynamic Language Pair Selection

**Feature Branch**: `023-dynamic-language-pairs`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "Now we want to allow the user to set the SOURCE and TARGET language pair. For now, the user can only learn one language pair at a time. They can only change it by resetting the app in the settings. So let them choose the language pair on first app startup. Make sure the AI generator dynamically uses the language(s) the user is learning. Allow the following languages (all pairs possible, but of course source and target language must be different): English, German, Czech, French, Italian, Spanish. Also make sure to dynamically provide the correct diacritics keyboard for each target language (expect each user in each source language to only have access to the 26 core latin letters)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Initial Language Pair Setup (Priority: P1)

As a new user, I want to select my source and target languages when I first open the application so that I can immediately start learning the vocabulary I need in the correct language pair.

**Why this priority**: Core onboarding experience. Without this, the application cannot function correctly for a personalized experience.

**Independent Test**: Clear browser storage, open the application, verify that a language selection screen appears before any other content.

**Acceptance Scenarios**:

1. **Given** no language pair is configured, **When** the application starts, **Then** I am presented with a selection screen for Source and Target languages.
2. **Given** the language selection screen, **When** I select "English" as source and "Spanish" as target and click "Start", **Then** my preference is saved and I am taken to the Dashboard.

---

### User Story 2 - Dynamic AI Generation (Priority: P1)

As a user, I want the AI generator to automatically use my selected target and source languages so that I don't have to manually specify them every time I want to create new vocabulary.

**Why this priority**: Essential for the "magic" experience of the generator.

**Independent Test**: Configure the app for "German" to "French", go to the Generator, and verify that it creates French words with German translations.

**Acceptance Scenarios**:

1. **Given** my target language is "Czech" and source is "English", **When** I generate new vocabulary, **Then** the AI provides Czech words translated into English.

---

### User Story 3 - Adaptive Diacritics Keyboard (Priority: P1)

As a user, I want access to a virtual keyboard with the correct diacritics for my target language so that I can type correctly even if my physical keyboard only supports basic Latin letters.

**Why this priority**: Essential for accuracy in languages like Czech, Spanish, French, Italian, and German.

**Independent Test**: Set target language to "Czech", enter a practice session, and verify that keys like "š", "č", "ř" are available in the virtual keyboard bar.

**Acceptance Scenarios**:

1. **Given** my target language is "Spanish", **When** I am in a practice session, **Then** the virtual keyboard shows "á", "é", "í", "ó", "ú", "ñ", "ü".
2. **Given** my target language is "English", **When** I am in a practice session, **Then** the virtual keyboard bar is hidden or shows no diacritics (since English uses standard Latin).

---

### User Story 4 - Language Pair Reset (Priority: P2)

As a user, I want to be able to reset my language pair by resetting the entire application so that I can switch to learning a different language if I finish my current one.

**Why this priority**: Provides a path for long-term usage beyond a single language.

**Independent Test**: Go to Settings, click "Reset App", and verify that I am returned to the initial language selection screen.

**Acceptance Scenarios**:

1. **Given** I am in the Settings page, **When** I confirm a full app reset, **Then** all my data is cleared and I am redirected to the first-time setup screen.

---

### Edge Cases

- **Same Source and Target**: What happens if a user selects "English" for both? (System must prevent this).
- **Offline Startup**: How does the first-time setup handle no internet? (Local selection is fine, but AI generation will fail later).
- **Screen Size**: Ensure the language selection grid is readable on small mobile screens.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a "First Time Setup" screen if no `languagePair` is found in storage.
- **FR-002**: System MUST allow selection from: English, German, Czech, French, Italian, Spanish.
- **FR-003**: System MUST prevent selecting the same language for both source and target.
- **FR-004**: System MUST store the selected `sourceLanguage` and `targetLanguage` in `UserSettings`.
- **FR-005**: AI Generator prompts MUST dynamically inject the `targetLanguage` and `sourceLanguage`.
- **FR-006**: Virtual Keyboard MUST dynamically load a character set based on the `targetLanguage`.
- **FR-007**: System MUST support the following diacritics mapping:
    - **German**: ä, ö, ü, ß
    - **Czech**: á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž
    - **Spanish**: á, é, í, ó, ú, ü, ñ
    - **French**: à, â, æ, ç, é, è, ê, ë, î, ï, ô, œ, ù, û, ü, ÿ
    - **Italian**: à, è, é, ì, ò, ó, ù
    - **English**: (None)
- **FR-008**: User MUST only be able to change the language pair by performing a full app reset (clearing all data).

### Key Entities *(include if feature involves data)*

- **LanguagePair**: A configuration object containing `source` and `target` language codes.
- **UserSettings**: Updated to include the `LanguagePair`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of new users are forced to select a language pair before seeing the dashboard.
- **SC-002**: AI Generator correctly produces the requested target language in 100% of successful API calls.
- **SC-003**: Virtual keyboard updates its character set in under 50ms when a practice session starts.
- **SC-004**: Full app reset returns user to onboarding state in 1 click (plus confirmation).