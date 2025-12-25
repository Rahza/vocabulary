"use client";

import React from "react";
import { PracticeMode } from "@/models/types";
import { motion } from "framer-motion";
import { BrainCircuit, Languages } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface ModeSelectorProps {
  onSelect: (mode: PracticeMode) => void;
}

export const ModeSelector = ({ onSelect }: ModeSelectorProps) => {
  const modes: { id: PracticeMode; title: string; description: string; icon: React.ReactNode; color: string }[] = [
    {
      id: "classic",
      title: "Klassisch",
      description: "Vokabeln einzeln abfragen mit Tastatur-Eingabe.",
      icon: <BrainCircuit size={32} />,
      color: "text-playful-indigo",
    },
    {
      id: "connect-pairs",
      title: "Paare finden",
      description: "Wörter beider Sprachen in einer Liste einander zuordnen.",
      icon: <Languages size={32} />,
      color: "text-playful-green",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {modes.map((mode) => (
        <Card
          key={mode.id}
          onClick={() => onSelect(mode.id)}
          hoverable
          className="p-8 text-left group"
        >
          <div className="flex items-start gap-6">
            <div className={`p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 ${mode.color} transition-transform group-hover:scale-110 duration-300`}>
              {mode.icon}
            </div>
            <div>
              <h3 className="text-xl font-black mb-2 group-hover:text-playful-indigo transition-colors">
                {mode.title}
              </h3>
              <p className="text-zinc-400 font-bold text-sm leading-relaxed">
                {mode.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
