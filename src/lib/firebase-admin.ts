import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;

// Check if running with emulators
const useEmulators = process.env.NEXT_PUBLIC_USE_EMULATORS === 'true';

const getFirebaseAdmin = (): App => {
    if (adminApp) {
        return adminApp;
    }

    if (getApps().length > 0) {
        adminApp = getApps()[0];
        return adminApp;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    // When using emulators, we can initialize without full credentials
    if (useEmulators) {
        // Set emulator environment variables for Firebase Admin SDK
        process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
        process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

        adminApp = initializeApp({
            projectId: projectId || 'demo-project',
        });
        return adminApp;
    }

    // Production mode - require full credentials
    // Production mode
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // If we have explicit credentials, use them (useful for non-GCP environments)
    if (projectId && clientEmail && privateKey) {
        adminApp = initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey,
            }),
        });
        return adminApp;
    }

    // Fallback to Application Default Credentials (works automatically in Firebase Functions/Cloud Run)
    // and inferred project ID
    try {
        adminApp = initializeApp();
        return adminApp;
    } catch (error) {
        console.error('Failed to initialize Firebase Admin with default credentials:', error);
        throw new Error(
            'Firebase Admin SDK initialization failed. Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY, and Application Default Credentials could not be loaded.'
        );
    }


};

export const adminAuth: Auth = {
    verifyIdToken: async (token: string) => {
        const app = getFirebaseAdmin();
        return getAuth(app).verifyIdToken(token);
    },
} as Auth;

export const adminDb: Firestore = {
    collection: (path: string) => {
        const app = getFirebaseAdmin();
        return getFirestore(app).collection(path);
    },
} as Firestore;
