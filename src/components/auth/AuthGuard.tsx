'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter, usePathname } from '@/i18n/routing';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

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
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route));

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

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-playful-indigo" />
            </div>
        );
    }

    // If no user, don't render children (redirect will happen)
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-playful-indigo" />
            </div>
        );
    }

    // User is authenticated, render children
    return <>{children}</>;
};
