"use client";

import React, { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  availableTags: string[];
  onClearSelection: () => void;
}

export function BulkActions({
  selectedCount,
  onDelete,
  onAddTag,
  onRemoveTag,
  availableTags,
  onClearSelection,
}: BulkActionsProps) {
  const [showAddTags, setShowAddTags] = useState(false);
  const [showRemoveTags, setShowRemoveTags] = useState(false);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-40"
    >
      <div className="bg-white dark:bg-zinc-900 border-4 border-playful-indigo rounded-[40px] shadow-2xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="bg-playful-indigo text-white px-4 py-1 rounded-2xl font-black text-sm">
              {selectedCount}
            </div>
            <span className="font-black text-sm uppercase tracking-widest text-zinc-500">
              Ausgewählt
            </span>
          </div>
          
          <button
            onClick={onClearSelection}
            className="text-xs font-bold text-zinc-400 hover:text-playful-red transition-colors"
          >
            Auswahl aufheben
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setShowAddTags(!showAddTags);
              setShowRemoveTags(false);
            }}
            className={cn(
              "h-14 rounded-2xl border-2 font-black flex items-center justify-center gap-2 transition-all text-xs",
              showAddTags ? "bg-playful-indigo border-playful-indigo text-white" : "border-zinc-100 dark:border-zinc-800"
            )}
          >
            <Plus size={16} /> Tag +
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setShowRemoveTags(!showRemoveTags);
              setShowAddTags(false);
            }}
            className={cn(
              "h-14 rounded-2xl border-2 font-black flex items-center justify-center gap-2 transition-all text-xs",
              showRemoveTags ? "bg-playful-indigo border-playful-indigo text-white" : "border-zinc-100 dark:border-zinc-800"
            )}
          >
            <X size={16} /> Tag -
          </Button>
          
          <Button
            onClick={onDelete}
            className="h-14 rounded-2xl bg-playful-red hover:bg-rose-600 text-white font-black flex items-center justify-center gap-2 border-b-4 border-rose-800 text-xs"
          >
            <Trash2 size={16} /> Löschen
          </Button>
        </div>

        <AnimatePresence>
          {(showAddTags || showRemoveTags) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 border-t-2 border-dashed border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 text-center">
                  {showAddTags ? "Tag zu Auswahl hinzufügen" : "Tag von Auswahl entfernen"}
                </p>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (showAddTags) onAddTag(tag);
                        else onRemoveTag(tag);
                        setShowAddTags(false);
                        setShowRemoveTags(false);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-all",
                        showAddTags 
                          ? "bg-playful-indigo/10 text-playful-indigo hover:bg-playful-indigo hover:text-white"
                          : "bg-playful-red/10 text-playful-red hover:bg-playful-red hover:text-white"
                      )}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
