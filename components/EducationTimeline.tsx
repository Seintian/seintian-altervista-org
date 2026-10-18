"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EducationItem } from "@/types/portfolio";
import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

interface EducationTimelineProps {
    education?: EducationItem[];
    certifications?: string[];
}

export default function EducationTimeline({ education, certifications }: EducationTimelineProps) {
    const { t } = useTranslation();
    const timelineRef = useRef<HTMLOListElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const startOffset = windowHeight * 0.7;
            const totalHeight = rect.height;
            if (totalHeight === 0) return;
            const currentProgress = (startOffset - rect.top) / totalHeight;
            const clamped = Math.min(Math.max(currentProgress, 0), 1);
            setScrollProgress(clamped * 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [education]);

    if (!education) {
        return null;
    }

    return (
        <div className="relative max-w-3xl mx-auto">
            {/* Background Static Line */}
            <div className="absolute top-2 bottom-6 start-[11px] md:start-[7px] w-0.5 bg-slate-200 dark:border-slate-800 transition-colors duration-300" />

            {/* Dynamic Animated Scroll-Linked Progress Line */}
            <div
                className="absolute top-2 start-[11px] md:start-[7px] w-0.5 bg-linear-to-b from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(59,130,246,0.6)] z-0 rounded-full"
                style={{ height: `${scrollProgress}%` }}
            />

            <ol ref={timelineRef} className="relative ml-3 md:ml-0 mb-12 transition-colors duration-300 z-10">
                {education.map((edu, idx) => {
                    const nodePercentage = (idx / (education.length - 1 || 1)) * 95;
                    const isActivated = scrollProgress >= nodePercentage;

                    return (
                        <li key={edu.id} className="mb-12 ms-8 group relative">
                            {/* The Timeline Dot */}
                            <span
                                className={`absolute flex items-center justify-center w-4 h-4 rounded-full -start-[27px] md:-start-[27px] ring-4 transition-all duration-300 ${
                                    isActivated
                                        ? "border-2 border-white dark:border-slate-900 bg-blue-600 dark:bg-blue-500 ring-blue-500/20 shadow-sm"
                                        : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 ring-slate-100 dark:ring-slate-900 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:ring-blue-50 dark:group-hover:ring-blue-900/30"
                                }`}
                            />

                            {/* Content Card */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                                    {t(edu.degreeKey)}
                                </h3>
                                <time className={`text-sm font-medium mt-1 sm:mt-0 transition-colors duration-300 ${isActivated ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`}>
                                    {t(edu.periodKey)}
                                </time>
                            </div>

                            <div className="text-blue-600 dark:text-blue-400 font-medium mb-1 transition-colors duration-300">
                                {t(edu.schoolKey)}
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 mb-2 transition-colors duration-300">
                                {t(edu.locationKey)}
                            </p>

                            {/* Thesis & Graduation Research Highlight */}
                            {edu.thesisKey && (
                                <div className="mt-4 p-5 bg-blue-50/70 dark:bg-blue-950/25 border border-blue-200/80 dark:border-blue-900/50 rounded-2xl transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-md group/thesis">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                            <GraduationCap className="w-4 h-4" />
                                            <span>{t("common.thesis", "Bachelor's Thesis / Graduation Research")}</span>
                                        </div>
                                        <Link
                                            href="/yatal"
                                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline group-hover/thesis:translate-x-0.5 transition-transform"
                                        >
                                            <span>YATAL Project Dossier</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                    <div className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                        {t(edu.thesisKey)}
                                    </div>
                                    {edu.descriptionKey && (
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {t(edu.descriptionKey)}
                                        </p>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>

            {certifications && certifications.length > 0 && (
                <div className="mt-8 ms-3 md:ms-0">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300">{t("common.certifications")}</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 transition-colors duration-300">
                        {certifications.map((certKey, idx) => (
                            <li key={idx}>{t(certKey)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
