# Feature Specification: Firebase Backend & Auth

**Feature Branch**: `026-firebase-backend-auth`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "Firebase Backend & Auth: Integrate Firebase Authentication, migrate data storage to Firestore, and move AI vocabulary generation to backend functions. Note: No data migration from LocalStorage is required. We do NOT need a migration functionality. You can assume the app hasn't been used yet. No user will have to migrate their data, everyone will start from scratch."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Authentication (Priority: P1)

As a new user, I want to create an account and sign in securely so that my personalized vocabulary data is safely associated with my identity and accessible across devices.

**Why this priority**: Fundamental requirement for a hosted application and personalized user data.

**Independent Test**: Can be fully tested by creating a new account via the UI and verifying that the user is redirected to the dashboard upon successful authentication.

**Acceptance Scenarios**:

1. **Given** a new user visits the application, **When** they navigate to the sign-up page and provide valid credentials, **Then** an account is created in Firebase Auth and they are logged in.
2. **Given** an existing user, **When** they provide correct credentials on the login page, **Then** they are authenticated and redirected to their personal dashboard.
3. **Given** a logged-in user, **When** they click "Sign Out", **Then** their session is terminated and they are returned to the landing page.

---

### User Story 2 - Cloud Data Persistence (Priority: P1)

As an authenticated user, I want all my vocabulary items, tags, and learning progress to be saved automatically to the cloud so that I never lose my work and can resume learning on any device.

**Why this priority**: Core value proposition of the backend migration; ensures data durability beyond a single browser session.

**Independent Test**: Can be fully tested by adding a word on one device/browser, logging in on another, and verifying the word appears there.

**Acceptance Scenarios**:

1. **Given** an authenticated user adds a new vocabulary pair, **When** the operation completes, **Then** the record is persisted in Cloud Firestore under their specific user ID.
2. **Given** an authenticated user completes a practice session, **When** progress is updated, **Then** the updated Leitner box states are synced to Cloud Firestore.

---

### User Story 3 - Secure AI Vocabulary Generation (Priority: P2)

As a user, I want to generate new vocabulary sets using AI without the application exposing sensitive API keys in the browser, ensuring a professional and secure generation experience.

**Why this priority**: Security best practice to prevent API key leakage and potential abuse.

**Independent Test**: Can be tested by checking the browser's Network tab during generation to verify no direct calls to OpenAI are made, but rather to a backend endpoint.

**Acceptance Scenarios**:

1. **Given** an authenticated user requests a new topic, **When** they click "Generate", **Then** the request is sent to a secure backend function which handles the OpenAI communication.
2. **Given** the backend AI function is called, **When** it receives a response from the AI provider, **Then** it returns the structured vocabulary data to the client for review.

---

### User Story 4 - Access Control & Privacy (Priority: P1)

As a user, I want to ensure that only I can access and modify my vocabulary data so that my learning progress remains private and secure.

**Why this priority**: Essential for user privacy and system integrity in a multi-user environment.

**Independent Test**: Can be tested by attempting to access a specific Firestore document ID belonging to another user and verifying the request is rejected by security rules.

**Acceptance Scenarios**:

1. **Given** two authenticated users A and B, **When** user A attempts to read or write data belonging to user B, **Then** the system rejects the operation with a permission error.

---

### Edge Cases

- **Expired Sessions**: System must handle authentication token expiration by prompting the user to sign in again.
- **Offline States**: While primarily a hosted app, basic read-only access to cached data should be considered (standard Firestore behavior).
- **Incomplete Setup**: If a user is authenticated but has not yet selected their language pair, the system must force the onboarding flow.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement Firebase Authentication (Email/Password).
- **FR-002**: System MUST use Cloud Firestore for persistent storage of all user-specific data.
- **FR-003**: System MUST provide a secure backend proxy (Firebase Cloud Functions or Next.js API Routes) for OpenAI API calls.
- **FR-004**: System MUST implement Firestore Security Rules to enforce user-level data isolation.
- **FR-005**: System MUST provide a "Sign In" and "Sign Up" user interface.
- **FR-006**: System MUST persist User Settings (languages, API preferences if any) in Cloud Firestore.
- **FR-007**: System MUST replace the current `LocalStorageRepository` with a backend-aware repository implementation.

### Key Entities *(include if feature involves data)*

- **User**: Firebase Auth identity with unique `uid`.
- **VocabularyDocument**: Firestore document containing `source`, `target`, `mnemonic`, `tags`, etc., indexed by `uid`.
- **LeitnerStateDocument**: Firestore document tracking progress for a specific vocabulary item and user.
- **SettingsDocument**: Firestore document storing user-specific app preferences.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of user data is stored in the cloud; LocalStorage is no longer used for primary data.
- **SC-002**: Zero exposure of OpenAI API keys in the client-side JavaScript bundle or network traffic.
- **SC-003**: Authentication state persists across page refreshes and browser restarts.
- **SC-004**: Data synchronization between client and server happens in under 2 seconds for typical operations.