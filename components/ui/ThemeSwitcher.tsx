"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-8 w-[130px]" />;
    }

    return (
        <div className="flex bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm p-1 rounded-full border border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-colors duration-300">
            <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center h-8 w-10 text-sm font-medium rounded-full transition-all duration-200 ${theme === "light"
                    ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                    }`}
                aria-label="Light mode"
            >
                <Sun className="w-4 h-4" />
            </button>

            <button
                onClick={() => setTheme("system")}
                className={`flex items-center justify-center h-8 w-10 text-sm font-medium rounded-full transition-all duration-200 ${theme === "system"
                    ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                    }`}
                aria-label="System theme"
            >
                <Monitor className="w-4 h-4" />
            </button>

            <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center h-8 w-10 text-sm font-medium rounded-full transition-all duration-200 ${theme === "dark"
                    ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                    }`}
                aria-label="Dark mode"
            >
                <Moon className="w-4 h-4" />
            </button>
        </div>
    );
}
