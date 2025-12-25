"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  colorClass?: string;
}

export function ProgressBar({ progress, className, colorClass = "bg-playful-indigo" }: ProgressBarProps) {
  return (
    <div className={cn("h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn("h-full relative", colorClass)}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
      </motion.div>
    </div>
  );
}
