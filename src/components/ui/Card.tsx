'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'playful' | 'outline';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card = ({
  children,
  variant = 'default',
  hoverable = false,
  className,
  onClick,
}: CardProps) => {
  const variants = {
    default:
      'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-soft dark:shadow-none',
    playful:
      'bg-white dark:bg-zinc-900 border-playful-indigo shadow-lg shadow-playful-indigo/10 ring-4 ring-playful-indigo/5',
    outline: 'bg-transparent border-zinc-200 dark:border-zinc-800',
  };

  const isInteractive = onClick || hoverable;

  return (
    <motion.div
      onClick={onClick}
      whileHover={isInteractive ? { scale: 0.98 } : undefined}
      whileTap={isInteractive ? { scale: 0.96 } : undefined}
      className={cn(
        'p-3 border-2 rounded-[24px] transition-all relative',
        variants[variant],
        onClick && 'cursor-pointer',
        hoverable && 'hover:border-zinc-200 dark:hover:border-zinc-700',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
