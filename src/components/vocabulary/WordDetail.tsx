"use client";

import React, { useState } from "react";
import { VocabularyWithProgress } from "@/app/[locale]/vocabulary/page";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { OpenAIService } from "@/services/ai/OpenAIService";
import { useSettings } from "@/contexts/SettingsContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, X, Sparkles, BrainCircuit, Tag, RotateCcw, Trash2, Wand2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { BOX_DEFINITIONS } from "@/constants/box-definitions";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { useTranslations, useFormatter } from "next-intl";
import { LANG_CODE_MAP } from "@/constants/languages";

interface WordDetailProps {
  item: VocabularyWithProgress;
  onRefresh: () => void;
  onClose: () => void;
}

export function WordDetail({ item, onRefresh, onClose }: WordDetailProps) {
  const t = useTranslations("vocabulary");
  const commonT = useTranslations("common");
  const boxT = useTranslations("vocabulary.boxes");
  const tLang = useTranslations("settings.languages");
  const format = useFormatter();
  
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
        item.source,
        item.target,
        settings.openaiApiKey,
        settings.sourceLanguage || "German",
        settings.targetLanguage || "Czech"
      );
      await repository.updateVocabulary(item.id, { mnemonic: newMnemonic });
      setMnemonic(newMnemonic); // Update local state immediately
      toast.success(t("regenerateSuccess"));
      onRefresh();
    } catch (error) {
      console.error(error);
      toast.error(t("regenerateError"));
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleReset = async () => {
    await repository.resetProgress(item.id);
    toast.success(t("resetSuccess"));
    onRefresh();
  };

  const handleDelete = async () => {
    await repository.deleteVocabulary(item.id);
    toast.success(t("deleteWordSuccess"));
    onClose();
    onRefresh();
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    
    if (item.tags.includes(newTag.trim())) {
      toast.error(t("tagExists"));
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

  const sourceLangName = settings.sourceLanguage 
    ? tLang(LANG_CODE_MAP[settings.sourceLanguage] as any)
    : "Source";

  const targetLangName = settings.targetLanguage 
    ? tLang(LANG_CODE_MAP[settings.targetLanguage] as any)
    : "Target";

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-playful-indigo/5 border-playful-indigo/10 shadow-none">
          <Heading level={4} subtitle={sourceLangName} className="text-playful-indigo">
            {item.source}
          </Heading>
        </Card>
        <Card className="p-6 bg-playful-green/5 border-playful-green/10 shadow-none">
          <Heading level={4} subtitle={targetLangName} className="text-playful-green">
            {item.target}
          </Heading>
        </Card>
      </div>

      <div className="flex justify-end px-2">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          {t("createdAt")}: {format.dateTime(new Date(item.createdAt), {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>

      {/* Mnemonic Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center ml-1">
          <Heading level={4} icon={Sparkles} subtitle="" className="text-zinc-400">
            {t("mnemonic")}
          </Heading>
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
            {t("regenerate")}
          </button>
        </div>
        <Card className="p-6 bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800">
          {mnemonic ? (
            <p className="text-lg font-bold text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
              {mnemonic}
            </p>
          ) : (
            <p className="text-zinc-400 italic">{t("noMnemonic")}</p>
          )}
        </Card>
      </div>

      {/* Progress & Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Progress */}
        <div className="space-y-3">
          <Heading level={4} icon={BrainCircuit} className="text-zinc-400 ml-1">
            {t("status")}
          </Heading>
          <Card className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-2xl bg-playful-yellow flex items-center justify-center text-2xl font-black text-playful-indigo shadow-lg shadow-playful-yellow/20">
              {currentBox.icon}
            </div>
            <div>
              <p className="font-black text-base">{boxT(`${currentBox.index}.name`)}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                {boxT(`${currentBox.index}.desc`)}
              </p>
            </div>
          </Card>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <Heading level={4} icon={Tag} className="text-zinc-400 ml-1">
            {t("tags")}
          </Heading>
          <Card className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="default"
                  className="flex items-center gap-1 pl-3 pr-1 py-1"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="p-1 hover:text-playful-red transition-colors"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
              {item.tags.length === 0 && (
                <p className="text-xs text-zinc-400 italic">{t("noTags")}</p>
              )}
            </div>
            <form onSubmit={handleAddTag} className="flex gap-2">
              <Input
                placeholder={t("newTagPlaceholder")}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
              <Button type="submit" size="sm" className="h-10 w-10 p-0 rounded-xl bg-playful-indigo">
                <Plus size={18} />
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-8 border-t-2 border-dashed border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => setShowResetConfirm(true)}
          className="h-14 rounded-[24px] border-2 font-black gap-2"
        >
          <RotateCcw size={20} /> {commonT("reset")}
        </Button>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteConfirm(true)}
          className="h-14 rounded-[24px] font-black gap-2 shadow-lg shadow-playful-red/20"
        >
          <Trash2 size={20} /> {commonT("delete")}
        </Button>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title={t("deleteWord")}
        description={t("deleteWordDesc", { word: item.source })}
        confirmText={commonT("delete")}
        variant="destructive"
      />

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title={t("resetProgress")}
        description={t("resetProgressDesc")}
        confirmText={commonT("reset")}
      />
    </div>
  );
}