import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} font-sans antialiased`}
      >
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
      </body>
    </html>
  );
}
