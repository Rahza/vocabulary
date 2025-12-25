"use client";

import React from "react";
import { motion } from "framer-motion";
import { itemReveal } from "@/lib/animations";

import { BOX_DEFINITIONS } from "@/constants/box-definitions";

interface ProgressDistributionProps {
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export function ProgressDistribution({ distribution }: ProgressDistributionProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  
  const boxes = [1, 2, 3, 4, 5];
  const colors = [
    "bg-zinc-200 dark:bg-zinc-800",
    "bg-playful-yellow/40",
    "bg-playful-yellow/70",
    "bg-playful-yellow",
    "bg-playful-green"
  ];

  return (
    <motion.div variants={itemReveal} className="space-y-4">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Verteilung</h3>
        <span className="text-xs font-bold text-zinc-500">{total} Vokabeln gesamt</span>
      </div>
      
      <div className="flex items-end gap-2 h-32">
        {boxes.map((box, i) => {
          const count = distribution[box as keyof typeof distribution];
          const height = total > 0 ? (count / total) * 100 : 0;
          const def = BOX_DEFINITIONS[box];
          
          return (
            <div key={box} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="relative w-full group flex-1 flex flex-col justify-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  className={`w-full rounded-t-xl min-h-[4px] ${colors[i]} transition-colors group-hover:brightness-110`}
                />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl border border-white/10">
                  <p className="font-black mb-0.5">{def.icon} {def.name}</p>
                  <p className="opacity-70">{count} Wörter</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-zinc-400 flex flex-col items-center">
                <span className="text-sm mb-0.5">{def.icon}</span>
                <span className="hidden sm:block uppercase opacity-60 scale-[0.8]">{def.name}</span>
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
