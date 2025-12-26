'use client';

import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { containerReveal, itemReveal } from '@/lib/animations';
import { Trash2, Palette, Languages } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ThemeSelector } from '@/components/settings/ThemeSelector';
import { LanguageSelector } from '@/components/settings/LanguageSelector';
import { Heading } from '@/components/ui/Heading';
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleConfirmReset = () => {
    localStorage.clear();
    toast.success(t('dataReset'));
    window.location.reload();
  };

  return (
    <motion.div
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemReveal}>
        <Heading level={1} subtitle={t('appPreferences')}>
          {t('title')}
        </Heading>
      </motion.div>

      <motion.section variants={itemReveal} className="space-y-4">
        <Heading level={2} icon={Languages} subtitle="" className="text-playful-indigo ml-1">
          {t('language')}
        </Heading>
        <LanguageSelector />
      </motion.section>

      <motion.section variants={itemReveal} className="space-y-4">
        <Heading level={2} icon={Palette} subtitle="" className="text-playful-indigo ml-1">
          {t('appearance')}
        </Heading>
        <ThemeSelector />
      </motion.section>

      <motion.div
        variants={itemReveal}
        className="pt-10 border-t-2 border-dashed border-zinc-100 dark:border-zinc-800"
      >
        <Heading level={2} icon={Trash2} subtitle="" className="text-playful-red mb-4 ml-1">
          {t('dangerZone')}
        </Heading>
        <Button
          variant="destructive"
          onClick={() => setShowResetConfirm(true)}
          className="w-full h-14 rounded-3xl border-b-4 font-black"
        >
          {t('resetData')}
        </Button>
      </motion.div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleConfirmReset}
        title={t('resetConfirmTitle')}
        description={t('resetConfirmDesc')}
        confirmText={t('resetConfirmButton')}
        variant="destructive"
      />
    </motion.div>
  );
}
