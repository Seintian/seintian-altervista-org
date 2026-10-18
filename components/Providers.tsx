"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import i18n from "@/lib/i18n";
import { ResonanceProvider } from "@/lib/context/ResonanceContext";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const updateDocumentLang = (lng: string) => {
      if (typeof document !== "undefined") {
        document.documentElement.lang = lng.startsWith("it") ? "it" : "en";
      }
    };

    updateDocumentLang(i18n.language || "en");

    // Client-side post-hydration language restoration
    try {
      const stored = localStorage.getItem("i18nextLng");
      const browser = navigator.language;
      const preferred = stored || (browser?.startsWith("it") ? "it" : "en");
      const target = preferred.startsWith("it") ? "it" : "en";
      if (target !== i18n.language) {
        i18n.changeLanguage(target);
      }
    } catch {
      // Storage access may fail in certain restricted contexts
    }

    i18n.on("languageChanged", updateDocumentLang);
    return () => {
      i18n.off("languageChanged", updateDocumentLang);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ResonanceProvider>
        {children}
      </ResonanceProvider>
    </ThemeProvider>
  );
}
