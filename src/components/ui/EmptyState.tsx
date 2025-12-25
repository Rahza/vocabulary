"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import { itemReveal } from "@/lib/animations";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({ title, description, icon: Icon, action }: EmptyStateProps) => {
  return (
    <motion.div
      variants={itemReveal}
      className="flex flex-col items-center justify-center py-20 text-center space-y-6"
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-[40px] bg-playful-indigo/10 dark:bg-playful-indigo/20 flex items-center justify-center text-playful-indigo">
          <Icon size={48} strokeWidth={1.5} />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-2 -right-2 text-2xl"
        >
          ✨
        </motion.div>
      </div>

      <div className="space-y-2 max-w-xs">
        <h3 className="text-2xl font-black tracking-tight">{title}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed">
          {description}
        </p>
      </div>

      {action && (
        <Button
          onClick={action.onClick}
          className="h-14 px-8 rounded-2xl border-b-4 font-black shadow-lg"
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
};
