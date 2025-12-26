'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect browser language
    const lang = window.navigator.language.split('-')[0];
    const supportedLocales = ['en', 'de', 'cs'];
    const locale = supportedLocales.includes(lang) ? lang : 'en';

    // Redirect to detected locale
    router.replace(`/${locale}`);
  }, [router]);

  return null;
}
