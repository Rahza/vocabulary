"use client";

import React, { useEffect, useState } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { PracticeMode } from "@/models/types";
import { useTranslations } from "next-intl";

interface PracticeConfigProps {
  mode: PracticeMode;
  onStart: (tags: string[], length: number) => void;
  onBack: () => void;
}

export const PracticeConfig = ({ mode, onStart, onBack }: PracticeConfigProps) => {
  const t = useTranslations("practice");
  const commonT = useTranslations("common");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState<number>(5);

  const lengthOptions = [
    { label: "3", value: 3 },
    { label: "5", value: 5 },
    { label: "10", value: 10 },
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

  if (loading) return <div className="text-center py-10 font-bold text-zinc-400 animate-pulse uppercase tracking-widest">{commonT("loading")}</div>;

  if (tags.length === 0) {
    return (
      <div className="space-y-6 text-center py-10">
        <p className="text-zinc-500">{t("noTagsFound")}</p>
        <Button onClick={onBack} variant="outline">{commonT("back")}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 ml-1">{t("sessionLength")}</h3>
        <div className="flex gap-2">
          {lengthOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={length === opt.value ? "playful" : "outline"}
              onClick={() => setLength(opt.value)}
              className="flex-1 h-12 rounded-2xl border-2 font-black"
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <p className="text-[10px] text-zinc-400 font-bold italic ml-1">
          {mode === "classic" 
            ? t("roundInfo", { count: 1 }) // Standard translation handles this
            : t("roundInfo", { count: 5 })}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">{t("chooseTopic")}</h3>
          {selectedTags.length > 0 && (
            <button 
              onClick={() => setSelectedTags([])}
              className="text-[10px] font-black text-playful-red uppercase tracking-widest"
            >
              {t("reset")}
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
                    ? "bg-playful-indigo/10 border-playful-indigo text-playful-indigo"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-playful-indigo/30"
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
          {commonT("back")}
        </Button>
        <Button 
          onClick={() => onStart(selectedTags, length)} 
          disabled={selectedTags.length === 0}
          className="flex-[2] h-16 rounded-3xl border-b-4 bg-playful-indigo border-indigo-800 font-black shadow-lg shadow-playful-indigo/20"
        >
          {t("startSession")}
        </Button>
      </div>
    </div>
  );
};