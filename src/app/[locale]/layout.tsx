import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, Locale } from '@/i18n/routing';
import { LanguageOnboarding } from '@/components/onboarding/LanguageOnboarding';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { Navigation } from '@/components/layout/Navigation';
import { Toaster } from 'sonner';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SettingsProvider>
        <LanguageOnboarding />
        <main className="min-h-screen pb-20 p-4 max-w-md mx-auto">{children}</main>
        <Navigation />
        <Toaster position="top-center" richColors />
      </SettingsProvider>
    </NextIntlClientProvider>
  );
}
