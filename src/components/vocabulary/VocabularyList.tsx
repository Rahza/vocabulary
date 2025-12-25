"use client";

import React from "react";
import { VocabularyPair } from "@/models/types";
import { WordActions } from "./WordActions";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { itemReveal } from "@/lib/animations";
import { SelectionToggle } from "@/components/ui/SelectionToggle";


interface VocabularyListProps {
  items: VocabularyPair[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onRefresh: () => void;
  onOpenDetail: (item: VocabularyPair) => void;
}

export function VocabularyList({
  items,
  selectedIds,
  onToggleSelect,
  onRefresh,
  onOpenDetail,
}: VocabularyListProps) {
  if (items.length === 0) {
    return (
      <motion.div
        variants={itemReveal}
        className="flex flex-col items-center justify-center py-20 text-center space-y-4"
      >
        <div className="text-6xl">🔍</div>
        <h3 className="text-xl font-black">Keine Vokabeln gefunden</h3>
        <p className="text-zinc-400 font-bold max-w-xs">
          Versuche es mit einem anderen Suchbegriff oder ändere die Filter.
        </p>
      </motion.div>
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
              onClick={() => onOpenDetail(item)}
              className={cn(
                "group p-3 border-2 rounded-[24px] bg-white dark:bg-zinc-900 transition-all relative cursor-pointer active:scale-[0.98]",
                isSelected
                  ? "border-playful-indigo shadow-lg shadow-playful-indigo/10 ring-4 ring-playful-indigo/5"
                  : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700"
              )}
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
                        {item.german}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-700 font-bold">|</span>
                      <span className="text-lg font-black text-playful-green truncate">
                        {item.czech}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-full"
                        >
                          #{tag}
                        </span>
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
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
