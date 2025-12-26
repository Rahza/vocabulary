# Research: Firebase Backend & Auth

## Technical Decisions

### 1. Firebase Integration Pattern
**Decision**: Use the `firebase` client SDK for client-side authentication and Firestore interactions, and `firebase-admin` (if needed) or the client SDK with appropriate security rules for API routes.
**Rationale**: Standard approach for Next.js apps. Firestore security rules provide robust isolation without needing a heavy middleware layer for simple CRUD.
**Alternatives considered**: Supabase (rejected because Firebase was explicitly requested).

### 2. Backend AI Generation
**Decision**: Implement AI generation via Next.js API Routes (`/api/generate`).
**Rationale**: Simplifies deployment and shared logic with the frontend. The API route will verify the Firebase ID token before calling OpenAI.
**Alternatives considered**: Firebase Cloud Functions (more complex setup, separate deployment).

### 3. Data Isolation (Security Rules)
**Decision**: Use Firestore security rules to enforce `allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId`.
**Rationale**: Industry standard for multi-tenant Firestore apps.
**Alternatives considered**: Custom backend API for all DB access (overkill).

### 4. API Key Management
**Decision**: Store OpenAI API key in environment variables (`OPENAI_API_KEY`) on the hosting platform (e.g., Vercel/Firebase).
**Rationale**: Prevents client-side exposure and enables secure rotation.

## Best Practices Found

- **Next.js API Route Auth**: Verify the `Authorization: Bearer <ID_TOKEN>` header using the Firebase Admin SDK to ensure only logged-in users can trigger AI generation.
- **Firestore Collections**: Organize data into `users/{uid}/vocabulary` and `users/{uid}/settings` for optimal isolation and rule simplicity.
- **Client-Side Auth State**: Use a `AuthContext` to manage the user session and provide it to the application components.

## Unresolved Questions (Resolved)
- **Q**: Should we use Firebase Hosting?
- **A**: Yes, or Vercel. Both work well with this stack.
- **Q**: How to handle LocalStorage fallback?
- **A**: Per user request, no migration or fallback is needed. Everyone starts from scratch.
