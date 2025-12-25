"use client";

import { useEffect } from "react";

/**
 * Custom hook that triggers a callback when the Enter key is pressed.
 * Useful for single-button screens to improve keyboard accessibility.
 * 
 * @param callback The function to execute on Enter key press
 * @param enabled Whether the listener should be active (defaults to true)
 */
export function useEnterKey(callback: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if the target is an input or textarea
      const target = event.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      
      if (event.key === "Enter" && !isInput) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, enabled]);
}
