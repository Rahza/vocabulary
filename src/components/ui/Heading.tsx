'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  subtitle?: string;
  icon?: LucideIcon;
  className?: string;
}

export const Heading = ({ level = 1, children, subtitle, icon: Icon, className }: HeadingProps) => {
  const Tag = `h${level}` as React.ElementType;

  const sizes = {
    1: 'text-3xl',
    2: 'text-2xl',
    3: 'text-xl',
    4: 'text-lg',
  };

  return (
    <div className={cn('space-y-1', className)}>
      <Tag className={cn('font-black tracking-tight flex items-center gap-2', sizes[level])}>
        {Icon && <Icon className="w-6 h-6 text-playful-indigo" />}
        {children}
      </Tag>
      {subtitle && (
        <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-xs">
          {subtitle}
        </p>
      )}
    </div>
  );
};
