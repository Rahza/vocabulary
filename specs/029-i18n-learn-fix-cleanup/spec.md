# Feature Specification: I18n Fixes, Learn Mode Fix & UI Cleanup

**Feature Branch**: `029-i18n-learn-fix-cleanup`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "Some translations are missing, at least in German. Verify that all languages have all translations available. Also, currently the 'learn' mode seems to be broken. It doesn't show any vocabulary even though I recently added words. Also, move sign out button from the bottom menu to the settings page"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Multilingual Consistency (Priority: P1)

As a user, I want the application to be fully translated in my preferred language (German, Czech, Spanish, French, Italian, or English) so that I can use all features comfortably.

**Why this priority**: Essential for accessibility and professional feel of the application.

**Independent Test**: Switch the application to each supported language and verify that no English strings remain in labels, buttons, or placeholders.

**Acceptance Scenarios**:

1. **Given** the user selects German, **When** they view the collection or trainer, **Then** all UI elements are localized correctly (e.g., "Fortschritt zurücksetzen" instead of "Reset progress").
2. **Given** the app supports Spanish, French, and Italian, **When** switching to these locales, **Then** the application content is fully localized.

---

### User Story 2 - Working Learn Mode (Priority: P1)

As a user, I want the "learn" mode to correctly identify and display vocabulary items that are due for review so that I can maintain my learning progress.

**Why this priority**: Core functionality of the app. If learning doesn't work, the app is unusable for its primary purpose.

**Independent Test**: Add new vocabulary items and immediately navigate to the Trainer. Verify that the new items appear in the review queue.

**Acceptance Scenarios**:

1. **Given** a user has added 5 new vocabulary pairs, **When** they go to the Trainer page, **Then** they see 10 review items (5 forward, 5 backward) immediately.
2. **Given** a review session is completed, **When** returning later, **Then** only items whose `nextReview` time has passed are shown.

---

### User Story 3 - Settings UI Cleanup (Priority: P2)

As a user, I want the sign-out button to be located in the settings page instead of the bottom navigation menu so that the main navigation is less cluttered and follows standard UX patterns.

**Why this priority**: Improves information architecture and navigation clarity.

**Independent Test**: Verify that the sign-out button is removed from the bottom navigation bar and is present at the bottom of the Settings page.

**Acceptance Scenarios**:

1. **Given** the user is logged in, **When** looking at the bottom navigation, **Then** only functional links (Dashboard, Collection, Trainer, Practice, Settings) are visible.
2. **Given** the user is on the Settings page, **When** scrolling to the bottom, **Then** a clear "Sign Out" button is available.

---

### Edge Cases

- **Missing Translation Fallback**: Ensure that if a translation is accidentally missed in the future, it falls back to English instead of showing a raw key.
- **Clock Drift**: Handle cases where local device time is significantly different from server time (though Firestore usually handles this via server-side comparisons).
- **Empty Collection**: Ensure the Trainer handles the "no vocabulary added yet" state gracefully.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide full localization files (`es.json`, `fr.json`, `it.json`) for all languages defined in `SUPPORTED_LANGUAGES`.
- **FR-002**: System MUST update `de.json` and `cs.json` to replace remaining English strings with correct translations.
- **FR-003**: System MUST ensure that `getDueReviews` in `FirebaseRepository.ts` correctly retrieves all items where `nextReview` is in the past or present.
- **FR-004**: System MUST verify that `nextReview` timestamps are correctly initialized during vocabulary creation.
- **FR-005**: System MUST remove the "Sign Out" button from the `Navigation` component.
- **FR-006**: System MUST add a "Sign Out" button to the `SettingsPage` component, styled consistently with the "Danger Zone" buttons.

### Key Entities *(include if feature involves data)*

- **Localization Files**: JSON files containing key-value pairs for all UI strings.
- **LeitnerState**: Firestore document tracking review timing.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% translation coverage for all 6 supported languages.
- **SC-002**: Trainer queue is non-empty immediately after adding new vocabulary.
- **SC-003**: Zero "Sign Out" button presence in the bottom navigation bar.
- **SC-004**: Sign-out functionality is accessible and functional on the Settings page.