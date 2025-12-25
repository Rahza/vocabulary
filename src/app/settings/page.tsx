"use client";

import { useSettings } from "@/contexts/SettingsContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";
import { Key, Trash2, Palette } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ThemeSelector } from "@/components/settings/ThemeSelector";
import { Heading } from "@/components/ui/Heading";

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const [apiKey, setApiKey] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (settings.openaiApiKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApiKey(settings.openaiApiKey);
    }
  }, [settings.openaiApiKey]);

  const handleSave = () => {
    updateSettings({ openaiApiKey: apiKey });
    toast.success("Einstellungen gespeichert!");
  };

  const handleConfirmReset = () => {
    localStorage.clear();
    toast.success("Alle Daten wurden zurückgesetzt.");
    window.location.reload();
  };

  return (
    <motion.div 
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemReveal}>
        <Heading 
          level={1} 
          subtitle="App-Präferenzen"
        >
          Einstellungen
        </Heading>
      </motion.div>

      <motion.section variants={itemReveal} className="space-y-4">
        <Heading 
          level={2} 
          icon={Palette} 
          subtitle="" 
          className="text-playful-indigo ml-1"
        >
          Erscheinungsbild
        </Heading>
        <ThemeSelector />
      </motion.section>

      <motion.div variants={itemReveal} className="space-y-4">
        <Heading 
          level={2} 
          icon={Key} 
          subtitle="" 
          className="text-playful-indigo ml-1"
        >
          OpenAI API-Schlüssel
        </Heading>
        <Input
          id="apiKey"
          type="password"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="focus-visible:ring-playful-indigo"
        />
        <p className="text-xs text-zinc-400 font-bold italic px-1">
          Dein Schlüssel wird sicher im lokalen Speicher deines Browsers gespeichert.
        </p>
        
        <Button onClick={handleSave} className="w-full h-16 rounded-3xl border-b-4">
          Einstellungen speichern
        </Button>
      </motion.div>

      <motion.div variants={itemReveal} className="pt-10 border-t-2 border-dashed border-zinc-100 dark:border-zinc-800">
        <Heading 
          level={2} 
          icon={Trash2} 
          subtitle="" 
          className="text-playful-red mb-4 ml-1"
        >
          Gefahrenzone
        </Heading>
        <Button variant="destructive" onClick={() => setShowResetConfirm(true)} className="w-full h-14 rounded-3xl border-b-4 font-black">
          Alle Daten zurücksetzen
        </Button>
      </motion.div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleConfirmReset}
        title="Alle Daten löschen?"
        description="Bist du sicher? Dies wird deinen gesamten Fortschritt und alle Vokabeln unwiderruflich löschen."
        confirmText="Alles löschen"
        variant="destructive"
      />
    </motion.div>
  );
}
