'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRepository } from '@/contexts/RepositoryContext';
import { LeitnerService } from '@/services/leitner/LeitnerService';
import { Flashcard } from '@/components/trainer/Flashcard';
import { VocabularyPair } from '@/models/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { smartShuffle } from '@/lib/shuffle';
import { getLevenshteinDistance } from '@/lib/string';
import { EmptyState } from '@/components/ui/EmptyState';
import { PartyPopper, CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { LanguageDirection, DIRECTION_FORWARD } from '@/constants/languages';

interface ReviewItem {
  vocab: VocabularyPair;
  direction: LanguageDirection;
}

export default function TrainerPage() {
  const t = useTranslations('trainer');
  const router = useRouter();
  const [queue, setQueue] = useState<ReviewItem[]>([]);
  const [initialCount, setInitialCount] = useState(0);
  const [currentItem, setCurrentItem] = useState<ReviewItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<'correct' | 'incorrect' | 'typo' | null>(null);
  const [sessionCount, setSessionCount] = useState(0);

  const repository = useRepository();
  const leitnerService = useMemo(() => new LeitnerService(), []);

  const loadDueItems = useCallback(async () => {
    setLoading(true);
    const due = await repository.getDueReviews(new Date());

    const items: ReviewItem[] = due.map((d) => ({
      vocab: d.vocab,
      direction: d.direction,
    }));

    const shuffled = smartShuffle(items, (item) => item.vocab.id);

    setQueue(shuffled);
    setInitialCount(shuffled.length);
    if (shuffled.length > 0) {
      setCurrentItem(shuffled[0]);
    }
    setLoading(false);
  }, [repository]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDueItems();
  }, [loadDueItems]);

  const handleAnswer = async (answer: string) => {
    if (!currentItem) return;

    const targetWord =
      currentItem.direction === DIRECTION_FORWARD
        ? currentItem.vocab.target
        : currentItem.vocab.source;

    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedTarget = targetWord.trim().toLowerCase();

    if (normalizedAnswer === normalizedTarget) {
      setResult('correct');

      const currentState = await repository.getLeitnerState(
        currentItem.vocab.id,
        currentItem.direction
      );
      if (currentState) {
        const newState = leitnerService.processReview(currentState, true);
        await repository.updateLeitnerState(newState);
      }
    } else {
      const distance = getLevenshteinDistance(normalizedAnswer, normalizedTarget);

      if (distance === 1 && normalizedTarget.length > 2) {
        setResult('typo');
      } else {
        setResult('incorrect');

        const currentState = await repository.getLeitnerState(
          currentItem.vocab.id,
          currentItem.direction
        );
        if (currentState) {
          const newState = leitnerService.processReview(currentState, false);
          await repository.updateLeitnerState(newState);
        }
      }
    }
  };

  const handleSkip = async () => {
    if (!currentItem) return;

    setResult('incorrect');

    // Skip counts as incorrect for Leitner progress
    const currentState = await repository.getLeitnerState(
      currentItem.vocab.id,
      currentItem.direction
    );
    if (currentState) {
      const newState = leitnerService.processReview(currentState, false);
      await repository.updateLeitnerState(newState);
    }
  };

  const handleNext = () => {
    setResult(null);
    setSessionCount((prev) => prev + 1);

    const newQueue = queue.slice(1);
    setQueue(newQueue);

    if (newQueue.length > 0) {
      setCurrentItem(newQueue[0]);
    } else {
      setCurrentItem(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center font-black uppercase tracking-widest text-zinc-400 animate-pulse">
        {t('loading')}
      </div>
    );
  }

  if (!currentItem) {
    if (sessionCount > 0) {
      return (
        <EmptyState
          title={t('allDone')}
          description={t('allDoneDesc', { count: sessionCount })}
          icon={PartyPopper}
          action={{
            label: t('toDashboard'),
            onClick: () => router.push('/'),
          }}
        />
      );
    }

    return (
      <EmptyState
        title={t('noDue')}
        description={t('noDueDesc')}
        icon={CalendarClock}
        action={{
          label: t('generateNew'),
          onClick: () => router.push('/generate'),
        }}
      />
    );
  }

  const progress = initialCount > 0 ? (sessionCount / initialCount) * 100 : 0;
  const correctAnswer =
    currentItem.direction === DIRECTION_FORWARD
      ? currentItem.vocab.target
      : currentItem.vocab.source;

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-end px-2">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
            {t('progress')}
          </span>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-playful-indigo">
            {sessionCount + 1} / {initialCount}
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <Flashcard
        key={`${currentItem.vocab.id}-${currentItem.direction}`}
        word={currentItem.vocab}
        direction={currentItem.direction}
        onSubmit={handleAnswer}
        onNext={handleNext}
        onSkip={handleSkip}
        result={result}
        correctAnswer={correctAnswer}
        hideAids={true}
      />
    </div>
  );
}
