'use client';

import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Sun, Moon, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserSettings } from '@/models/types';
import { useTheme } from 'next-themes';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useMounted } from '@/hooks/use-mounted';

export const ThemeSelector = () => {
  const { updateSettings } = useSettings();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800" />
        ))}
      </div>
    );
  }

  const options: { id: UserSettings['theme']; label: string; icon: typeof Sun }[] = [
    { id: 'light', label: 'Hell', icon: Sun },
    { id: 'dark', label: 'Dunkel', icon: Moon },
    { id: 'system', label: 'System', icon: Laptop },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = theme === option.id;
        const Icon = option.icon;

        return (
          <Card
            key={option.id}
            onClick={() => {
              setTheme(option.id);
              updateSettings({ theme: option.id });
            }}
            variant={isSelected ? 'playful' : 'default'}
            className={cn(
              'flex flex-col items-center justify-center p-4 gap-2',
              !isSelected && 'hover:border-zinc-300 dark:hover:border-zinc-700'
            )}
          >
            <Icon
              size={24}
              strokeWidth={isSelected ? 3 : 2}
              className={cn(isSelected ? 'text-playful-indigo dark:text-white' : 'text-zinc-500')}
            />
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
