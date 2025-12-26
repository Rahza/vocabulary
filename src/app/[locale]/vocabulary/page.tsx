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
import { Link } from "@/i18n/routing";
import { Heading } from "@/components/ui/Heading";
import { useTranslations } from "next-intl";

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

  const t = useTranslations("vocabulary");
  const navT = useTranslations("navigation");
  const commonT = useTranslations("common");
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
    toast.success(t("deleteSuccess", { count: selectedIds.length }));
    setSelectedIds([]);
    loadData();
  };

  const handleBulkAddTag = async (tag: string) => {
    await repository.bulkAddTag(selectedIds, tag);
    toast.success(t("addTagSuccess", { tag, count: selectedIds.length }));
    loadData();
  };

  const handleBulkRemoveTag = async (tag: string) => {
    await repository.bulkRemoveTag(selectedIds, tag);
    toast.success(t("removeTagSuccess", { tag, count: selectedIds.length }));
    loadData();
  };

  return (
    <motion.div
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-32"
    >
      <header className="flex justify-between items-start">
        <motion.div variants={itemReveal}>
          <Heading 
            level={1} 
            subtitle={t("subtitle", { count: vocabulary.length })}
          >
            {t("title")}
          </Heading>
        </motion.div>
        <motion.div variants={itemReveal}>
          <Link href="/tags">
            <Button variant="outline" size="sm" className="rounded-xl border-2 font-black gap-2 h-10 px-4 mt-1">
              <Tags size={16} /> {navT("vocabulary")} Tags
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
        onResetFilters={() => {
          setSearchQuery("");
          setSelectedTagFilter([]);
          setSelectedBox(null);
        }}
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
          onResetFilters={() => {
            setSearchQuery("");
            setSelectedTagFilter([]);
            setSelectedBox(null);
          }}
        />
      )}

      <Drawer
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        title={t("detailTitle")}
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
        title={t("deleteTitle")}
        description={t("deleteDesc", { count: selectedIds.length })}
        confirmText={commonT("delete")}
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