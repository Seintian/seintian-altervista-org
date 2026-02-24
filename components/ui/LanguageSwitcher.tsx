import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration errors by ensuring it only renders after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex bg-slate-100 p-1 rounded-full w-[100px] h-[36px] animate-pulse"></div>
        );
    }

    const currentLang = i18n.language || 'en';
    const isIt = currentLang.startsWith('it');

    const toggleLanguage = (lang: string) => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    };

    return (
        <div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-full border border-slate-200/50 shadow-sm relative w-min mb-6">
            <button
                onClick={() => toggleLanguage("it")}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 relative z-10 ${isIt
                        ? "text-blue-700 bg-white shadow-sm ring-1 ring-slate-200"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                aria-pressed={isIt}
                aria-label="Italian"
            >
                IT
            </button>
            <button
                onClick={() => toggleLanguage("en")}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 relative z-10 ${!isIt
                        ? "text-blue-700 bg-white shadow-sm ring-1 ring-slate-200"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                aria-pressed={!isIt}
                aria-label="English"
            >
                EN
            </button>
        </div>
    );
}
