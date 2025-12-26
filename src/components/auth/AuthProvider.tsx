'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    UserCredential,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isConfigured: boolean;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    signOut: () => Promise<void>;
    getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isConfigured, setIsConfigured] = useState(false);

    useEffect(() => {
        // Check if Firebase is configured
        const configured = isFirebaseConfigured();
        setIsConfigured(configured);

        if (!configured) {
            // Firebase not configured - skip auth and mark as loaded
            setLoading(false);
            return;
        }

        const auth = getFirebaseAuth();
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        const auth = getFirebaseAuth();
        if (!auth) {
            throw new Error('Firebase is not configured');
        }
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const signUp = useCallback(async (email: string, password: string) => {
        const auth = getFirebaseAuth();
        if (!auth) {
            throw new Error('Firebase is not configured');
        }
        return createUserWithEmailAndPassword(auth, email, password);
    }, []);

    const signOut = useCallback(async () => {
        const auth = getFirebaseAuth();
        if (auth) {
            await firebaseSignOut(auth);
        }
    }, []);

    const getIdToken = useCallback(async (): Promise<string | null> => {
        if (!user) return null;
        return user.getIdToken();
    }, [user]);

    return (
        <AuthContext.Provider
            value={{ user, loading, isConfigured, signIn, signUp, signOut, getIdToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

