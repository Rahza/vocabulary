'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Mail, Lock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Heading } from '@/components/ui/Heading';
import { containerReveal, itemReveal } from '@/lib/animations';

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
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                variants={containerReveal}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <Card className="p-8 space-y-8">
                    <motion.div variants={itemReveal} className="text-center">
                        <div className="w-20 h-20 bg-playful-indigo/10 rounded-[32px] flex items-center justify-center text-playful-indigo mx-auto mb-6">
                            <UserPlus size={40} strokeWidth={1.5} />
                        </div>
                        <Heading level={1} subtitle={t('signup.subtitle')} className="text-center">
                            {t('signup.title')}
                        </Heading>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                variants={itemReveal}
                                className="bg-playful-red/10 border-2 border-playful-red/20 rounded-2xl p-4 text-playful-red font-bold text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.div variants={itemReveal} className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1"
                            >
                                {t('signup.email')}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 z-10" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-12"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemReveal} className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1"
                            >
                                {t('signup.password')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 z-10" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemReveal} className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1"
                            >
                                {t('signup.confirmPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 z-10" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-12"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemReveal}>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                variant="playful"
                                className="w-full h-16 rounded-3xl border-b-4 text-xl"
                            >
                                {isLoading ? (
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    >
                                        🪄
                                    </motion.span>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-6 w-6" />
                                        {t('signup.submit')}
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </form>

                    <motion.p
                        variants={itemReveal}
                        className="text-center text-sm text-zinc-500 dark:text-zinc-400 font-bold"
                    >
                        {t('signup.hasAccount')}{' '}
                        <Link
                            href="/login"
                            className="text-playful-indigo hover:text-playful-indigo/80 underline underline-offset-4"
                        >
                            {t('signup.loginLink')}
                        </Link>
                    </motion.p>
                </Card>
            </motion.div>
        </div>
    );
};

export default SignupPage;