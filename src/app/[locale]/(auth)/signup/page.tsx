'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Mail, Lock, Loader2, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const SignupPage = () => {
    const { signUp } = useAuth();
    const router = useRouter();
    const t = useTranslations('auth');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError(t('signup.passwordMismatch'));
            return;
        }

        if (password.length < 6) {
            setError(t('signup.passwordTooShort'));
            return;
        }

        setIsLoading(true);

        try {
            await signUp(email, password);
            router.push('/');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Signup failed';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-playful-teal to-playful-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            {t('signup.title')}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-2">{t('signup.subtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            >
                                {t('signup.email')}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-playful-teal focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            >
                                {t('signup.password')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-playful-teal focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            >
                                {t('signup.confirmPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-playful-teal focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-playful-teal to-playful-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    {t('signup.submit')}
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        {t('signup.hasAccount')}{' '}
                        <Link href="/login" className="text-playful-teal hover:underline font-medium">
                            {t('signup.loginLink')}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
