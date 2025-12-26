'use client';

import { Link, usePathname } from '@/i18n/routing';
import { LayoutDashboard, BrainCircuit, Dumbbell, Settings, Library } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const links = [
    { href: '/', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/vocabulary', label: t('vocabulary'), icon: Library },
    { href: '/trainer', label: t('trainer'), icon: BrainCircuit },
    { href: '/practice', label: t('practice'), icon: Dumbbell },
    { href: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t-2 border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-lg pb-safe z-50 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.08)] dark:shadow-none">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all',
                isActive
                  ? 'text-playful-indigo'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-x-2 inset-y-2 bg-playful-indigo/10 rounded-2xl -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                size={24}
                className={cn('transition-transform duration-300', isActive && 'scale-110')}
              />
              <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
