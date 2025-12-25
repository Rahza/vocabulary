"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { bouncyButton } from "@/lib/animations";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "playful";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "playful", size = "md", ...props }, ref) => {
    const variants: Record<ButtonVariant, string> = {
      primary: "bg-playful-indigo text-white hover:brightness-110 shadow-playful",
      secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700",
      outline: "border-2 border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800",
      ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800",
      destructive: "bg-playful-red text-white hover:bg-red-600 shadow-lg shadow-playful-red/20",
      playful: "bg-playful-indigo text-white shadow-playful hover:brightness-110",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        variants={bouncyButton}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={cn(
          "inline-flex items-center justify-center rounded-playful font-black uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-playful-indigo disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";