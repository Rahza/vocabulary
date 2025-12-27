'use client';

import React from 'react';
import { Search, Filter, X, RotateCcw, Wand2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { itemReveal } from '@/lib/animations';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/Card';

interface SearchFiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedBox: number | null;
  onBoxChange: (box: number | null) => void;
  availableTags: string[];
  onResetFilters: () => void;
}

export function SearchFilters({
  query,
  onQueryChange,
  selectedTags,
  onTagsChange,
  selectedBox,
  onBoxChange,
  availableTags,
  onResetFilters,
}: SearchFiltersProps) {
  const t = useTranslations('vocabulary');
  const dashT = useTranslations('dashboard');

  const toggleTag = (tag: string) => {
    onTagsChange(
      selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]
    );
  };

  const BOXES = [1, 2, 3, 4, 5];

  return (
    <motion.div variants={itemReveal} className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <Input
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-10 focus-visible:ring-playful-indigo"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <Link href="/generate">
          <Button className="h-12 px-4 rounded-xl border-b-4 font-black shadow-lg shadow-playful-yellow/20 whitespace-nowrap text-sm bg-playful-yellow text-playful-indigo border-yellow-600">
            <Wand2 size={18} className="sm:mr-2" />
            <span className="hidden sm:inline">{dashT('generate')}</span>
          </Button>
        </Link>
      </div>

      <Card className="p-3 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <Filter size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">{t('tags')}</span>
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => onTagsChange([])}
                  className="text-[9px] font-black text-playful-red uppercase"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1 custom-scrollbar">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border-2',
                      isSelected
                        ? 'bg-playful-indigo border-playful-indigo text-white'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-500'
                    )}
                  >
                    #{tag}
                  </button>
                );
              })}
              {availableTags.length === 0 && (
                <span className="text-[9px] text-zinc-400 italic px-1">{t('noTags')}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <RotateCcw size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">{t('box')}</span>
              </div>
              {selectedBox !== null && (
                <button
                  onClick={() => onBoxChange(null)}
                  className="text-[9px] font-black text-playful-red uppercase"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="flex gap-1.5">
              {BOXES.map((box) => {
                const isSelected = selectedBox === box;
                return (
                  <button
                    key={box}
                    onClick={() => onBoxChange(isSelected ? null : box)}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all border-2',
                      isSelected
                        ? 'bg-playful-yellow border-playful-yellow text-playful-indigo'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-500'
                    )}
                  >
                    {box}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {(query || selectedTags.length > 0 || selectedBox !== null) && (
          <button
            onClick={onResetFilters}
            className="w-full mt-3 py-2 text-[9px] font-black uppercase tracking-widest text-playful-red bg-playful-red/5 hover:bg-playful-red/10 rounded-xl transition-all border border-dashed border-playful-red/20"
          >
            {t('resetFilters')}
          </button>
        )}
      </Card>
    </motion.div>
  );
}
