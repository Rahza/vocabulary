import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Vocabulary Trainer",
  description: "Learn vocabulary with AI and Spaced Repetition",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vocab AI",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${quicksand.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="ai_vocab_theme">
            <SettingsProvider>
              <main className="min-h-screen pb-20 p-4 max-w-md mx-auto">
                {children}
              </main>
              <Navigation />
              <Toaster position="top-center" richColors />
              <ServiceWorkerRegistration />
            </SettingsProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
