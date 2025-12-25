import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "sonner";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Vocabulary Trainer",
  description: "Learn vocabulary with AI and Spaced Repetition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} font-sans antialiased bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}
      >
        <SettingsProvider>
          <main className="min-h-screen pb-20 p-4 max-w-md mx-auto">
            {children}
          </main>
          <Navigation />
          <Toaster position="top-center" richColors />
        </SettingsProvider>
      </body>
    </html>
  );
}
