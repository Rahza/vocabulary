"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { LeitnerService } from "@/services/leitner/LeitnerService";
import { Flashcard } from "@/components/trainer/Flashcard";
import { VocabularyPair } from "@/models/types";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import Link from "next/link";
import { smartShuffle } from "@/lib/shuffle";
import { getLevenshteinDistance } from "@/lib/string";
import { motion } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";

interface ReviewItem {
  vocab: VocabularyPair;
  direction: "DE_TO_CZ" | "CZ_TO_DE";
}

export default function TrainerPage() {
  const [queue, setQueue] = useState<ReviewItem[]>([]);
  const [initialCount, setInitialCount] = useState(0);
  const [currentItem, setCurrentItem] = useState<ReviewItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<"correct" | "incorrect" | "typo" | null>(null);
  const [sessionCount, setSessionCount] = useState(0);

  const repository = useMemo(() => new LocalStorageRepository(), []);
  const leitnerService = useMemo(() => new LeitnerService(), []);

  const loadDueItems = useCallback(async () => {
    setLoading(true);
    const due = await repository.getDueReviews(new Date());
    
    const items: ReviewItem[] = due.map(d => ({
      vocab: d.vocab,
      direction: d.direction
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

    const targetWord = currentItem.direction === "DE_TO_CZ" 
      ? currentItem.vocab.czech 
      : currentItem.vocab.german;
    
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedTarget = targetWord.trim().toLowerCase();
    
    if (normalizedAnswer === normalizedTarget) {
      setResult("correct");
      
      const currentState = await repository.getLeitnerState(currentItem.vocab.id, currentItem.direction);
      if (currentState) {
        const newState = leitnerService.processReview(currentState, true);
        await repository.updateLeitnerState(newState);
      }
    } else {
      const distance = getLevenshteinDistance(normalizedAnswer, normalizedTarget);
      
      if (distance === 1 && normalizedTarget.length > 2) {
        setResult("typo");
      } else {
        setResult("incorrect");
        
        const currentState = await repository.getLeitnerState(currentItem.vocab.id, currentItem.direction);
        if (currentState) {
          const newState = leitnerService.processReview(currentState, false);
          await repository.updateLeitnerState(newState);
        }
      }
    }
  };

  const handleSkip = async () => {
    if (!currentItem) return;
    
    setResult("incorrect");

    // Skip counts as incorrect for Leitner progress
    const currentState = await repository.getLeitnerState(currentItem.vocab.id, currentItem.direction);
    if (currentState) {
      const newState = leitnerService.processReview(currentState, false);
      await repository.updateLeitnerState(newState);
    }
  };

  const handleNext = () => {
    setResult(null);
    setSessionCount(prev => prev + 1);
    
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    
    if (newQueue.length > 0) {
      setCurrentItem(newQueue[0]);
    } else {
      setCurrentItem(null);
    }
  };

  if (loading) {
    return <div className="p-12 text-center font-black uppercase tracking-widest text-zinc-400 animate-pulse">Lade Wiederholungen...</div>;
  }

  if (!currentItem) {
    return (
      <motion.div 
        variants={containerReveal}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8"
      >
        <motion.div variants={itemReveal}>
          <h2 className="text-4xl font-black tracking-tight">Fertig! 🎉</h2>
          <p className="text-zinc-400 font-bold mt-2 uppercase tracking-widest text-sm">
            {sessionCount} Wiederholungen abgeschlossen
          </p>
        </motion.div>
        
        <motion.div variants={itemReveal} className="flex gap-4">
          <Link href="/">
            <Button variant="outline" className="h-14 px-8 rounded-3xl border-4 font-black">Dashboard</Button>
          </Link>
          <Link href="/practice">
            <Button variant="playful" className="h-14 px-8 rounded-3xl border-b-4 font-black">Mehr üben</Button>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  const progress = initialCount > 0 ? (sessionCount / initialCount) * 100 : 0;
  const correctAnswer = currentItem.direction === "DE_TO_CZ" 
    ? currentItem.vocab.czech 
    : currentItem.vocab.german;

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-end px-2">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Fortschritt</span>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-playful-indigo">{sessionCount + 1} / {initialCount}</span>
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
