"use client";

import React, { useState } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { TagSelector } from "@/components/practice/TagSelector";
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
import { ConnectPairsConfig } from "@/components/practice/ConnectPairsConfig";

interface PracticeItem {
  vocab: VocabularyPair;
  direction: "DE_TO_CZ" | "CZ_TO_DE";
}

export default function PracticePage() {
  const [view, setView] = useState<"mode-selection" | "config" | "practice" | "summary">("mode-selection");
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("classic");
  
  const [selectedTag, setSelectedTag] = useState("");
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

  const handleConfigSelect = async (tag: string, length: number) => {
    setSelectedTag(tag);
    setSelectedLength(length);
    const words = await repository.getVocabularyByTag(tag);
    
    // Classic Practice logic
    // Shuffle all first
    const shuffledWords = words.sort(() => 0.5 - Math.random());
    // Limit based on selected length
    const limited = shuffledWords.slice(0, length);
    
    const items: PracticeItem[] = limited.map(v => ({
      vocab: v,
      direction: Math.random() > 0.5 ? "DE_TO_CZ" : "CZ_TO_DE"
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
  };

  const handleMatchingStart = async (tags: string[], rounds: number) => {
    setActiveSessionTags(tags);
    // Collect vocabulary from all tags
    const allWords: VocabularyPair[] = [];
    for (const tag of tags) {
      const words = await repository.getVocabularyByTag(tag);
      allWords.push(...words);
    }
    
    // Deduplicate
    const uniqueWords = Array.from(new Map(allWords.map(w => [w.id, w])).values());
    
    setMatchingVocabulary(uniqueWords);
    setSelectedLength(rounds);
    setView("practice");
    setStartTime(Date.now());
    setScore(0);
    setTotal(rounds);
  };

  const handleClassicAnswer = (answer: string) => {
    if (!currentItem) return;

    const targetWord = currentItem.direction === "DE_TO_CZ" 
      ? currentItem.vocab.czech 
      : currentItem.vocab.german;
    
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
    if (practiceMode === "classic") {
      handleConfigSelect(selectedTag, selectedLength);
    } else {
      handleMatchingStart(activeSessionTags, selectedLength);
    }
  };

  const handleExit = () => {
    setView("mode-selection");
    setSelectedTag("");
  };

  return (
    <motion.div 
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemReveal}>
        <Heading level={1} subtitle={view === "mode-selection" ? "Lernmethode wählen" : "Themen-Training"}>
          Üben
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
            {practiceMode === "classic" ? (
              <TagSelector onSelect={handleConfigSelect} />
            ) : (
              <ConnectPairsConfig onStart={handleMatchingStart} onBack={handleExit} />
            )}
          </motion.div>
        )}
        
        {view === "practice" && practiceMode === "classic" && currentItem && (
          <motion.div key="classic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Karte</span>
              <span className="text-xs font-black uppercase tracking-widest text-playful-indigo">{total - queue.length + 1} / {total}</span>
            </div>
            
            <Flashcard
              key={`${currentItem.vocab.id}-${currentItem.direction}`}
              word={currentItem.vocab}
              direction={currentItem.direction}
              onSubmit={handleClassicAnswer}
              onNext={handleClassicNext}
              onSkip={handleClassicSkip}
              result={result}
              correctAnswer={currentItem.direction === "DE_TO_CZ" ? currentItem.vocab.czech : currentItem.vocab.german}
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
