"use client";

import React, { useState, useEffect, useCallback } from "react";
import { VocabularyPair, MatchingItem } from "@/models/types";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/shuffle";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useSettings } from "@/contexts/SettingsContext";
import { LANG_CODE_MAP } from "@/constants/languages";

interface MatchingGameProps {
  vocabulary: VocabularyPair[];
  rounds: number;
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}

export const MatchingGame = ({
  vocabulary,
  rounds,
  onComplete,
  onExit,
}: MatchingGameProps) => {
  const { settings } = useSettings();
  const t = useTranslations("practice");
  const commonT = useTranslations("common");
  const tLang = useTranslations("settings.languages");
  const [currentRound, setCurrentRound] = useState(1);
  const [leftItems, setLeftItems] = useState<MatchingItem[]>([]);
  const [rightItems, setRightItems] = useState<MatchingItem[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<MatchingItem | null>(null);
  const [selectedRight, setSelectedRight] = useState<MatchingItem | null>(null);
  
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [incorrectKeys, setIncorrectKeys] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);

  const startRound = useCallback(() => {
    // Pick 5 random pairs from vocabulary
    const roundPairs = shuffleArray(vocabulary).slice(0, 5);
    
    const left: MatchingItem[] = roundPairs.map(p => ({
      id: p.id,
      text: p.source,
      language: "source"
    }));
    
    const right: MatchingItem[] = roundPairs.map(p => ({
      id: p.id,
      text: p.target,
      language: "target"
    }));
    
    setLeftItems(shuffleArray(left));
    setRightItems(shuffleArray(right));
    setCompletedIds(new Set());
    setIncorrectKeys(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [vocabulary]);

  useEffect(() => {
    startRound();
  }, [startRound]);

  const handleSelect = (item: MatchingItem) => {
    if (completedIds.has(item.id)) return;
    
    if (item.language === "source") {
      setSelectedLeft(item);
    } else {
      setSelectedRight(item);
    }
  };

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft.id === selectedRight.id) {
        // Success
        setCompletedIds(prev => new Set(prev).add(selectedLeft.id));
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Mismatch
        setMistakes(prev => prev + 1);
        const leftKey = `source-${selectedLeft.id}`;
        const rightKey = `target-${selectedRight.id}`;
        setIncorrectKeys(prev => new Set(prev).add(leftKey).add(rightKey));
        
        const timeout = setTimeout(() => {
          setIncorrectKeys(new Set());
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 500);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [selectedLeft, selectedRight]);

  useEffect(() => {
    if (completedIds.size === 5 && leftItems.length > 0) {
      const timeout = setTimeout(() => {
        if (currentRound < rounds) {
          setCurrentRound(prev => prev + 1);
          startRound();
        } else {
          // Calculate score: perfect is rounds * 5 matches. 
          // For simplicity, we just pass rounds as total.
          onComplete(rounds * 5 - mistakes, rounds * 5);
        }
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [completedIds, currentRound, rounds, startRound, onComplete, mistakes, leftItems.length]);

  const renderItem = (item: MatchingItem) => {
    const isSelected = (selectedLeft?.id === item.id && item.language === "source") || 
                       (selectedRight?.id === item.id && item.language === "target");
    const isCompleted = completedIds.has(item.id);
    const itemKey = `${item.language}-${item.id}`;
    const isIncorrect = incorrectKeys.has(itemKey);

    return (
      <motion.div
        key={itemKey}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isCompleted ? 0.5 : 1, 
          scale: 1,
          x: isIncorrect ? [0, -10, 10, -10, 10, 0] : 0
        }}
        transition={{ duration: isIncorrect ? 0.4 : 0.3 }}
      >
        <Card
          onClick={() => handleSelect(item)}
          className={cn(
            "h-20 flex items-center justify-center text-center p-2 transition-all duration-300",
            isSelected && "border-playful-indigo ring-2 ring-playful-indigo/20",
            isIncorrect && "border-playful-red bg-playful-red/5",
            isCompleted && "border-playful-green bg-playful-green/20 pointer-events-none shadow-none"
          )}
        >
          <span className={cn(
            "font-black text-sm break-words",
            isSelected ? "text-playful-indigo" : isCompleted ? "text-playful-green" : "text-zinc-600 dark:text-zinc-300"
          )}>
            {item.text}
          </span>
        </Card>
      </motion.div>
    );
  };

  const sourceLangName = settings.sourceLanguage 
    ? tLang(LANG_CODE_MAP[settings.sourceLanguage] as any)
    : commonT("german");

  const targetLangName = settings.targetLanguage 
    ? tLang(LANG_CODE_MAP[settings.targetLanguage] as any)
    : commonT("czech");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("round")}</span>
          <span className="text-sm font-black text-playful-green">{currentRound} / {rounds}</span>
        </div>
        <button
          onClick={onExit}
          className="text-xs font-black uppercase tracking-widest text-playful-red hover:brightness-110"
        >
          {t("end")}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 text-center mb-4">{sourceLangName}</h4>
          {leftItems.map(renderItem)}
        </div>
        <div className="space-y-3">
          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 text-center mb-4">{targetLangName}</h4>
          {rightItems.map(renderItem)}
        </div>
      </div>
    </div>
  );
};