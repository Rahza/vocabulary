"use client";

import React, { useEffect, useState } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ConnectPairsConfigProps {
  onStart: (tags: string[], rounds: number) => void;
  onBack: () => void;
}

export const ConnectPairsConfig = ({ onStart, onBack }: ConnectPairsConfigProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState<number>(5);

  const roundOptions = [
    { label: "3 Runden", value: 3 },
    { label: "5 Runden", value: 5 },
    { label: "10 Runden", value: 10 },
  ];

  useEffect(() => {
    const loadTags = async () => {
      const repo = new LocalStorageRepository();
      const allTags = await repo.getTags();
      setTags(allTags);
      setLoading(false);
    };
    loadTags();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (loading) return <div className="text-center py-10 font-bold text-zinc-400 animate-pulse uppercase tracking-widest">Lade Themen...</div>;

  if (tags.length === 0) {
    return (
      <div className="space-y-6 text-center py-10">
        <p className="text-zinc-500">Keine Themen gefunden. Generiere zuerst ein paar Vokabeln!</p>
        <Button onClick={onBack} variant="outline">Zurück</Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 ml-1">Anzahl der Runden</h3>
        <div className="flex gap-2">
          {roundOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={rounds === opt.value ? "playful" : "outline"}
              onClick={() => setRounds(opt.value)}
              className="flex-1 h-12 rounded-2xl border-2 font-black text-xs"
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <p className="text-[10px] text-zinc-400 font-bold italic ml-1">
          Pro Runde werden 5 Paare gematcht.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Themen wählen</h3>
          {selectedTags.length > 0 && (
            <button 
              onClick={() => setSelectedTags([])}
              className="text-[10px] font-black text-playful-red uppercase tracking-widest"
            >
              Reset
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "h-14 rounded-2xl border-2 font-black transition-all flex items-center px-4 text-sm truncate",
                  isSelected
                    ? "bg-playful-green/10 border-playful-green text-playful-green"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-playful-green/30"
                )}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 h-16 rounded-3xl border-2 font-black">
          Zurück
        </Button>
        <Button 
          onClick={() => onStart(selectedTags, rounds)} 
          disabled={selectedTags.length === 0}
          className="flex-[2] h-16 rounded-3xl border-b-4 bg-playful-green border-emerald-800 font-black shadow-lg shadow-playful-green/20"
        >
          Sitzung starten
        </Button>
      </div>
    </div>
  );
};
