'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    /** Size of the spinner icon */
    size?: 'sm' | 'md' | 'lg';
    /** Whether to display full-page centered */
    fullPage?: boolean;
    /** Additional className */
    className?: string;
}

/**
 * Consistent loading spinner component.
 */
export const LoadingSpinner = ({
    size = 'md',
    fullPage = false,
    className,
}: LoadingSpinnerProps) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    const spinner = (
        <Loader2
            className={cn('animate-spin text-playful-indigo', sizes[size], className)}
        />
    );

    if (fullPage) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return spinner;
};
