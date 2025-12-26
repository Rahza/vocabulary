"use client";

import React, { useState } from "react";
import { VocabularyPair } from "@/models/types";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { Button } from "@/components/ui/Button";
import {
  RotateCcw,
  Trash2,
  MoreVertical,
  Tag,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useTranslations } from "next-intl";

interface WordActionsProps {
  item: VocabularyPair;
  onRefresh: () => void;
}

export function WordActions({ item, onRefresh }: WordActionsProps) {
  const t = useTranslations("vocabulary");
  const commonT = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const repository = new LocalStorageRepository();

  const handleReset = async () => {
    await repository.resetProgress(item.id);
    toast.success(t("resetSuccess"));
    setIsOpen(false);
    onRefresh();
  };

  const handleDelete = async () => {
    await repository.deleteVocabulary(item.id);
    toast.success(t("deleteWordSuccess"));
    onRefresh();
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    
    if (item.tags.includes(newTag.trim())) {
      toast.error(t("tagExists"));
      return;
    }

    const updatedTags = [...item.tags, newTag.trim()];
    await repository.updateVocabulary(item.id, { tags: updatedTags });
    setNewTag("");
    onRefresh();
  };

  const handleRemoveTag = async (tagToRemove: string) => {
    const updatedTags = item.tags.filter((t) => t !== tagToRemove);
    await repository.updateVocabulary(item.id, { tags: updatedTags });
    onRefresh();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsEditingTags(!isEditingTags)}
          className={cn(
            "p-2 rounded-xl transition-all",
            isEditingTags
              ? "bg-playful-indigo text-white shadow-lg"
              : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          )}
          title={t("edit")}
        >
          <Tag size={18} />
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-playful-yellow/10 hover:text-playful-yellow transition-all"
          >
            <RotateCcw size={16} /> {t("resetProgress")}
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-playful-red hover:bg-playful-red/10 transition-all border-t-2 border-zinc-50 dark:border-zinc-800"
          >
            <Trash2 size={16} /> {commonT("delete")}
          </button>
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title={t("deleteWord")}
        description={t("deleteWordDesc", { word: item.german })}
        confirmText={commonT("delete")}
        variant="destructive"
      />

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title={t("resetProgress")}
        description={t("resetProgressDesc")}
        confirmText={commonT("reset")}
        variant="playful"
      />

      {isEditingTags && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-2xl z-10 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
              {t("edit")}
            </h4>
            <button onClick={() => setIsEditingTags(false)} className="text-zinc-400 hover:text-zinc-600">
              <X size={14} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 pl-3 pr-1 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-full group"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="p-1 hover:text-playful-red transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={handleAddTag} className="flex gap-2">
            <Input
              placeholder={t("newTagPlaceholder")}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="h-10 text-xs rounded-xl"
            />
            <Button type="submit" size="sm" className="h-10 w-10 p-0 rounded-xl bg-playful-indigo">
              <Plus size={18} />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}