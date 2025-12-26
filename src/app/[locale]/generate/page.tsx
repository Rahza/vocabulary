'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { GeneratorForm } from '@/components/generator/GeneratorForm';
import { GeneratedList } from '@/components/generator/GeneratedList';
import { OpenAIService } from '@/services/ai/OpenAIService';
import { useRepository } from '@/contexts/RepositoryContext';
import { useSettings } from '@/contexts/SettingsContext';
import { VocabularyPair } from '@/models/types';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { containerReveal, itemReveal } from '@/lib/animations';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useTranslations } from 'next-intl';

export default function GeneratePage() {
  const t = useTranslations('generator');
  const { settings } = useSettings();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<Omit<VocabularyPair, 'id' | 'createdAt'>[]>([]);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [view, setView] = useState<'form' | 'results'>('form');

  const aiService = useMemo(() => new OpenAIService(), []);
  const repository = useRepository();

  const handleGenerate = async (theme: string, difficulty: string, count: number) => {
    setIsLoading(true);
    setGenerated([]);

    try {
      const allVocab = await repository.getAllVocabulary();
      const existingTerms = allVocab.map((v) => v.source);

      const newWords = await aiService.generateVocabulary(
        theme,
        difficulty,
        count,
        settings.openaiApiKey || '',
        settings.sourceLanguage || 'German',
        settings.targetLanguage || 'Czech',
        existingTerms
      );

      if (newWords.length === 0) {
        toast.error(t('noNewWords'));
      } else {
        setGenerated(newWords);
        setView('results');
        toast.success(t('generating', { count: newWords.length }));
      }
    } catch (e) {
      console.error(e);
      setError(t('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    await repository.addVocabulary(generated);
    toast.success(t('saveSuccess'));
    router.push('/vocabulary');
  };

  const handleConfirmDiscard = () => {
    setView('form');
    // Clear data only after exit animation completes
    setTimeout(() => setGenerated([]), 400);
    toast.info(t('discarded'));
  };

  const handleDelete = (index: number) => {
    const newGenerated = [...generated];
    newGenerated.splice(index, 1);

    if (newGenerated.length === 0) {
      setView('form');
      // Clear data after animation completes
      setTimeout(() => setGenerated([]), 400);
    } else {
      setGenerated(newGenerated);
    }
  };

  if (!settings.openaiApiKey) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
        <div className="text-6xl">🔑</div>
        <p className="text-zinc-400 font-bold max-w-[200px]">{t('noApiKey')}</p>
        <Link href="/settings">
          <Button variant="playful" className="h-14 px-8 rounded-3xl border-b-4 font-black">
            {t('openSettings')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div variants={containerReveal} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemReveal}>
        <h1 className="text-3xl font-black tracking-tight">{t('title')}</h1>
        <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs mt-1">
          {t('subtitle')}
        </p>
      </motion.div>

      {error && (
        <motion.div
          variants={itemReveal}
          className="p-4 bg-playful-red/10 text-playful-red font-bold rounded-2xl border-2 border-playful-red/20 text-sm"
        >
          ⚠️ {error}
        </motion.div>
      )}

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          {view === 'form' ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="results-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GeneratedList
                items={generated}
                onSave={handleSave}
                onDiscard={() => setShowDiscardConfirm(true)}
                onDelete={handleDelete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        isOpen={showDiscardConfirm}
        onClose={() => setShowDiscardConfirm(false)}
        onConfirm={handleConfirmDiscard}
        title={t('discardConfirm')}
        description={t('discardDesc')}
        confirmText={t('discardAction')}
        variant="destructive"
      />
    </motion.div>
  );
}
