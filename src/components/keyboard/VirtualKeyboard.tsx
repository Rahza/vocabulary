import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
  className?: string;
}

const CHARS = [
  "á", "č", "ď", "é", "ě", "í", "ň", "ó", "ř", "š", "ť", "ú", "ů", "ý", "ž"
];

export function VirtualKeyboard({ onKeyPress, className }: VirtualKeyboardProps) {
  return (
    <div className={cn("grid grid-cols-5 gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-[32px] border-2 border-zinc-100 dark:border-zinc-800", className)}>
      {CHARS.map((char) => (
        <Keycap key={char} char={char} onClick={() => onKeyPress(char)} />
      ))}
    </div>
  );
}

function Keycap({ char, onClick }: { char: string; onClick: () => void }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      type="button"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onClick={onClick}
      className={cn(
        "relative w-full aspect-square flex items-center justify-center rounded-2xl font-black text-xl transition-all duration-75",
        "bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700",
        isPressed ? "shadow-keycap-pressed translate-y-[3px]" : "shadow-keycap"
      )}
    >
      {char}
    </button>
  );
}
