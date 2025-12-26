"use client";

import React, { useState } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { Flashcard } from "@/components/trainer/Flashcard";
import { SessionSummary } from "@/components/practice/SessionSummary";
import { VocabularyPair } from "@/models/types";
import { smartShuffle } from "@/lib/shuffle";
import { getLevenshteinDistance } from "@/lib/string";
import { motion, AnimatePresence } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";
import { Heading } from "@/components/ui/Heading";
import { PracticeMode } from "@/models/types";
import { MatchingGame } from "@/components/practice/MatchingGame";
import { ModeSelector } from "@/components/practice/ModeSelector";
import { PracticeConfig } from "@/components/practice/PracticeConfig";
import { useTranslations } from "next-intl";
import { LanguageDirection, DIRECTION_FORWARD, DIRECTION_BACKWARD } from "@/constants/languages";

interface PracticeItem {
  vocab: VocabularyPair;
  direction: LanguageDirection;
}

export default function PracticePage() {
  const t = useTranslations("practice");
  const [view, setView] = useState<"mode-selection" | "config" | "practice" | "summary">("mode-selection");
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("classic");
  
  const [selectedLength, setSelectedLength] = useState<number>(10);
  const [activeSessionTags, setActiveSessionTags] = useState<string[]>([]);
  const [queue, setQueue] = useState<PracticeItem[]>([]);
  const [matchingVocabulary, setMatchingVocabulary] = useState<VocabularyPair[]>([]);
  
  const [currentItem, setCurrentItem] = useState<PracticeItem | null>(null);
  const [result, setResult] = useState<"correct" | "incorrect" | "typo" | null>(null);
  
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const repository = new LocalStorageRepository();

  const handleModeSelect = (mode: PracticeMode) => {
    setPracticeMode(mode);
    setView("config");
  };

  const handleStartSession = async (tags: string[], length: number) => {
    setActiveSessionTags(tags);
    setSelectedLength(length);
    
    // Pooling logic for all modes
    const allWords: VocabularyPair[] = [];
    for (const tag of tags) {
      const words = await repository.getVocabularyByTag(tag);
      allWords.push(...words);
    }
    
    // Deduplicate
    const uniqueWords = Array.from(new Map(allWords.map(w => [w.id, w])).values());
    
    if (practiceMode === "classic") {
      // Classic Practice logic
      const shuffledWords = uniqueWords.sort(() => 0.5 - Math.random());
      const limited = shuffledWords.slice(0, length);
      
      const items: PracticeItem[] = limited.map(v => ({
        vocab: v,
        direction: Math.random() > 0.5 ? DIRECTION_FORWARD : DIRECTION_BACKWARD
      }));
      
      const shuffledItems = smartShuffle(items, (item) => item.vocab.id);
      
      setQueue(shuffledItems);
      if (shuffledItems.length > 0) {
        setCurrentItem(shuffledItems[0]);
        setView("practice");
        setStartTime(Date.now());
        setScore(0);
        setTotal(shuffledItems.length);
      }
    } else {
      // Connect Pairs
      setMatchingVocabulary(uniqueWords);
      setTotal(length); // length is number of rounds
      setView("practice");
      setStartTime(Date.now());
      setScore(0);
    }
  };

  const handleClassicAnswer = (answer: string) => {
    if (!currentItem) return;

    const targetWord = currentItem.direction === DIRECTION_FORWARD 
      ? currentItem.vocab.target 
      : currentItem.vocab.source;
    
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedTarget = targetWord.trim().toLowerCase();
    
    if (normalizedAnswer === normalizedTarget) {
      setResult("correct");
      setScore(prev => prev + 1);
    } else {
      const distance = getLevenshteinDistance(normalizedAnswer, normalizedTarget);
      if (distance === 1 && normalizedTarget.length > 2) {
        setResult("typo");
      } else {
        setResult("incorrect");
      }
    }
  };


  const handleClassicSkip = () => {
    if (!currentItem) return;
    setResult("incorrect");
  };

  const handleClassicNext = () => {
    setResult(null);
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    
    if (newQueue.length > 0) {
      setCurrentItem(newQueue[0]);
    } else {
      setEndTime(Date.now());
      setView("summary");
    }
  };

  const handleMatchingComplete = (finalScore: number, finalTotal: number) => {
    setScore(finalScore);
    setTotal(finalTotal);
    setEndTime(Date.now());
    setView("summary");
  };

  const handleRestart = () => {
    handleStartSession(activeSessionTags, selectedLength);
  };

  const handleExit = () => {
    setView("mode-selection");
    setActiveSessionTags([]);
  };

  return (
    <motion.div 
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemReveal}>
        <Heading level={1} subtitle={view === "mode-selection" ? t("selectMethod") : t("thematicTraining")}>
          {t("title")}
        </Heading>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {view === "mode-selection" && (
          <motion.div key="mode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ModeSelector onSelect={handleModeSelect} />
          </motion.div>
        )}

        {view === "config" && (
          <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PracticeConfig mode={practiceMode} onStart={handleStartSession} onBack={handleExit} />
          </motion.div>
        )}
        
        {view === "practice" && practiceMode === "classic" && currentItem && (
          <motion.div key="classic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("card")}</span>
                <span className="text-sm font-black text-playful-indigo">{total - queue.length + 1} / {total}</span>
              </div>
              <button
                onClick={handleExit}
                className="text-xs font-black uppercase tracking-widest text-playful-red hover:brightness-110"
              >
                {t("end")}
              </button>
            </div>
            
            <Flashcard
              key={`${currentItem.vocab.id}-${currentItem.direction}`}
              word={currentItem.vocab}
              direction={currentItem.direction}
              onSubmit={handleClassicAnswer}
              onNext={handleClassicNext}
              onSkip={handleClassicSkip}
              result={result}
              correctAnswer={currentItem.direction === DIRECTION_FORWARD ? currentItem.vocab.target : currentItem.vocab.source}
            />
          </motion.div>
        )}

        {view === "practice" && practiceMode === "connect-pairs" && (
          <motion.div key="matching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MatchingGame 
              vocabulary={matchingVocabulary}
              rounds={selectedLength}
              onComplete={handleMatchingComplete}
              onExit={handleExit}
            />
          </motion.div>
        )}

        {view === "summary" && (
          <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SessionSummary
              score={score}
              total={total}
              durationSeconds={(endTime - startTime) / 1000}
              onRestart={handleRestart}
              onExit={handleExit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
