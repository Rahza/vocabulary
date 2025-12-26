'use client';

import React from 'react';
import { VocabularyPair } from '@/models/types';
import { WordActions } from './WordActions';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { itemReveal } from '@/lib/animations';
import { SelectionToggle } from '@/components/ui/SelectionToggle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTranslations } from 'next-intl';

interface VocabularyListProps {
  items: VocabularyPair[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onRefresh: () => void;
  onOpenDetail: (item: VocabularyPair) => void;
  onResetFilters?: () => void;
}

export function VocabularyList({
  items,
  selectedIds,
  onToggleSelect,
  onRefresh,
  onOpenDetail,
  onResetFilters,
}: VocabularyListProps) {
  const t = useTranslations('vocabulary');

  if (items.length === 0) {
    return (
      <EmptyState
        title={t('noVocabFound')}
        description={t('noVocabDesc')}
        icon={Search}
        action={
          onResetFilters
            ? {
                label: t('resetFilters'),
                onClick: onResetFilters,
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      <AnimatePresence mode="popLayout">
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <motion.div
              key={item.id}
              layout
              variants={itemReveal}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card
                onClick={() => onOpenDetail(item)}
                variant={isSelected ? 'playful' : 'default'}
                hoverable
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <SelectionToggle
                      selected={isSelected}
                      onToggle={() => onToggleSelect(item.id)}
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-playful-indigo truncate">
                          {item.source}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700 font-bold">|</span>
                        <span className="text-lg font-black text-playful-green truncate">
                          {item.target}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="default" size="sm">
                            #{tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-[9px] font-black text-zinc-300">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div onClick={(e) => e.stopPropagation()}>
                    <WordActions item={item} onRefresh={onRefresh} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
