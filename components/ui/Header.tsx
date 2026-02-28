"use client";

import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t } = useTranslation();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-10 h-10 transition-all duration-300 transform-gpu group-hover:-translate-y-0.5">
                            <div className="absolute inset-0 transition-transform duration-500 transform-gpu group-hover:rotate-12 group-hover:scale-110 will-change-transform rounded-[9px] shadow-sm group-hover:shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-full h-full block">
                                    <rect width="256" height="256" rx="56" className="fill-slate-50 dark:fill-slate-800 transition-colors duration-300" />
                                    <text x="28" y="195" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="160" textRendering="geometricPrecision" style={{ willChange: "transform", WebkitFontSmoothing: "antialiased", transform: "translateZ(0)" }} className="fill-blue-600 dark:fill-blue-400 transition-colors duration-300">S</text>
                                    <path d="M 138 210 L 188 46 L 228 46 L 178 210 Z" className="fill-slate-900 dark:fill-slate-50 transition-colors duration-300" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
                                SEINT<span className="text-blue-600 dark:text-blue-400">IAN</span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5 opacity-80 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {t("common.header_subtitle", "Software Engineer")}
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Actions Section */}
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>

            </div>
        </header>
    );
}
