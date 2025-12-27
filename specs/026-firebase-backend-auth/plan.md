# Implementation Plan: Firebase Backend & Auth

**Branch**: `026-firebase-backend-auth` | **Date**: 2025-12-26 | **Spec**: [specs/026-firebase-backend-auth/spec.md]

## Summary
Migrate the application from LocalStorage to a multi-user hosted backend using Firebase. This includes Firebase Auth for user sessions, Cloud Firestore for persistent storage, and Next.js API routes for secure server-side AI vocabulary generation.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Firebase SDK (v10+), OpenAI SDK (v4+), Next.js 16+, firebase-admin  
**Storage**: Cloud Firestore  
**Testing**: Vitest  
**Target Platform**: Web (Vercel or Firebase Hosting)
**Project Type**: Web application
**Performance Goals**: <200ms latency for Auth/DB, <2s for AI generation
**Constraints**: Zero client-side API key exposure, strict user data isolation
**Scale/Scope**: Multi-user support, cloud persistence

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Engineering Excellence**: ✅ Uses repository pattern to swap storage layers.
- **II. Maintainability and Extensibility**: ✅ Standard Firebase/Next.js architecture.
- **III. User-Centric Design**: ✅ Multi-device sync improves UX.
- **IV. Performance and Scalability**: ✅ Firestore scales automatically.
- **V. Version Control Discipline**: ✅ Atomic commits planned for migration steps.
- **VI. Pragmatic Testing**: ✅ Unit tests for backend AI route and repository.
- **VII. Strict Linting & Formatting**: ✅ Adheres to project ESLint/Prettier.
- **VIII. Strong Typing Discipline**: ✅ Strict types for Firestore documents and Auth state.
- **IX. Modern Coding Style**: ✅ Arrow functions for all new components/hooks.

## Project Structure

### Documentation (this feature)

```text
specs/026-firebase-backend-auth/
├── plan.md              # This file
├── research.md          # Firebase integration & AI patterns
├── data-model.md        # Firestore document schemas
├── quickstart.md        # Setup guide
├── contracts/           # API definitions for AI generation
└── tasks.md             # Execution steps
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts       # Secure AI generation endpoint
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/            # Auth UI routes
│   └── ...
├── components/
│   ├── auth/
│   │   └── AuthProvider.tsx   # User session management
│   └── ...
├── lib/
│   └── firebase.ts            # Firebase client initialization
├── services/
│   ├── storage/
│   │   └── FirebaseRepository.ts # Firestore implementation
│   └── ...
└── models/
    └── types.ts               # Updated domain models
```

**Structure Decision**: Integrated Web Application structure using Next.js App Router for both frontend and backend (API routes).

## Complexity Tracking
