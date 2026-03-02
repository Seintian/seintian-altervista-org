"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-900 animate-pulse" />;
    }

    const cycleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    };

    const getIcon = () => {
        if (theme === "light") return <Sun className="w-[18px] h-[18px]" />;
        if (theme === "dark") return <Moon className="w-[18px] h-[18px]" />;
        return <Monitor className="w-[18px] h-[18px]" />;
    };

    const getAriaLabel = () => {
        if (theme === "light") return t("theme.light", "Light mode");
        if (theme === "dark") return t("theme.dark", "Dark mode");
        return t("theme.system", "System theme");
    };

    return (
        <button
            onClick={cycleTheme}
            className="flex items-center justify-center h-10 w-10 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300 text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 cursor-pointer"
            aria-label={getAriaLabel()}
            title={getAriaLabel()}
        >
            {getIcon()}
        </button>
    );
}
