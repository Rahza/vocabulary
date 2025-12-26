'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter, usePathname } from '@/i18n/routing';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface AuthGuardProps {
    children: React.ReactNode;
}

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/signup'];

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Check if current route is public (doesn't need auth)
    const isPublicRoute = PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route)
    );

    useEffect(() => {
        // Skip auth check for public routes
        if (isPublicRoute) return;

        // Wait for auth to load
        if (loading) return;

        // If no user, redirect to login
        if (!user) {
            router.push('/login');
        }
    }, [user, loading, router, isPublicRoute]);

    // Public routes - render immediately without auth check
    if (isPublicRoute) {
        return <>{children}</>;
    }

    // Show loading spinner while checking auth or waiting for redirect
    if (loading || !user) {
        return <LoadingSpinner fullPage />;
    }

    // User is authenticated, render children
    return <>{children}</>;
};
