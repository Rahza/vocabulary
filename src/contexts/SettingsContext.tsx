'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserSettings } from '@/models/types';
import { useLocale } from 'next-intl';
import { useAuth } from '@/components/auth/AuthProvider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';

const STORAGE_KEY = 'ai_vocab_user_settings';

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  isLoading: boolean;
}

const defaultSettings: UserSettings = {
  theme: 'system',
  dailyGoal: 20,
  language: 'en',
  languagePairSelected: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale() as 'en' | 'de' | 'cs';
  const { user, loading: authLoading } = useAuth();

  const getInitialSettings = (): UserSettings => {
    if (typeof window === 'undefined') {
      return { ...defaultSettings, language: locale };
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    const initialSettings = { ...defaultSettings, language: locale };
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserSettings;
        return { ...initialSettings, ...parsed };
      } catch (e) {
        console.error('Failed to parse settings', e);
        return initialSettings;
      }
    }
    return initialSettings;
  };

  const [settings, setSettings] = useState<UserSettings>(getInitialSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from Firestore when user is authenticated
  useEffect(() => {
    const loadCloudSettings = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const firestore = getFirebaseDb();
        if (!firestore) {
          setIsLoading(false);
          return;
        }
        const settingsRef = doc(firestore, 'users', user.uid, 'settings', 'current');
        const snapshot = await getDoc(settingsRef);

        if (snapshot.exists()) {
          const cloudSettings = snapshot.data() as UserSettings;
          setSettings((prev) => ({ ...prev, ...cloudSettings }));
        }
      } catch (error) {
        console.error('Failed to load cloud settings', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      loadCloudSettings();
    }
  }, [user, authLoading]);

  // Persist settings to localStorage and Firestore
  useEffect(() => {
    if (isLoading || authLoading) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    // Also persist to Firestore if user is authenticated
    if (user) {
      const firestore = getFirebaseDb();
      if (firestore) {
        const settingsRef = doc(firestore, 'users', user.uid, 'settings', 'current');
        setDoc(settingsRef, { ...settings, ownerId: user.uid }).catch((error) => {
          console.error('Failed to save cloud settings', error);
        });
      }
    }
  }, [settings, isLoading, authLoading, user]);

  const updateSettings = useCallback(
    (newSettings: Partial<UserSettings>) => {
      const nextSettings = { ...settings, ...newSettings };

      // Validation: Prevent source == target
      if (
        nextSettings.sourceLanguage &&
        nextSettings.targetLanguage &&
        nextSettings.sourceLanguage === nextSettings.targetLanguage
      ) {
        console.warn('Invalid language pair: source and target must be different.');
        return;
      }

      if (newSettings.language) {
        document.cookie = `NEXT_LOCALE=${newSettings.language}; path=/; max-age=31536000; SameSite=Lax`;
      }
      setSettings((prev) => ({ ...prev, ...newSettings }));
    },
    [settings]
  );

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

