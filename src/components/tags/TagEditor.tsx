'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Tags } from 'lucide-react';
import { motion } from 'framer-motion';
import { itemReveal } from '@/lib/animations';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface TagEditorProps {
  onCreate: (tagName: string) => void;
  existingTags: string[];
}

export function TagEditor({ onCreate, existingTags }: TagEditorProps) {
  const t = useTranslations('tags.editor');
  const commonT = useTranslations('vocabulary');
  const [tagName, setTagName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;

    if (existingTags.some((t) => t.toLowerCase() === tagName.trim().toLowerCase())) {
      toast.error(commonT('tagExists'));
      return;
    }

    onCreate(tagName.trim());
    setTagName('');
  };

  return (
    <motion.div
      variants={itemReveal}
      className="bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 p-6 rounded-[32px] shadow-xl shadow-zinc-200/50 dark:shadow-none"
    >
      <div className="flex items-center gap-2 text-playful-indigo mb-4 ml-1">
        <Tags size={20} />
        <h2 className="text-sm font-black uppercase tracking-widest">{t('title')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          placeholder={t('placeholder')}
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="h-14 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus-visible:ring-playful-indigo"
        />
        <Button
          type="submit"
          disabled={!tagName.trim()}
          className="h-14 px-8 rounded-2xl bg-playful-indigo border-b-4 border-indigo-800 font-black"
        >
          <Plus className="mr-2" size={20} /> {t('create')}
        </Button>
      </form>
    </motion.div>
  );
}
