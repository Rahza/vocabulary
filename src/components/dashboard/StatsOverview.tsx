import React from "react";
import { TagStats, GlobalStats } from "@/models/types";
import { motion } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";
import { ProgressDistribution } from "./ProgressDistribution";

import { BOX_DEFINITIONS } from "@/constants/box-definitions";

interface StatsOverviewProps {
  stats: TagStats[];
  globalStats: GlobalStats;
}

export function StatsOverview({ stats, globalStats }: StatsOverviewProps) {
  const meisterDef = BOX_DEFINITIONS[5];

  return (
    <motion.div 
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          variants={itemReveal}
          className="p-6 bg-playful-indigo text-white rounded-playful shadow-playful text-center"
        >
          <span className="text-4xl font-black">{globalStats.totalWords}</span>
          <p className="text-xs font-bold uppercase mt-1 opacity-80">Wörter gesamt</p>
        </motion.div>
        <motion.div 
          variants={itemReveal}
          className="p-6 bg-playful-green text-white rounded-playful shadow-playful text-center"
        >
          <span className="text-4xl font-black">{globalStats.masteredWords}</span>
          <p className="text-xs font-bold uppercase mt-1 opacity-80">{meisterDef.name}</p>
        </motion.div>
      </div>

      <ProgressDistribution distribution={globalStats.boxDistribution} />

      <motion.div 
        variants={itemReveal}
        className="bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-playful overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-none"
      >
        <h3 className="px-6 py-4 font-bold text-lg border-b-2 border-zinc-50 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
          Fortschritt nach Themen
        </h3>
        <div className="divide-y-2 divide-zinc-50 dark:divide-zinc-800">
          {stats.length === 0 ? (
             <div className="p-8 text-sm text-zinc-500 text-center font-medium">Noch keine Themen. Fang an zu generieren!</div>
          ) : stats.map((stat) => (
            <div key={stat.tagName} className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-base capitalize">{stat.tagName}</span>
                  <span className="text-xs text-zinc-400 block font-semibold">{stat.totalWords} Karten</span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <span className="text-playful-green">{stat.masteredWords}</span>
                    <span className="text-zinc-300">/</span>
                    <span className="text-zinc-500">{stat.totalWords}</span>
                  </div>
                  <div className="w-24 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-playful-green" 
                      style={{ width: `${(stat.masteredWords / stat.totalWords) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-1 h-2 w-full rounded-full overflow-hidden">
                {[1, 2, 3, 4, 5].map((box) => {
                  const count = stat.boxDistribution[box as 1|2|3|4|5];
                  if (count === 0) return null;
                  const width = (count / stat.totalWords) * 100;
                  const colors = ["bg-zinc-200", "bg-playful-yellow/40", "bg-playful-yellow/70", "bg-playful-yellow", "bg-playful-green"];
                  const def = BOX_DEFINITIONS[box];
                  return (
                    <div 
                      key={box} 
                      className={colors[box-1]} 
                      style={{ width: `${width}%` }}
                      title={`${def.icon} ${def.name}: ${count} Wörter`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}