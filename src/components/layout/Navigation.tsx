"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BrainCircuit, Dumbbell, Settings, Library } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Start", icon: LayoutDashboard },
    { href: "/vocabulary", label: "Sammlung", icon: Library },
    { href: "/trainer", label: "Lernen", icon: BrainCircuit },
    { href: "/practice", label: "Üben", icon: Dumbbell },
    { href: "/settings", label: "Optionen", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t-2 border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg pb-safe z-50">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all",
                isActive
                  ? "text-playful-indigo"
                  : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute inset-x-2 inset-y-2 bg-playful-indigo/10 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={24} className={cn("transition-transform duration-300", isActive && "scale-110")} />
              <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}