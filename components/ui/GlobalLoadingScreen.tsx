"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function GlobalLoadingScreen() {
    const { t } = useTranslation();
    const [dots, setDots] = useState("");

    // Animate the loading dots
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Main container with glow effect */}
            <div className="relative flex flex-col items-center justify-center">
                {/* Outer animated ring */}
                <div className="absolute inset-0 w-32 h-32 m-auto rounded-full border-t-2 border-r-2 border-transparent border-t-blue-500 animate-spin" style={{ animationDuration: '3s' }}></div>

                {/* Middle animated ring (spins opposite) */}
                <div className="absolute inset-0 w-24 h-24 m-auto rounded-full border-b-2 border-l-2 border-transparent border-b-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>

                {/* Inner solid pulsating circle */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse">
                    {/* Inner glowing core */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-[2px]"></div>
                </div>
            </div>

            {/* Loading text with animated dots */}
            <div className="mt-12 text-lg font-medium tracking-widest text-slate-600 dark:text-slate-400 uppercase animate-pulse">
                {t('loading', 'Loading')}{dots}
                <span className="invisible text-transparent" aria-hidden="true">...</span> {/* Stabilizes the width */}
            </div>

            {/* Sub-text or progress bar placeholder */}
            <div className="mt-4 w-48 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-[progress_2s_ease-in-out_infinite_alternate] w-1/2"></div>
            </div>

            <style jsx>{`
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
}
