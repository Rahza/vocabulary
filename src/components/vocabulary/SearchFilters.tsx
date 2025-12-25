"use client";

import React from "react";
import { Search, Filter, X, RotateCcw, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { itemReveal } from "@/lib/animations";
import Link from "next/link";

interface SearchFiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedBox: number | null;
  onBoxChange: (box: number | null) => void;
  availableTags: string[];
}

export function SearchFilters({
  query,
  onQueryChange,
  selectedTags,
  onTagsChange,
  selectedBox,
  onBoxChange,
  availableTags,
}: SearchFiltersProps) {
  const toggleTag = (tag: string) => {
    onTagsChange(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const BOXES = [1, 2, 3, 4, 5];

  return (
    <motion.div variants={itemReveal} className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <Input
            placeholder="Suchen nach Begriff oder Übersetzung..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-12 h-14 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg shadow-zinc-200/50 dark:shadow-none focus-visible:ring-playful-indigo"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <Link href="/generate">
          <Button className="h-14 px-6 rounded-2xl bg-playful-yellow text-playful-indigo border-b-4 border-yellow-600 font-black shadow-lg shadow-playful-yellow/20 whitespace-nowrap">
            <Wand2 size={20} className="mr-2" /> Neu generieren
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 text-zinc-400 mr-2">
            <Filter size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Tags:</span>
          </div>
          
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2",
                  isSelected
                    ? "bg-playful-indigo border-playful-indigo text-white shadow-lg shadow-playful-indigo/20"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-zinc-200 dark:hover:border-zinc-700"
                )}
              >
                #{tag}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 text-zinc-400 mr-2">
            <RotateCcw size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Fortschritt:</span>
          </div>
          
          {BOXES.map((box) => {
            const isSelected = selectedBox === box;
            return (
              <button
                key={box}
                onClick={() => onBoxChange(isSelected ? null : box)}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all border-2",
                  isSelected
                    ? "bg-playful-yellow border-playful-yellow text-playful-indigo shadow-lg shadow-playful-yellow/20"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-zinc-200 dark:hover:border-zinc-700"
                )}
              >
                {box}
              </button>
            );
          })}

          {(selectedTags.length > 0 || selectedBox !== null || query) && (
            <button
              onClick={() => {
                onTagsChange([]);
                onBoxChange(null);
                onQueryChange("");
              }}
              className="text-[10px] font-black uppercase tracking-widest text-playful-red hover:underline ml-2"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
