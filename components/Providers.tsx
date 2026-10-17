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
    const updateDocumentLang = (lng: string) => {
      if (typeof document !== "undefined") {
        document.documentElement.lang = lng.startsWith("it") ? "it" : "en";
      }
    };

    // Keep <html lang="..."> in sync with the active language detected or selected
    updateDocumentLang(i18n.language || "en");

    i18n.on("languageChanged", updateDocumentLang);
    return () => {
      i18n.off("languageChanged", updateDocumentLang);
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
