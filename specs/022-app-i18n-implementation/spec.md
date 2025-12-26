# Feature Specification: Application i18n Implementation

**Feature Branch**: `022-app-i18n-implementation`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "Implement i18n. Provide translations for English, German and Czech. Use the user's system language as default, but add a app language selector in the settings."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automatic Language Detection (Priority: P1)

As a new user, I want the application to start in my preferred system language automatically so that I can understand the interface immediately without manual configuration.

**Why this priority**: First impressions are critical for user onboarding and accessibility.

**Independent Test**: Clear browser storage, set system language to "German", and open the app. Verify UI is in German.

**Acceptance Scenarios**:

1. **Given** my browser language is set to German, **When** I first visit the application, **Then** the UI text (Dashboard, Buttons, Labels) is displayed in German.
2. **Given** my browser language is set to a language not supported (e.g., French), **When** I first visit the application, **Then** the UI text falls back to English.

---

### User Story 2 - Manual Language Selection (Priority: P1)

As a user, I want to change the application language in the settings regardless of my system language so that I can use the app in the language I am most comfortable with for this specific tool.

**Why this priority**: Essential for users who work in multilingual environments or prefer different languages for different apps.

**Independent Test**: Navigate to Settings, change language from "English" to "Czech". Verify UI updates immediately.

**Acceptance Scenarios**:

1. **Given** the app is in English, **When** I select "Czech" in the settings language selector, **Then** the UI text updates to Czech instantly without a page reload.

---

### User Story 3 - Persistent Language Preference (Priority: P1)

As a user, I want my language choice to be remembered across sessions so that I don't have to re-select it every time I open the application.

**Why this priority**: Prevents user frustration and ensures a consistent experience.

**Independent Test**: Set language to "German", refresh the page. Verify UI remains in German.

**Acceptance Scenarios**:

1. **Given** I have manually selected "German" as my app language, **When** I close the browser and return later, **Then** the application starts in German immediately.

---

### Edge Cases

- System language detection failing or returning multiple languages (use the first supported one).
- Missing translation keys (should display the key or the English equivalent).
- Switching language during an active practice session or animation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST detect the user's browser language on first load.
- **FR-002**: System MUST provide full UI translations for English (EN), German (DE), and Czech (CZ).
- **FR-003**: System MUST provide a language selector in the Settings page.
- **FR-004**: System MUST persist the language selection in LocalStorage or UserSettings.
- **FR-005**: System MUST fallback to English if the detected or selected language is unavailable.
- **FR-006**: UI MUST support dynamic language switching without requiring a full page refresh.
- **FR-007**: System MUST localize date formats and number formatting (separators and decimal points) according to the selected language (e.g., German uses DD.MM.YYYY and 1.000,00, English uses MM/DD/YYYY and 1,000.00).

### Key Entities *(include if feature involves data)*

- **LanguageConfig**: Represents the active language code and the associated translation bundles.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of hardcoded UI strings in core screens (Dashboard, Collection, Trainer, Practice, Settings) are externalized and translated.
- **SC-002**: Language switching is completed in under 100ms after user selection.
- **SC-003**: ZERO usage of native browser dialogs for language selection.
- **SC-004**: App correctly identifies and applies supported system languages in 95% of first-load cases.

## Assumptions

- User-generated content (vocabulary items, mnemonics) will NOT be translated by this system.
- The application already has a functional Settings page to host the selector.