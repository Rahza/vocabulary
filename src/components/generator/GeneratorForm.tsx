"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { itemReveal } from "@/lib/animations";

interface GeneratorFormProps {
  onGenerate: (theme: string, difficulty: string, count: number) => void;
  isLoading: boolean;
}

export function GeneratorForm({ onGenerate, isLoading }: GeneratorFormProps) {
  const [theme, setTheme] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [count, setCount] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(theme, difficulty, count);
  };

  return (
    <motion.form 
      variants={itemReveal}
      onSubmit={handleSubmit} 
      className="space-y-6 p-6 border-2 border-zinc-100 dark:border-zinc-800 rounded-playful bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none"
    >
      <div className="space-y-2">
        <label htmlFor="theme" className="text-sm font-black uppercase tracking-widest text-zinc-400 ml-1">
          Thema / Kategorie
        </label>
        <Input
          id="theme"
          placeholder="z.B. Weltraum, Kochen, Emotionen..."
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          required
          className="focus-visible:ring-playful-yellow focus-visible:border-playful-yellow"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="difficulty" className="text-sm font-black uppercase tracking-widest text-zinc-400 ml-1">
            Schwierigkeit
          </label>
          <select
            id="difficulty"
            className="flex h-12 w-full rounded-playful border-2 border-zinc-200 bg-white px-4 py-2 text-base font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-playful-green dark:border-zinc-800 dark:bg-zinc-950 appearance-none transition-all"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Beginner">🌱 Anfänger</option>
            <option value="Intermediate">🌿 Fortgeschritten</option>
            <option value="Advanced">🌳 Experte</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="count" className="text-sm font-black uppercase tracking-widest text-zinc-400 ml-1">
            Wie viele?
          </label>
          <Input
            id="count"
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            required
            className="focus-visible:ring-playful-indigo focus-visible:border-playful-indigo font-bold"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading} 
        variant="playful"
        className="w-full h-16 text-lg bg-playful-indigo shadow-playful-indigo/30 border-b-4 border-indigo-800"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              🪄
            </motion.span>
            Erzeuge Magie...
          </span>
        ) : (
          <>
            <Wand2 className="mr-2 h-6 w-6" /> Vokabeln generieren
          </>
        )}
      </Button>
    </motion.form>
  );
}