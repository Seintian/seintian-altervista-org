"use client";

import { useTranslation } from "react-i18next";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function LanguageSwitcher() {
    const { i18n, t } = useTranslation();
    const mounted = useIsMounted();

    if (!mounted) {
        return (
            <div className="flex bg-slate-100 dark:bg-slate-900 rounded-full w-[48px] h-10 animate-pulse" />
        );
    }

    const currentLang = i18n.language || "en";
    const isIt = currentLang.startsWith("it");

    const toggleLanguage = () => {
        const nextLang = isIt ? "en" : "it";
        i18n.changeLanguage(nextLang);
        try {
            localStorage.setItem("i18nextLng", nextLang);
        } catch {
            // Storage access fallback
        }
    };

    const labelText = isIt ? t("common.switch_to_en", "Switch to English") : t("common.switch_to_it", "Passa all'italiano");

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center justify-center h-10 px-3 min-w-[48px] bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300 text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 cursor-pointer"
            aria-label={labelText}
            title={labelText}
        >
            {isIt ? "IT" : "EN"}
        </button>
    );
}
