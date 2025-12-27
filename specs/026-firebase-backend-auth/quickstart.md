# Quickstart: Firebase Backend Setup

## 1. Firebase Project Creation
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named `vocabulary-ai`.
3. Enable **Authentication** (Email/Password).
4. Create a **Firestore Database** in production mode.
5. Apply the security rules defined in `data-model.md`.

## 2. Environment Variables
Add these to your `.env.local` (and your hosting provider):

```bash
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# OpenAI (Server-side)
OPENAI_API_KEY=sk-xxx

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=xxx
FIREBASE_CLIENT_EMAIL=xxx
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

## 3. Development Flow
1. Run `npm install firebase firebase-admin`.
2. Implement `FirebaseRepository` using the `IVocabularyRepository` interface.
3. Switch the repository provider in the application root.
4. Implement the `/api/generate` route.
5. Add Login/Signup UI.

```