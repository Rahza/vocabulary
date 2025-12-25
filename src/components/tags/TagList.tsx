"use client";

import React, { useState } from "react";
import { Trash2, Hash, Pencil, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { itemReveal } from "@/lib/animations";
import { Input } from "@/components/ui/Input";

interface TagListProps {
  tags: string[];
  onDelete: (tagName: string) => void;
  onRename: (oldName: string, newName: string) => void;
}

export function TagList({ tags, onDelete, onRename }: TagListProps) {
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  if (tags.length === 0) {
    return (
      <motion.div
        variants={itemReveal}
        className="flex flex-col items-center justify-center py-20 text-center space-y-4"
      >
        <div className="text-6xl">🏷️</div>
        <h3 className="text-xl font-black">Keine Tags vorhanden</h3>
        <p className="text-zinc-400 font-bold max-w-xs">
          Erstelle deinen ersten Tag, um deine Vokabeln zu organisieren.
        </p>
      </motion.div>
    );
  }

  const handleStartEdit = (tag: string) => {
    setEditingTag(tag);
    setNewName(tag);
  };

  const handleCancelEdit = () => {
    setEditingTag(null);
    setNewName("");
  };

  const handleSaveRename = (oldName: string) => {
    if (newName.trim() && newName !== oldName) {
      onRename(oldName, newName.trim());
    }
    setEditingTag(null);
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <AnimatePresence mode="popLayout">
        {tags.map((tag) => (
          <motion.div
            key={tag}
            layout
            variants={itemReveal}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95 }}
            className="group flex items-center justify-between p-3 border-2 border-zinc-100 dark:border-zinc-800 rounded-[20px] bg-white dark:bg-zinc-900 hover:border-playful-indigo/30 transition-all gap-3"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-playful-indigo/10 flex items-center justify-center text-playful-indigo flex-shrink-0">
                <Hash size={20} />
              </div>
              
              {editingTag === tag ? (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="h-10 text-sm py-1 px-2 border-playful-indigo focus-visible:ring-playful-indigo"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveRename(tag);
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                  />
                </div>
              ) : (
                <span className="font-black text-sm uppercase truncate min-w-0">{tag}</span>
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {editingTag === tag ? (
                <>
                  <button
                    onClick={() => handleSaveRename(tag)}
                    className="p-2.5 text-playful-green hover:bg-playful-green/10 rounded-xl transition-all"
                    title="Speichern"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-2.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                    title="Abbrechen"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleStartEdit(tag)}
                    className="p-2.5 text-zinc-400 hover:text-playful-indigo hover:bg-playful-indigo/10 rounded-xl transition-all"
                    title="Tag umbenennen"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(tag)}
                    className="p-2.5 text-zinc-400 hover:text-playful-red hover:bg-playful-red/10 rounded-xl transition-all"
                    title="Tag löschen"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
