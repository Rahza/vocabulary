'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { IVocabularyRepository } from '@/services/storage/IVocabularyRepository';
import { FirebaseRepository } from '@/services/storage/FirebaseRepository';
// NOTE: LocalStorageRepository import kept for future offline mode reintegration
// import { LocalStorageRepository } from '@/services/storage/LocalStorageRepository';
import { useAuth } from '@/components/auth/AuthProvider';

interface RepositoryContextType {
    repository: IVocabularyRepository;
    isCloudBacked: boolean;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const RepositoryProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    const value = useMemo<RepositoryContextType>(() => {
        // Always use Firebase - user must be authenticated
        // (AuthGuard ensures user is always present when this renders)
        return {
            repository: new FirebaseRepository(),
            isCloudBacked: true,
        };
    }, [user]);

    if (loading) {
        return null; // Or a loading spinner
    }

    return <RepositoryContext.Provider value={value}>{children}</RepositoryContext.Provider>;
};

export const useRepository = (): IVocabularyRepository => {
    const context = useContext(RepositoryContext);
    if (context === undefined) {
        throw new Error('useRepository must be used within a RepositoryProvider');
    }
    return context.repository;
};

export const useRepositoryContext = (): RepositoryContextType => {
    const context = useContext(RepositoryContext);
    if (context === undefined) {
        throw new Error('useRepositoryContext must be used within a RepositoryProvider');
    }
    return context;
};
