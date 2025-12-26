'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useEnterKey } from '@/hooks/use-enter-key';
import { Trophy, Clock, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerReveal, itemReveal } from '@/lib/animations';
import { useTranslations } from 'next-intl';

interface SessionSummaryProps {
  score: number;
  total: number;
  durationSeconds: number;
  onRestart: () => void;
  onExit: () => void;
}

export function SessionSummary({
  score,
  total,
  durationSeconds,
  onRestart,
  onExit,
}: SessionSummaryProps) {
  const t = useTranslations('practice');
  const percentage = Math.round((score / total) * 100) || 0;
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);

  // Keyboard navigation
  useEnterKey(onRestart);

  return (
    <motion.div
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center space-y-10 py-12 text-center"
    >
      <motion.div variants={itemReveal} className="relative">
        <PartyPopper className="w-16 h-16 text-playful-yellow absolute -top-12 -left-12 -rotate-12 animate-bounce" />
        <h2 className="text-4xl font-black tracking-tight">{t('summaryTitle')}</h2>
        <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm mt-2">
          {t('sessionEnded')}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
        <motion.div
          variants={itemReveal}
          className="flex flex-col items-center p-6 bg-playful-yellow/10 rounded-[40px] border-4 border-playful-yellow shadow-xl shadow-playful-yellow/10"
        >
          <Trophy className="w-10 h-10 text-playful-yellow mb-2" />
          <span className="text-3xl font-black text-playful-yellow">{percentage}%</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-1">
            {t('accuracy')}
          </span>
        </motion.div>

        <motion.div
          variants={itemReveal}
          className="flex flex-col items-center p-6 bg-playful-indigo/10 rounded-[40px] border-4 border-playful-indigo shadow-xl shadow-playful-indigo/10"
        >
          <Clock className="w-10 h-10 text-playful-indigo mb-2" />
          <span className="text-3xl font-black text-playful-indigo">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-1">
            {t('duration')}
          </span>
        </motion.div>
      </div>

      <motion.div variants={itemReveal} className="text-zinc-500 font-bold italic">
        {t('summaryDesc', { score, total })}
      </motion.div>

      <motion.div variants={itemReveal} className="flex w-full gap-4 max-w-sm">
        <Button
          variant="outline"
          onClick={onExit}
          className="flex-1 h-16 rounded-3xl border-4 text-lg"
        >
          {t('end')}
        </Button>
        <Button
          onClick={onRestart}
          variant="playful"
          className="flex-1 h-16 rounded-3xl border-b-4 text-lg"
        >
          {t('playAgain')}
        </Button>
      </motion.div>
    </motion.div>
  );
}
