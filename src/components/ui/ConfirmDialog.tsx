"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "playful";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Bestätigen",
  cancelText = "Abbrechen",
  variant = "playful",
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[40px] border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl p-8 overflow-hidden"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className={cn(
                "w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg",
                variant === "destructive" ? "bg-playful-red/10 text-playful-red" : "bg-playful-yellow/10 text-playful-yellow"
              )}>
                <AlertCircle size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">{title}</h3>
                <p className="text-zinc-500 font-bold text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="flex flex-col w-full gap-3">
                <Button
                  variant={variant}
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="h-14 rounded-2xl border-b-4 font-black"
                >
                  {confirmText}
                </Button>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="h-14 rounded-2xl font-bold text-zinc-400"
                >
                  {cancelText}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
