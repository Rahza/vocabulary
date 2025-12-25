import React from "react";
import { VocabularyPair } from "@/models/types";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";

interface GeneratedListProps {
  items: Omit<VocabularyPair, "id" | "createdAt">[];
  onSave: () => void;
  onDiscard: () => void;
  onDelete: (index: number) => void;
}

export function GeneratedList({ items, onSave, onDiscard, onDelete }: GeneratedListProps) {
  if (items.length === 0) return null;

  return (
    <motion.div 
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xl font-black">Erfolg! ({items.length})</h3>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div 
              key={`${item.german}-${index}`}
              layout
              variants={itemReveal}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="p-5 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none relative group"
            >
              <button 
                onClick={() => onDelete(index)}
                className="absolute -top-3 -right-3 p-2 bg-playful-red text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg scale-75 hover:scale-90"
                title="Löschen"
              >
                <Trash2 size={16} />
              </button>

              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-black text-playful-indigo">{item.german}</span>
                <div className="h-0.5 flex-1 mx-4 bg-zinc-100 dark:bg-zinc-800" />
                <span className="text-xl font-black text-playful-green">{item.czech}</span>
              </div>
              
              {item.mnemonic && (
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border-2 border-zinc-50 dark:border-zinc-800 mb-3">
                  <p className="text-sm text-zinc-500 font-bold italic">💡 {item.mnemonic}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 sticky bottom-24 bg-gray-50/80 dark:bg-zinc-950/80 backdrop-blur-md p-2 rounded-[32px]">
        <Button variant="outline" onClick={onDiscard} className="flex-1 h-16 rounded-3xl border-4 font-black">
          Verwerfen
        </Button>
        <Button onClick={onSave} variant="playful" className="flex-1 h-16 rounded-3xl border-b-4 font-black">
          Behalten!
        </Button>
      </div>
    </motion.div>
  );
}