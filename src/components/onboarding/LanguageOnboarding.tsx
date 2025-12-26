'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/constants/languages';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Globe2, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';

const FLAGS: Record<SupportedLanguage, string> = {
  English: '🇬🇧',
  German: '🇩🇪',
  Czech: '🇨🇿',
  Spanish: '🇪🇸',
  French: '🇫🇷',
  Italian: '🇮🇹',
};

const LANG_CODE_MAP: Record<SupportedLanguage, string> = {
  English: 'en',
  German: 'de',
  Czech: 'cs',
  Spanish: 'es',
  French: 'fr',
  Italian: 'it',
};

// Routes where onboarding should not appear
const AUTH_ROUTES = ['/login', '/signup'];

export const LanguageOnboarding = () => {
  const { settings, updateSettings } = useSettings();
  const t = useTranslations('onboarding');
  const tLang = useTranslations('settings.languages');
  const pathname = usePathname();

  const [source, setSource] = useState<SupportedLanguage | null>(null);
  const [target, setTarget] = useState<SupportedLanguage | null>(null);

  // Skip onboarding on auth pages
  const isAuthPage = AUTH_ROUTES.some((route) => pathname === route);
  if (isAuthPage) return null;

  if (settings.languagePairSelected) return null;

  const handleStart = () => {
    if (source && target && source !== target) {
      updateSettings({
        sourceLanguage: source,
        targetLanguage: target,
        languagePairSelected: true,
      });
    }
  };

  const isValid = source && target && source !== target;

  return (
    <div className="fixed inset-0 z-[200] bg-white dark:bg-zinc-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg space-y-8"
      >
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="w-20 h-20 bg-playful-indigo/10 rounded-[32px] flex items-center justify-center text-playful-indigo mb-6">
            <Globe2 size={40} strokeWidth={1.5} />
          </div>
          <Heading level={1} subtitle={t('subtitle')} className="text-center">
            {t('welcome')}
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">
              {t('sourceLabel')}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={`source-${lang}`}
                  onClick={() => {
                    setSource(lang);
                    if (target === lang) setTarget(null);
                  }}
                  className={cn(
                    'px-2 py-4 rounded-2xl font-bold text-sm border-2 transition-all flex flex-col items-center gap-1',
                    source === lang
                      ? 'bg-playful-indigo border-playful-indigo text-white shadow-lg shadow-playful-indigo/20'
                      : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-zinc-200 dark:hover:border-zinc-700'
                  )}
                >
                  <span className="text-2xl">{FLAGS[lang]}</span>
                  <span>{tLang(LANG_CODE_MAP[lang])}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="flex justify-center text-zinc-200 dark:text-zinc-800">
            <ArrowRightLeft size={24} />
          </div>

          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">
              {t('targetLabel')}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isDisabled = source === lang;
                return (
                  <button
                    key={`target-${lang}`}
                    onClick={() => setTarget(lang)}
                    disabled={isDisabled}
                    className={cn(
                      'px-2 py-4 rounded-2xl font-bold text-sm border-2 transition-all flex flex-col items-center gap-1',
                      target === lang
                        ? 'bg-playful-green border-playful-green text-white shadow-lg shadow-playful-green/20'
                        : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-zinc-200 dark:hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:grayscale'
                    )}
                  >
                    <span className="text-2xl">{FLAGS[lang]}</span>
                    <span>{tLang(LANG_CODE_MAP[lang])}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <Button
          onClick={handleStart}
          disabled={!isValid}
          className="w-full h-16 rounded-3xl border-b-4 text-xl"
        >
          {t('startSession')}
        </Button>
      </motion.div>
    </div>
  );
};
