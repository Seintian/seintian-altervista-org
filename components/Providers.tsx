"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import i18n, { languageDetector } from "@/lib/i18n";
import { ResonanceProvider } from "@/lib/context/ResonanceContext";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const updateDocumentLang = (lng: string) => {
      if (typeof document !== "undefined") {
        document.documentElement.lang = lng.startsWith("it") ? "it" : "en";
      }
    };

    updateDocumentLang(i18n.language || "en");

    // Post-hydration language detection using i18next-browser-languagedetector
    // Runs after React hydration completes to prevent server-client HTML mismatch
    try {
      const detected = languageDetector.detect();
      const rawLang = Array.isArray(detected) ? detected[0] : detected;
      if (rawLang) {
        const target = rawLang.toLowerCase().startsWith("it") ? "it" : "en";
        if (target !== i18n.language) {
          i18n.changeLanguage(target);
        }
        // Cache user language via official detector caching logic
        languageDetector.cacheUserLanguage(target);
      }
    } catch {
      // Safe fallback for restricted storage / security exceptions
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
