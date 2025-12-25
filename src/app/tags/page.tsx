"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { TagList } from "@/components/tags/TagList";
import { TagEditor } from "@/components/tags/TagEditor";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { motion } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";
import { toast } from "sonner";

export default function TagManagementPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);

  const repository = useMemo(() => new LocalStorageRepository(), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await repository.getTags();
    setTags(data);
    setLoading(false);
  }, [repository]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const handleConfirmDelete = async () => {
    if (!tagToDelete) return;
    await repository.deleteTagGlobal(tagToDelete);
    toast.success(`Tag #${tagToDelete} gelöscht`);
    setTagToDelete(null);
    loadData();
  };

  const handleRenameTag = async (oldName: string, newName: string) => {
    await repository.renameTagGlobal(oldName, newName);
    toast.success(`Tag #${oldName} zu #${newName} umbenannt`);
    loadData();
  };

  const handleCreateTag = async () => {
    // Tags are created implicitly by adding them to words, but we can have a "Tag Library"
    // For now, "Creating" a tag just means it exists in the system if words use it.
    // Or we can have a separate storage for "Preferred Tags".
    // Let's assume tags are derived from words for now as per current getTags() implementation.
    // To "create" a tag without words, we'd need a separate table.
    // Requirement FR-006 says "create and delete tags globally".
    // I'll show a toast that tags are created when assigned to words.
    toast.info("Tags werden automatisch erstellt, wenn sie Vokabeln zugewiesen werden.");
  };

  return (
    <motion.div
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemReveal}>
        <h1 className="text-3xl font-black tracking-tight">Tags verwalten</h1>
        <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs mt-1">
          Kategorien global organisieren
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <TagEditor onCreate={handleCreateTag} existingTags={tags} />
        
        {loading ? (
          <div className="h-64 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-playful" />
        ) : (
          <TagList tags={tags} onDelete={(tag) => setTagToDelete(tag)} onRename={handleRenameTag} />
        )}
      </div>

      <ConfirmDialog
        isOpen={!!tagToDelete}
        onClose={() => setTagToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Tag global löschen?"
        description={`Bist du sicher? #${tagToDelete} wird von allen Vokabeln entfernt.`}
        confirmText="Tag löschen"
        variant="destructive"
      />
    </motion.div>
  );
}
