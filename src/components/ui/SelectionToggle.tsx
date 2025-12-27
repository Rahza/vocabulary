'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SelectionToggleProps {
  selected: boolean;
  onToggle: () => void;
  className?: string;
}

export function SelectionToggle({ selected, onToggle, className }: SelectionToggleProps) {
  return (
    <div className="p-1 -m-1">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={cn(
          'relative w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-300',
          selected
            ? 'bg-playful-indigo border-playful-indigo shadow-lg shadow-playful-indigo/20'
            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-playful-indigo/50',
          className
        )}
      >
        <motion.div
          initial={false}
          animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Check size={14} strokeWidth={4} className="text-white" />
        </motion.div>
      </button>
    </div>
  );
}
