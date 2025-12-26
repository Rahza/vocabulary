import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
    /**
     * Height of the skeleton. Can be a Tailwind class (h-64) or custom value.
     */
    className?: string;
    /**
     * Variant for common patterns
     */
    variant?: 'card' | 'text' | 'button';
}

/**
 * Skeleton loading placeholder component.
 * Provides consistent loading UI across the application.
 */
export const Skeleton = ({ className, variant }: SkeletonProps) => {
    const variants = {
        card: 'h-64 rounded-playful',
        text: 'h-4 rounded-full w-3/4',
        button: 'h-12 rounded-playful w-32',
    };

    return (
        <div
            className={cn(
                'bg-zinc-100 dark:bg-zinc-800 animate-pulse',
                variant && variants[variant],
                className
            )}
        />
    );
};
