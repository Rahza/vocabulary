'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const useEmulators = process.env.NEXT_PUBLIC_USE_EMULATORS === 'true';

// Check if Firebase is configured
const isFirebaseConfigured = (): boolean => {
    return !!(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId);
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let emulatorsConnected = false;

const getApp = (): FirebaseApp | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    if (!isFirebaseConfigured()) {
        console.warn('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables.');
        return null;
    }

    if (!app) {
        if (getApps().length === 0) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApps()[0];
        }
    }
    return app;
};

const connectEmulators = (authInst: Auth, dbInst: Firestore) => {
    if (emulatorsConnected || !useEmulators) return;

    try {
        connectAuthEmulator(authInst, 'http://127.0.0.1:9099', { disableWarnings: true });
        connectFirestoreEmulator(dbInst, '127.0.0.1', 8080);
        emulatorsConnected = true;
        console.log('🔥 Connected to Firebase Emulators (Auth:9099, Firestore:8080)');
    } catch (error) {
        // Emulators already connected or connection failed
        console.warn('Could not connect to Firebase Emulators:', error);
    }
};

export const getFirebaseAuth = (): Auth | null => {
    if (!authInstance) {
        const appInstance = getApp();
        if (appInstance) {
            authInstance = getAuth(appInstance);
            // Ensure dbInstance is initialized for emulator connection
            if (!dbInstance) {
                dbInstance = getFirestore(appInstance);
            }
            // Connect to emulators if configured
            if (useEmulators && !emulatorsConnected) {
                connectEmulators(authInstance, dbInstance);
            }
        }
    }
    return authInstance;
};

export const getFirebaseDb = (): Firestore | null => {
    if (!dbInstance) {
        const appInstance = getApp();
        if (appInstance) {
            dbInstance = getFirestore(appInstance);
            // If auth is already initialized, connect emulators
            if (useEmulators && !emulatorsConnected && authInstance) {
                connectEmulators(authInstance, dbInstance);
            }
        }
    }
    return dbInstance;
};

// Legacy exports for backward compatibility - use getters instead
export const auth = {
    get currentUser() {
        return getFirebaseAuth()?.currentUser ?? null;
    },
    onAuthStateChanged: (callback: (user: unknown) => void) => {
        const authInst = getFirebaseAuth();
        if (authInst) {
            return authInst.onAuthStateChanged(callback);
        }
        // Immediately call with null if Firebase not configured
        callback(null);
        return () => { };
    },
    getIdToken: async () => {
        const user = getFirebaseAuth()?.currentUser;
        if (user) {
            return user.getIdToken();
        }
        return null;
    },
};

export const db = getFirebaseDb();

export { isFirebaseConfigured, useEmulators };

