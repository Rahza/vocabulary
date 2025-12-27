import { AuthProvider } from '@/components/auth/AuthProvider';
import { setRequestLocale } from 'next-intl/server';
import { Toaster } from 'sonner';

interface AuthLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function AuthLayout({ children, params }: AuthLayoutProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
        </AuthProvider>
    );
}
