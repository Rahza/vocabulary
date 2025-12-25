"use client";

import React, { useState } from "react";
import { VocabularyWithProgress } from "@/app/vocabulary/page";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { OpenAIService } from "@/services/ai/OpenAIService";
import { useSettings } from "@/contexts/SettingsContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, X, Sparkles, BrainCircuit, Tag, RotateCcw, Trash2, Wand2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { BOX_DEFINITIONS } from "@/constants/box-definitions";

interface WordDetailProps {
  item: VocabularyWithProgress;
  onRefresh: () => void;
  onClose: () => void;
}

export function WordDetail({ item, onRefresh, onClose }: WordDetailProps) {
  const [newTag, setNewTag] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [mnemonic, setMnemonic] = useState(item.mnemonic);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { settings } = useSettings();
  
  const repository = new LocalStorageRepository();
  const aiService = new OpenAIService();

  const currentBox = BOX_DEFINITIONS[item.maxBox] || BOX_DEFINITIONS[1];

  // Sync internal state with prop changes
  React.useEffect(() => {
    setMnemonic(item.mnemonic);
  }, [item.mnemonic]);

  const handleRegenerateMnemonic = async () => {
    if (!settings.openaiApiKey) {
      toast.error("OpenAI API-Schlüssel fehlt. Bitte in den Einstellungen hinzufügen.");
      return;
    }

    setIsRegenerating(true);
    try {
      const newMnemonic = await aiService.generateSingleMnemonic(
        item.german,
        item.czech,
        settings.openaiApiKey
      );
      await repository.updateVocabulary(item.id, { mnemonic: newMnemonic });
      setMnemonic(newMnemonic); // Update local state immediately
      toast.success("Eselsbrücke erneuert!");
      onRefresh();
    } catch (error) {
      console.error(error);
      toast.error("Fehler beim Generieren der Eselsbrücke.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleReset = async () => {
    await repository.resetProgress(item.id);
    toast.success("Fortschritt zurückgesetzt");
    onRefresh();
  };

  const handleDelete = async () => {
    await repository.deleteVocabulary(item.id);
    toast.success("Vokabel gelöscht");
    onClose();
    onRefresh();
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    
    if (item.tags.includes(newTag.trim())) {
      toast.error("Tag existiert bereits");
      return;
    }

    const updatedTags = [...item.tags, newTag.trim()];
    await repository.updateVocabulary(item.id, { tags: updatedTags });
    setNewTag("");
    onRefresh();
  };

  const handleRemoveTag = async (tagToRemove: string) => {
    const updatedTags = item.tags.filter((t) => t !== tagToRemove);
    await repository.updateVocabulary(item.id, { tags: updatedTags });
    onRefresh();
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[32px] bg-playful-indigo/5 border-2 border-playful-indigo/10">
          <span className="text-xs font-black text-playful-indigo uppercase tracking-widest mb-2 block">Deutsch</span>
          <h3 className="text-3xl font-black text-playful-indigo">{item.german}</h3>
        </div>
        <div className="p-6 rounded-[32px] bg-playful-green/5 border-2 border-playful-green/10">
          <span className="text-xs font-black text-playful-green uppercase tracking-widest mb-2 block">Česky</span>
          <h3 className="text-3xl font-black text-playful-green">{item.czech}</h3>
        </div>
      </div>

      {/* Mnemonic Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center ml-1">
          <div className="flex items-center gap-2 text-zinc-400">
            <Sparkles size={18} className="text-playful-yellow" />
            <h4 className="text-sm font-black uppercase tracking-widest">Eselsbrücke</h4>
          </div>
          <button
            onClick={handleRegenerateMnemonic}
            disabled={isRegenerating}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-playful-indigo hover:text-indigo-600 disabled:opacity-50 transition-all"
          >
            {isRegenerating ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Wand2 size={14} />
            )}
            Neu generieren
          </button>
        </div>
        <div className="p-6 rounded-[32px] bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800">
          {mnemonic ? (
            <p className="text-lg font-bold text-zinc-600 dark:text-zinc-300 italic">
              {mnemonic}
            </p>
          ) : (
            <p className="text-zinc-400 italic">Keine Eselsbrücke vorhanden.</p>
          )}
        </div>
      </div>

      {/* Progress & Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-400 ml-1">
            <BrainCircuit size={18} className="text-playful-indigo" />
            <h4 className="text-sm font-black uppercase tracking-widest">Status</h4>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800">
            <div className="w-12 h-12 rounded-2xl bg-playful-yellow flex items-center justify-center text-2xl font-black text-playful-indigo shadow-lg shadow-playful-yellow/20">
              {currentBox.icon}
            </div>
            <div>
              <p className="font-black text-base">{currentBox.name}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                {currentBox.description}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-400 ml-1">
            <Tag size={18} className="text-playful-indigo" />
            <h4 className="text-sm font-black uppercase tracking-widest">Tags</h4>
          </div>
          <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800">
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 pl-3 pr-1 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-full"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="p-1 hover:text-playful-red transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {item.tags.length === 0 && (
                <p className="text-xs text-zinc-400 italic">Keine Tags zugewiesen.</p>
              )}
            </div>
            <form onSubmit={handleAddTag} className="flex gap-2">
              <Input
                placeholder="Neuer Tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
              <Button type="submit" size="sm" className="h-10 w-10 p-0 rounded-xl">
                <Plus size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-8 border-t-2 border-dashed border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => setShowResetConfirm(true)}
          className="h-14 rounded-[24px] border-2 font-black gap-2"
        >
          <RotateCcw size={20} /> Reset
        </Button>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteConfirm(true)}
          className="h-14 rounded-[24px] font-black gap-2 shadow-lg shadow-playful-red/20"
        >
          <Trash2 size={20} /> Löschen
        </Button>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Vokabel löschen?"
        description={`Bist du sicher? "${item.german}" wird gelöscht.`}
        confirmText="Löschen"
        variant="destructive"
      />

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Lernfortschritt zurücksetzen?"
        description="Das Wort wird wieder in Box 1 verschoben."
        confirmText="Reset"
      />
    </div>
  );
}
