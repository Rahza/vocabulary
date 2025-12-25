"use client";

import React, { useState, useEffect, useRef } from "react";
import { VocabularyPair } from "@/models/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { VirtualKeyboard } from "@/components/keyboard/VirtualKeyboard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { slideTransition, juicyCorrect, juicyIncorrect } from "@/lib/animations";
import { Lightbulb, Eye, EyeOff, FastForward } from "lucide-react";
import { useEnterKey } from "@/hooks/use-enter-key";
import { Card } from "@/components/ui/Card";

interface FlashcardProps {
  word: VocabularyPair;
  direction: "DE_TO_CZ" | "CZ_TO_DE";
  onSubmit: (answer: string) => void;
  onNext: () => void;
  onSkip?: () => void;
  result: "correct" | "incorrect" | "typo" | null;
  correctAnswer?: string;
  hideAids?: boolean; // New prop
}

export function Flashcard({
  word,
  direction,
  onSubmit,
  onNext,
  onSkip,
  result,
  correctAnswer,
  hideAids = false // Default to false
}: FlashcardProps) {
  const [answer, setAnswer] = useState("");
  const [showMnemonic, setShowMnemonic] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const targetWord = direction === "DE_TO_CZ" ? word.czech : word.german;

  // Keyboard navigation
  useEnterKey(() => {
    if (result === null || result === "typo") {
      onSubmit(answer);
    } else {
      onNext();
    }
  });

  useEffect(() => {

    if (result === null) {

      inputRef.current?.focus();

    }

  }, [result]);



  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (result === null || result === "typo") {

      onSubmit(answer);

    } else {

      onNext();

    }

  };



  const handleKeyPress = (char: string) => {

    setAnswer((prev) => prev + char);

    inputRef.current?.focus();

  };



  const handleTip = () => {

    if (result === "correct" || result === "incorrect" || hideAids) return;

    const nextCharIndex = answer.length;

    if (nextCharIndex < targetWord.length) {

      setAnswer(prev => prev + targetWord[nextCharIndex]);

      inputRef.current?.focus();

    }

  };



  const handleSkip = () => {

    if (onSkip) onSkip();

  };



  const questionWord = direction === "DE_TO_CZ" ? word.german : word.czech;

  const questionLabel = direction === "DE_TO_CZ" ? "Deutsch" : "Česky";

  const answerLabel = direction === "DE_TO_CZ" ? "Česky" : "Deutsch";



  return (

    <div className="flex flex-col space-y-8 max-w-sm mx-auto">

      <AnimatePresence mode="wait">

        <motion.div

          key={word.id + direction}

          variants={slideTransition}

          initial="initial"

          animate="animate"

          exit="exit"

          transition={{ type: "spring", stiffness: 200, damping: 25 }}

        >

          <Card

            className={cn(

              "p-10 border-4 rounded-[40px] text-center space-y-3 min-h-[180px] flex flex-col justify-center transition-colors duration-500 relative",

              result === "correct" 

                ? "bg-playful-green/10 border-playful-green shadow-xl shadow-playful-green/20" 

                : result === "incorrect"

                ? "bg-playful-red/10 border-playful-red shadow-xl shadow-playful-red/20"

                : result === "typo"

                ? "bg-playful-yellow/10 border-playful-yellow shadow-xl shadow-playful-yellow/20"

                : ""

            )}

          >

            {/* Mnemonic Toggle */}

            {word.mnemonic && (result === null || result === "typo") && !hideAids && (

              <button

                onClick={() => setShowMnemonic(!showMnemonic)}

                className="absolute top-4 right-4 text-zinc-400 hover:text-playful-indigo transition-colors"

                title="Mnemonic anzeigen"

              >

                {showMnemonic ? <EyeOff size={20} /> : <Eye size={20} />}

              </button>

            )}



            <span className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">{questionLabel}</span>

            <motion.h2 

              animate={(result === "correct" ? juicyCorrect.animate : result === "incorrect" ? juicyIncorrect.animate : {}) as TargetAndTransition}

              className="text-4xl font-black tracking-tight"

            >

              {questionWord}

            </motion.h2>

            

            <AnimatePresence>

              {(showMnemonic || (result !== null && result !== "typo" && word.mnemonic && !hideAids)) && (

                <motion.div

                  initial={{ opacity: 0, height: 0 }}

                  animate={{ opacity: 1, height: "auto" }}

                  exit={{ opacity: 0, height: 0 }}

                  className="pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-700 mt-4 overflow-hidden"

                >

                  <p className="text-sm text-zinc-500 font-bold italic">

                    💡 {word.mnemonic}

                  </p>

                </motion.div>

              )}

            </AnimatePresence>

          </Card>

        </motion.div>

      </AnimatePresence>



      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="space-y-3">

          <div className="flex justify-between items-center ml-2 mr-2">

            <label className="text-sm font-black uppercase tracking-widest text-zinc-400">

              {answerLabel}

            </label>

            {(result === null || result === "typo") && (

              <div className="flex gap-2">

                 {!hideAids && (

                   <button

                    type="button"

                    onClick={handleTip}

                    className="text-xs font-bold uppercase tracking-widest text-playful-yellow hover:text-yellow-500 flex items-center gap-1"

                    title="Buchstaben aufdecken"

                  >

                    <Lightbulb size={14} /> Tipp

                  </button>

                 )}

                 <button

                  type="button"

                  onClick={handleSkip}

                  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-playful-red flex items-center gap-1"

                  title="Lösung zeigen"

                >

                  <FastForward size={14} /> Skip

                </button>

              </div>

            )}

          </div>

          <div className="relative">

            <Input

              ref={inputRef}

              value={answer}

              onChange={(e) => setAnswer(e.target.value)}

              disabled={result !== null && result !== "typo"}

              placeholder="Start typing..."

              className={cn(

                "text-2xl h-16 rounded-3xl border-4 text-center font-bold transition-all duration-300",

                result === "correct" 

                  ? "border-playful-green bg-playful-green text-white" 

                  : result === "incorrect" 

                  ? "border-playful-red bg-playful-red text-white"

                  : result === "typo"

                  ? "border-playful-yellow bg-playful-yellow/10 text-playful-indigo"

                  : "border-zinc-100 dark:border-zinc-800 focus-visible:border-playful-indigo"

              )}

              autoCapitalize="off"

              autoComplete="off"

            />

          </div>

        </div>



        <AnimatePresence>

          {result === "incorrect" && (

            <motion.div

              initial={{ opacity: 0, scale: 0.9 }}

              animate={{ opacity: 1, scale: 1 }}

              exit={{ opacity: 0, scale: 0.9 }}

              className="p-5 bg-white dark:bg-zinc-900 border-4 border-playful-red rounded-[30px] text-center shadow-lg"

            >

              <p className="text-xs font-black text-playful-red uppercase tracking-widest mb-1">Correct was:</p>

              <p className="text-2xl font-black">{correctAnswer}</p>

            </motion.div>

          )}

          {result === "typo" && (

            <motion.div

              initial={{ opacity: 0, scale: 0.9 }}

              animate={{ opacity: 1, scale: 1 }}

              exit={{ opacity: 0, scale: 0.9 }}

              className="p-4 bg-playful-yellow/20 border-2 border-playful-yellow rounded-2xl text-center"

            >

              <p className="text-sm font-black text-playful-indigo uppercase tracking-widest">Fast richtig! Prüf mal die Schreibweise.</p>

            </motion.div>

          )}

        </AnimatePresence>



        <div className="space-y-6">

          {(result === null || result === "typo") && (

            <VirtualKeyboard onKeyPress={handleKeyPress} className="animate-in fade-in zoom-in duration-300" />

          )}



          <Button 

            type="submit" 

            variant="playful"

            className={cn(

              "w-full h-16 text-xl rounded-3xl border-b-4 transition-all duration-300",

              result === "correct" 

                ? "bg-playful-green border-emerald-700 shadow-playful-green/30" 

                : result === "incorrect" 

                ? "bg-playful-red border-rose-700 shadow-playful-red/30" 

                : result === "typo"

                ? "bg-playful-yellow text-playful-indigo border-yellow-600 shadow-playful-yellow/30"

                : "bg-playful-indigo border-indigo-800 shadow-playful-indigo/30"

            )}

          >

            {result === null || result === "typo" ? "Check Answer" : "Got it, next! →"}

          </Button>

        </div>

      </form>

    </div>

  );

}




