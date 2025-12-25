import React, { useEffect, useState } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { Button } from "@/components/ui/Button";

interface TagSelectorProps {
  onSelect: (tag: string, length: number) => void;
}

export function TagSelector({ onSelect }: TagSelectorProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionLength, setSessionLength] = useState<number>(10);

  const lengths = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "Alle", value: Infinity },
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

  if (loading) return <div className="text-center py-10 font-bold text-zinc-400 animate-pulse uppercase tracking-widest">Lade Themen...</div>;

  if (tags.length === 0) {
    return <div className="text-zinc-500 text-center py-10">Keine Themen gefunden. Generiere zuerst ein paar Vokabeln!</div>;
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 ml-1">Sitzungslänge</h3>
        <div className="flex gap-2">
          {lengths.map((len) => (
            <Button
              key={len.label}
              variant={sessionLength === len.value ? "playful" : "outline"}
              onClick={() => setSessionLength(len.value)}
              className="flex-1 h-12 rounded-2xl border-2 font-black"
            >
              {len.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 ml-1">Thema wählen</h3>
        <div className="grid grid-cols-2 gap-3">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              onClick={() => onSelect(tag, sessionLength)}
              className="h-16 rounded-3xl border-2 font-black capitalize justify-start px-6 text-left"
            >
              #{tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
