import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;

const getFirebaseAdmin = (): App => {
    if (adminApp) {
        return adminApp;
    }

    if (getApps().length > 0) {
        adminApp = getApps()[0];
        return adminApp;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
            'Firebase Admin SDK requires FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables'
        );
    }

    adminApp = initializeApp({
        credential: cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });

    return adminApp;
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

