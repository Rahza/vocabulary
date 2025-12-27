'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRepository } from '@/contexts/RepositoryContext';
import { TagList } from '@/components/tags/TagList';
import { TagEditor } from '@/components/tags/TagEditor';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { motion } from 'framer-motion';
import { containerReveal, itemReveal } from '@/lib/animations';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTranslations } from 'next-intl';

export default function TagManagementPage() {
  const t = useTranslations('tags');
  const commonT = useTranslations('common');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);

  const repository = useRepository();

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await repository.getTags();
    setTags(data);
    setLoading(false);
  }, [repository]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleConfirmDelete = async () => {
    if (!tagToDelete) return;
    await repository.deleteTagGlobal(tagToDelete);
    toast.success(t('deleteSuccess', { tag: tagToDelete }));
    setTagToDelete(null);
    loadData();
  };

  const handleRenameTag = async (oldName: string, newName: string) => {
    await repository.renameTagGlobal(oldName, newName);
    toast.success(t('renameSuccess', { oldName, newName }));
    loadData();
  };

  const handleCreateTag = async () => {
    toast.info(t('info'));
  };

  return (
    <motion.div variants={containerReveal} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemReveal}>
        <h1 className="text-3xl font-black tracking-tight">{t('title')}</h1>
        <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs mt-1">
          {t('subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <TagEditor onCreate={handleCreateTag} existingTags={tags} />

        {loading ? (
          <Skeleton variant="card" />
        ) : (
          <TagList tags={tags} onDelete={(tag) => setTagToDelete(tag)} onRename={handleRenameTag} />
        )}
      </div>

      <ConfirmDialog
        isOpen={!!tagToDelete}
        onClose={() => setTagToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={t('deleteTitle')}
        description={t('deleteDesc', { tag: tagToDelete ?? '' })}
        confirmText={commonT('delete')}
        variant="destructive"
      />
    </motion.div>
  );
}
