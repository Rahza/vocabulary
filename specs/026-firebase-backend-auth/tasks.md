# Tasks: Firebase Backend & Auth

**Branch**: `026-firebase-backend-auth`
**Spec**: `specs/026-firebase-backend-auth/spec.md`

## Dependencies

- **Phase 1 & 2** must be completed before any functional features.
- **Phase 3 (US1)** is a prerequisite for **Phase 4 (US2)** and **Phase 5 (US3)** because they require an authenticated user `uid`.
- **Phase 6 (US4)** relies on the Firestore setup from Phase 4.

## Implementation Strategy

1. **Backend First**: Initialize Firebase and create the secure API route for AI.
2. **Identity**: Implement Authentication UI and Context to establish user identity.
3. **Storage**: Swap `LocalStorageRepository` with `FirebaseRepository` to enable cloud persistence.
4. **Security**: Apply and verify Firestore rules to ensure data isolation.

## Phase 1: Setup

*Goal: Initialize dependencies and environment.*

- [ ] T001 Install Firebase dependencies: `npm install firebase firebase-admin`
- [ ] T002 Create `.env.local` template with required Firebase and OpenAI keys in `specs/026-firebase-backend-auth/quickstart.md`
- [ ] T003 Create Firebase initialization helper in `src/lib/firebase.ts`

## Phase 2: Foundational

*Goal: Establish core services and admin setup.*

- [ ] T004 Implement Firebase Admin initialization for server-side usage in `src/lib/firebase-admin.ts`
- [ ] T005 Update domain models in `src/models/types.ts` to support optional `ownerId` for cloud documents

## Phase 3: [US1] Secure Authentication

*Goal: Allow users to sign up and log in.*

- [ ] T006 Create `AuthProvider` and `useAuth` hook in `src/components/auth/AuthProvider.tsx`
- [ ] T007 Implement Login page in `src/app/(auth)/login/page.tsx`
- [ ] T008 Implement Signup page in `src/app/(auth)/signup/page.tsx`
- [ ] T009 [P] Add "Sign Out" button to navigation or settings in `src/components/layout/Navigation.tsx`
- [ ] T010 Integrate `AuthProvider` into the root layout `src/app/[locale]/layout.tsx`

## Phase 4: [US2] Cloud Data Persistence

*Goal: Save and load data from Firestore.*

- [ ] T011 Create `FirebaseRepository` implementing `IVocabularyRepository` in `src/services/storage/FirebaseRepository.ts`
- [ ] T012 [P] Implement `addVocabulary` and `getAllVocabulary` in `src/services/storage/FirebaseRepository.ts`
- [ ] T013 [P] Implement Leitner state methods in `src/services/storage/FirebaseRepository.ts`
- [ ] T014 [P] [US2] Implement user settings persistence (language, goals) in `src/services/storage/FirebaseRepository.ts`
- [ ] T015 [US2] Refactor `SettingsContext.tsx` to persist preferences to Cloud Firestore via `FirebaseRepository`
- [ ] T016 [US2] Global swap: Update all component references from `LocalStorageRepository` to `FirebaseRepository`
- [ ] T017 [US2] Verify data flow and real-time updates in Trainer and Vocabulary Collection views

## Phase 5: [US3] Secure AI Vocabulary Generation

*Goal: Securely generate vocabulary on the server.*

- [ ] T018 Create Next.js API route for AI generation in `src/app/api/generate/route.ts`
- [ ] T019 Implement Firebase ID token verification in the generate API route `src/app/api/generate/route.ts`
- [ ] T020 Update `OpenAIService` to call the internal `/api/generate` endpoint instead of OpenAI directly in `src/services/ai/OpenAIService.ts`

## Phase 6: [US4] Access Control & Privacy

*Goal: Enforce data isolation.*

- [ ] T021 Create `firestore.rules` file with user isolation rules in the project root
- [ ] T022 [P] Add validation checks in `FirebaseRepository` to ensure `ownerId` matches current user

## Phase 7: Polish & Cross-Cutting Concerns

*Goal: Final refinements and error handling.*

- [ ] T023 Implement middleware or HOC to protect private routes (Dashboard, Trainer) from unauthenticated access
- [ ] T024 [P] Implement global loading state for Firebase initialization in `src/components/auth/AuthProvider.tsx`
- [ ] T025 Update `README.md` with backend setup instructions
