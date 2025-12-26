"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserSettings } from "@/models/types";
import { useLocale } from "next-intl";

const STORAGE_KEY = "ai_vocab_user_settings";

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  isLoading: boolean;
}

const defaultSettings: UserSettings = {
  theme: "system",
  dailyGoal: 20,
  language: "en",
  languagePairSelected: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale() as 'en' | 'de' | 'cs';

  // Load settings on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initialSettings = { ...defaultSettings, language: locale };
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserSettings;
        setSettings({ ...initialSettings, ...parsed });
      } catch (e) {
        console.error("Failed to parse settings", e);
        setSettings(initialSettings);
      }
    } else {
      setSettings(initialSettings);
    }
    setIsLoading(false);
  }, [locale]);

  // Persist settings to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const nextSettings = { ...settings, ...newSettings };

    // Validation: Prevent source == target
    if (
      nextSettings.sourceLanguage && 
      nextSettings.targetLanguage && 
      nextSettings.sourceLanguage === nextSettings.targetLanguage
    ) {
      console.warn("Invalid language pair: source and target must be different.");
      return;
    }

    if (newSettings.language) {
      document.cookie = `NEXT_LOCALE=${newSettings.language}; path=/; max-age=31536000; SameSite=Lax`;
    }
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}