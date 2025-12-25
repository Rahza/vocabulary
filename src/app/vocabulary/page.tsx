"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { VocabularyPair, LeitnerState } from "@/models/types";
import { SearchFilters } from "@/components/vocabulary/SearchFilters";
import { VocabularyList } from "@/components/vocabulary/VocabularyList";
import { BulkActions } from "@/components/vocabulary/BulkActions";
import { Drawer } from "@/components/ui/Drawer";
import { WordDetail } from "@/components/vocabulary/WordDetail";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";
import { toast } from "sonner";
import { Tags } from "lucide-react";
import Link from "next/link";

export interface VocabularyWithProgress extends VocabularyPair {
  maxBox: number;
}

export default function VocabularyManagementPage() {
  const [vocabulary, setVocabulary] = useState<VocabularyWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTagFilter] = useState<string[]>([]);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailItem, setDetailItem] = useState<VocabularyWithProgress | null>(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  const repository = useMemo(() => new LocalStorageRepository(), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const vocab = await repository.getAllVocabulary();
    const leitner = await repository.getAllLeitnerStates();
    
    // Join vocab with progress
    const enriched: VocabularyWithProgress[] = vocab.map(v => {
      const states = leitner.filter((l: LeitnerState) => l.vocabId === v.id);
      const maxBox = states.length > 0 ? Math.max(...states.map((s: LeitnerState) => s.box)) : 1;
      return { ...v, maxBox };
    });

    setVocabulary(enriched);
    setLoading(false);
  }, [repository]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter((v) => {
      const matchesSearch =
        v.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.czech.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => v.tags.includes(tag));

      const matchesBox = selectedBox === null || v.maxBox === selectedBox;

      return matchesSearch && matchesTags && matchesBox;
    });
  }, [vocabulary, searchQuery, selectedTags, selectedBox]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    await repository.bulkDelete(selectedIds);
    toast.success(`${selectedIds.length} Vokabeln gelöscht`);
    setSelectedIds([]);
    loadData();
  };

  const handleBulkAddTag = async (tag: string) => {
    await repository.bulkAddTag(selectedIds, tag);
    toast.success(`Tag #${tag} zu ${selectedIds.length} Vokabeln hinzugefügt`);
    loadData();
  };

  const handleBulkRemoveTag = async (tag: string) => {
    await repository.bulkRemoveTag(selectedIds, tag);
    toast.success(`Tag #${tag} von ${selectedIds.length} Vokabeln entfernt`);
    loadData();
  };

  return (
    <motion.div
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-32"
    >
      <header className="flex justify-between items-start">
        <motion.div variants={itemReveal}>
          <h1 className="text-3xl font-black tracking-tight">Vokabular verwalten</h1>
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs mt-1">
            Deine Sammlung bearbeiten und organisieren
          </p>
        </motion.div>
        <motion.div variants={itemReveal}>
          <Link href="/tags">
            <Button variant="outline" size="sm" className="rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 font-black gap-2">
              <Tags size={16} /> Tags verwalten
            </Button>
          </Link>
        </motion.div>
      </header>

      <SearchFilters
        query={searchQuery}
        onQueryChange={setSearchQuery}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTagFilter}
        selectedBox={selectedBox}
        onBoxChange={setSelectedBox}
        availableTags={Array.from(new Set(vocabulary.flatMap(v => v.tags))).sort()}
      />

      {loading ? (
        <div className="h-64 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-playful" />
      ) : (
        <VocabularyList
          items={filteredVocabulary}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onRefresh={loadData}
          onOpenDetail={(item) => setDetailItem(item as VocabularyWithProgress)}
        />
      )}

      <Drawer
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        title="Vokabel-Details"
      >
        {detailItem && (
          <WordDetail
            item={detailItem}
            onRefresh={loadData}
            onClose={() => setDetailItem(null)}
          />
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={showBulkDeleteConfirm}
        onClose={() => setShowBulkDeleteConfirm(false)}
        onConfirm={handleBulkDelete}
        title="Vokabeln löschen?"
        description={`Bist du sicher? Es werden ${selectedIds.length} Vokabeln unwiderruflich gelöscht.`}
        confirmText="Löschen"
        variant="destructive"
      />

      <AnimatePresence>
        {selectedIds.length > 0 && (
          <BulkActions
            selectedCount={selectedIds.length}
            onDelete={() => setShowBulkDeleteConfirm(true)}
            onAddTag={handleBulkAddTag}
            onRemoveTag={handleBulkRemoveTag}
            availableTags={Array.from(new Set(vocabulary.flatMap(v => v.tags))).sort()}
            onClearSelection={() => setSelectedIds([])}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
