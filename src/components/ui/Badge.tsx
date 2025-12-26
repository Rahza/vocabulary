'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'indigo' | 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge = ({ children, variant = 'default', size = 'md', className }: BadgeProps) => {
  const variants = {
    default: 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
    indigo: 'bg-playful-indigo/15 text-playful-indigo',
    green: 'bg-playful-green/15 text-emerald-700 dark:text-playful-green',
    yellow: 'bg-playful-yellow/20 text-amber-700 dark:text-playful-yellow',
    red: 'bg-playful-red/15 text-rose-700 dark:text-playful-red',
  };

  const sizes = {
    sm: 'text-[9px] px-2 py-0.5',
    md: 'text-[10px] px-3 py-1',
  };

  return (
    <span
      className={cn(
        'font-black uppercase tracking-widest rounded-full transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
