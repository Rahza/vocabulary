"use client";

import React, { useEffect, useState } from "react";
import { LocalStorageRepository } from "@/services/storage/LocalStorageRepository";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { TagStats, GlobalStats } from "@/models/types";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEnterKey } from "@/hooks/use-enter-key";
import { BrainCircuit, Wand2, Dumbbell, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { containerReveal, itemReveal } from "@/lib/animations";
import { Heading } from "@/components/ui/Heading";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<TagStats[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Keyboard navigation
  useEnterKey(() => {
    router.push("/trainer");
  }, !loading);

  useEffect(() => {
    const loadData = async () => {
      const repo = new LocalStorageRepository();
      const [tagData, globalData] = await Promise.all([
        repo.getStats(),
        repo.getGlobalStats()
      ]);
      setStats(tagData);
      setGlobalStats(globalData);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <motion.div
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <header className="py-2">
        <motion.div variants={itemReveal}>
          <Heading
            level={1}
            subtitle="Bereit zum Lernen?"
          >
            Ahoj! <Sparkles className="text-playful-yellow w-6 h-6 fill-playful-yellow inline-block ml-1" />
          </Heading>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <motion.div variants={itemReveal}>
          <Link href="/trainer" className="w-full">
            <Button className="w-full h-20 text-xl shadow-xl shadow-playful-indigo/20 border-b-4">
              <BrainCircuit className="mr-3 w-8 h-8" /> Tägliches Training
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div variants={itemReveal}>
            <Link href="/generate">
              <Button variant="outline" className="w-full h-24 flex-col gap-2 rounded-3xl border-b-4 shadow-lg shadow-zinc-300/30 dark:shadow-none hover:bg-playful-yellow/10 hover:border-playful-yellow group">
                <Wand2 className="w-8 h-8 text-playful-yellow group-hover:scale-110 transition-transform" />
                <span className="font-black text-sm uppercase">Generieren</span>
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={itemReveal}>
            <Link href="/practice">
              <Button variant="outline" className="w-full h-24 flex-col gap-2 rounded-3xl border-b-4 shadow-lg shadow-zinc-300/30 dark:shadow-none hover:bg-playful-indigo/10 hover:border-playful-indigo group">
                <Dumbbell className="w-8 h-8 text-playful-indigo group-hover:scale-110 transition-transform" />
                <span className="font-black text-sm uppercase">Üben</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.section variants={itemReveal}>
        <Heading level={2} className="mb-6">
          Dein Fortschritt
        </Heading>
        {loading || !globalStats ? (
          <div className="h-64 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-playful" />
        ) : (
          <StatsOverview stats={stats} globalStats={globalStats} />
        )}
      </motion.section>
    </motion.div>
  );
}
