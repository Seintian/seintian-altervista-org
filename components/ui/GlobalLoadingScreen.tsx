"use client";

import { useTranslation } from "react-i18next";

export default function Loading() {
    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Main container with explicit sizes to prevent rotation wobble */}
            <div className="relative flex items-center justify-center w-32 h-32">
                {/* Outer animated ring */}
                <div className="absolute w-full h-full rounded-full border-[2px] border-transparent border-t-blue-500 border-r-blue-500 animate-spin" style={{ animationDuration: '3s' }}></div>

                {/* Middle animated ring (spins opposite) */}
                <div className="absolute w-24 h-24 rounded-full border-[2px] border-transparent border-b-purple-500 border-l-purple-500 border-spacing-0" style={{ animation: 'spin 2s linear infinite reverse' }}></div>

                {/* Inner solid pulsating circle */}
                <div className="absolute flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse">
                    {/* Inner glowing core */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-[2px]"></div>
                </div>
            </div>

            {/* Loading text with animated dots */}
            <div className="mt-12 text-lg font-medium tracking-widest text-slate-600 dark:text-slate-400 uppercase animate-pulse">
                {t('loading', 'Loading')}...
            </div>
        </div>
    );
}
