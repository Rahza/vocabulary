# Feature Specification: Language Selection & I18n Refinement

**Feature Branch**: `024-lang-selector-refinement`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "Language selector screen: Center 'Welcome' message as well. Localize the languages (right now the languages show in English, despite me using German localization). It's possible to select the same source language as target language that is selected. Rename the DE_TO_CZ and CZ_TO_DE constants to be more generic. In general, make sure that we are using strict types wherever possible. In the language selection screen, use icons with flags for each language, or at least emojis, if icons are not possible."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Localized Onboarding (Priority: P1)

As a new user, I want to see the initial language setup screen in my own language so that I can easily understand how to configure the application.

**Why this priority**: Crucial for first-time user experience and accessibility.

**Independent Test**: Change browser language or app locale and verify that the onboarding text ("Welcome", labels, button) is translated.

**Acceptance Scenarios**:

1. **Given** the user's locale is set to German, **When** they open the app for the first time, **Then** they see "Willkommen!" and "Ich spreche..." instead of English versions.
2. **Given** the user's locale is set to Czech, **When** they open the app, **Then** they see "Vítejte!" (or equivalent) in the onboarding screen.

---

### User Story 2 - Enhanced Language Selection (Priority: P1)

As a user, I want to select my source and target languages using localized names and visual indicators (flags/emojis) so that the selection is intuitive.

**Why this priority**: Core feature of the onboarding process.

**Independent Test**: Open the onboarding screen and check if language names are localized and accompanied by emojis/flags.

**Acceptance Scenarios**:

1. **Given** the onboarding screen is open, **When** looking at the language list, **Then** languages are shown with flags (e.g., "🇩🇪 Deutsch" instead of just "German").
2. **Given** German locale is active, **When** selecting languages, **Then** "English" is displayed as "Englisch".

---

### User Story 3 - Selection Validation (Priority: P2)

As a user, I want to be prevented from selecting the same language as both source and target so that I don't create an invalid learning configuration.

**Why this priority**: Prevents invalid state and improves UX by guiding the user to a valid choice.

**Independent Test**: Try to select "German" as both source and target language.

**Acceptance Scenarios**:

1. **Given** "German" is selected as the source language, **When** looking at the target language options, **Then** "German" should be disabled or show an error if selected.
2. **Given** the same language is somehow selected for both, **When** trying to proceed, **Then** the "Start" button remains disabled.

---

### User Story 4 - Technical Refinement (Priority: P3)

As a developer, I want to use generic constants and strict types for language directions so that the codebase is ready for dynamic language pairs beyond just German and Czech.

**Why this priority**: Clean code and maintainability.

**Independent Test**: Verify that `DE_TO_CZ` and `CZ_TO_DE` are replaced by generic equivalents and that types are strictly defined.

**Acceptance Scenarios**:

1. **Given** the codebase, **When** searching for `DE_TO_CZ`, **Then** it should be replaced by something like `SOURCE_TO_TARGET`.
2. **Given** the `UserSettings` type, **When** checking `sourceLanguage` and `targetLanguage`, **Then** they should use the `SupportedLanguage` union type instead of `string`.

---

### Edge Cases

- **Multiple same-language clicks**: Rapidly clicking the same language should be handled gracefully.
- **Missing flags**: Fallback to text if an emoji or icon is missing (though emojis are usually reliable).
- **Unsupported Locales**: Ensure the app defaults to English if the user's browser locale isn't one of the supported ones.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST localize all text in the language onboarding screen.
- **FR-002**: System MUST center the "Welcome" message and the onboarding container visually on all screen sizes.
- **FR-003**: System MUST provide localized names for all selectable languages based on the user's active locale.
- **FR-004**: System MUST display a flag emoji or icon next to each language name in the selection UI.
- **FR-005**: System MUST prevent selecting the same language as both source and target.
- **FR-006**: System MUST use generic identifiers for language directions (e.g., from source to target) instead of specific language codes.
- **FR-007**: System MUST enforce strict data types for all language-related settings and configurations.

### Key Entities _(include if feature involves data)_

- **SupportedLanguage**: Union type of string literals (e.g., 'English', 'German', 'Czech').
- **LanguageDirection**: Generic union type (`'SOURCE_TO_TARGET' | 'TARGET_TO_SOURCE'`).
- **UserSettings**: Updated to use strict language types.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of text in the onboarding screen is localized.
- **SC-002**: Users cannot proceed with identical source and target languages.
- **SC-003**: The "Welcome" message is visually centered on all screen sizes.
- **SC-004**: The codebase contains zero occurrences of `DE_TO_CZ` or `CZ_TO_DE` constants (excluding migrations or legacy logs if any).
- **SC-005**: Type-checking passes with zero `any` or `string` usages for language-related fields where `SupportedLanguage` is applicable.
