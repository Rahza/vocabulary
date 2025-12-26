'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect client-side mounting.
 * Used to prevent hydration mismatches for components that render
 * differently on client vs server (e.g., theme-dependent UI).
 *
 * @returns true once the component has mounted on the client
 */
export const useMounted = (): boolean => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // This is the standard React pattern for hydration safety.
        // It's intentional to trigger a re-render after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    return mounted;
};
