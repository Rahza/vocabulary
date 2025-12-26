'use client';

import React, { useEffect, useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

export const LanguageSelector = () => {
  const { updateSettings } = useSettings();
  const t = useTranslations('settings.languages');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-3xl border-2 border-zinc-100 dark:border-zinc-800"
          />
        ))}
      </div>
    );
  }

  const options: { id: 'en' | 'de' | 'cs'; label: string }[] = [
    { id: 'en', label: t('en') },
    { id: 'de', label: t('de') },
    { id: 'cs', label: t('cs') },
  ];

  const handleLanguageChange = (newLocale: 'en' | 'de' | 'cs') => {
    updateSettings({ language: newLocale });
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = locale === option.id;

        return (
          <Card
            key={option.id}
            onClick={() => handleLanguageChange(option.id)}
            variant={isSelected ? 'playful' : 'default'}
            className={cn(
              'flex flex-col items-center justify-center p-4 gap-2 h-20',
              !isSelected && 'hover:border-zinc-300 dark:hover:border-zinc-700'
            )}
          >
            <span
              className={cn(
                'text-[10px] font-black uppercase tracking-widest',
                isSelected ? 'text-playful-indigo dark:text-white' : 'text-zinc-500'
              )}
            >
              {option.label}
            </span>
          </Card>
        );
      })}
    </div>
  );
};
