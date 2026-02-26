"use client";

import { Terminal } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 transform group-hover:-translate-y-0.5">
                            <div className="absolute inset-0 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                <Terminal className="text-white w-5 h-5 absolute object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            {/* Soft inner glow */}
                            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
                                SEINT<span className="text-blue-600 dark:text-blue-400">IAN</span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5 opacity-80 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                Dev & Architect
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
