"use client";

import React, { useState } from "react";
import { Trash2, Hash, Pencil, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { itemReveal } from "@/lib/animations";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tags } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useTranslations } from "next-intl";

interface TagListProps {
  tags: string[];
  onDelete: (tagName: string) => void;
  onRename: (oldName: string, newName: string) => void;
}

export function TagList({ tags, onDelete, onRename }: TagListProps) {
  const t = useTranslations("tags");
  const commonT = useTranslations("common");
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  if (tags.length === 0) {
    return (
      <EmptyState
        title={t("noTags")}
        description={t("noTagsDesc")}
        icon={Tags}
      />
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
                <Badge variant="indigo" className="px-3 py-1.5 text-xs">
                  #{tag}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {editingTag === tag ? (
                <>
                  <button
                    onClick={() => handleSaveRename(tag)}
                    className="p-2.5 text-playful-green hover:bg-playful-green/10 rounded-xl transition-all"
                    title={commonT("save")}
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-2.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                    title={commonT("cancel")}
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleStartEdit(tag)}
                    className="p-2.5 text-zinc-400 hover:text-playful-indigo hover:bg-playful-indigo/10 rounded-xl transition-all"
                    title={commonT("edit")}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(tag)}
                    className="p-2.5 text-zinc-400 hover:text-playful-red hover:bg-playful-red/10 rounded-xl transition-all"
                    title={commonT("delete")}
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