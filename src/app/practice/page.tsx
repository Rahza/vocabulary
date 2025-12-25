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

interface PracticeItem {
  vocab: VocabularyPair;
  direction: "DE_TO_CZ" | "CZ_TO_DE";
}

export default function PracticePage() {
  const [mode, setMode] = useState<"select" | "practice" | "summary">("select");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedLength, setSelectedLength] = useState<number>(10);
  const [queue, setQueue] = useState<PracticeItem[]>([]);
  const [currentItem, setCurrentItem] = useState<PracticeItem | null>(null);
  const [result, setResult] = useState<"correct" | "incorrect" | "typo" | null>(null);
  
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const repository = new LocalStorageRepository();

  const handleTagSelect = async (tag: string, length: number) => {
    setSelectedTag(tag);
    setSelectedLength(length);
    const words = await repository.getVocabularyByTag(tag);
    
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
      setMode("practice");
      setStartTime(Date.now());
      setScore(0);
      setTotal(shuffledItems.length);
    }
  };

  const handleAnswer = (answer: string) => {
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


  const handleSkip = () => {
    if (!currentItem) return;
    setResult("incorrect");
  };

  const handleNext = () => {
    setResult(null);
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    
    if (newQueue.length > 0) {
      setCurrentItem(newQueue[0]);
    } else {
      setEndTime(Date.now());
      setMode("summary");
    }
  };

  const handleRestart = () => {
    handleTagSelect(selectedTag, selectedLength);
  };

  const handleExit = () => {
    setMode("select");
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
        <h1 className="text-3xl font-black tracking-tight">Üben</h1>
        <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs mt-1">Themen-Training</p>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {mode === "select" && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TagSelector onSelect={handleTagSelect} />
          </motion.div>
        )}
        
        {mode === "practice" && currentItem && (
          <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Karte</span>
              <span className="text-xs font-black uppercase tracking-widest text-playful-indigo">{total - queue.length + 1} / {total}</span>
            </div>
            
            <Flashcard
              key={`${currentItem.vocab.id}-${currentItem.direction}`}
              word={currentItem.vocab}
              direction={currentItem.direction}
              onSubmit={handleAnswer}
              onNext={handleNext}
              onSkip={handleSkip}
              result={result}
              correctAnswer={currentItem.direction === "DE_TO_CZ" ? currentItem.vocab.czech : currentItem.vocab.german}
            />
          </motion.div>
        )}

        {mode === "summary" && (
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
