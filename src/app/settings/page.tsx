"use client";

import { useSettings } from "@/contexts/SettingsContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";
import { Key, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

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
        <h1 className="text-3xl font-black tracking-tight">Einstellungen</h1>
        <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs mt-1">App-Präferenzen</p>
      </motion.div>

      <motion.div variants={itemReveal} className="space-y-4">
        <div className="flex items-center gap-2 text-playful-indigo ml-1">
          <Key size={18} />
          <label htmlFor="apiKey" className="text-sm font-black uppercase tracking-widest">
            OpenAI API-Schlüssel
          </label>
        </div>
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
        
        <Button onClick={handleSave} className="w-full h-16 rounded-3xl border-b-4 bg-playful-indigo border-indigo-800">
          Einstellungen speichern
        </Button>
      </motion.div>

      <motion.div variants={itemReveal} className="pt-10 border-t-2 border-dashed border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-playful-red mb-4 ml-1">
          <Trash2 size={18} />
          <h2 className="text-sm font-black uppercase tracking-widest">Gefahrenzone</h2>
        </div>
        <Button variant="destructive" onClick={() => setShowResetConfirm(true)} className="w-full h-14 rounded-3xl border-b-4 border-red-800 bg-playful-red font-black">
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
