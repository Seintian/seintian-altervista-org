"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import i18n from "@/lib/i18n";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  useEffect(() => {
    // Perform language detection safely *after* hydration
    const savedLang = window.localStorage.getItem('i18nextLng');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    } else {
      const browserLang = window.navigator.language;
      const defaultLang = browserLang.startsWith('it') ? 'it' : 'en';
      i18n.changeLanguage(defaultLang);
      window.localStorage.setItem('i18nextLng', defaultLang);
    }

    const handleLanguageChange = (lng: string) => {
      window.localStorage.setItem('i18nextLng', lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
