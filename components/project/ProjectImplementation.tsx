"use client";

import { useTranslation } from "react-i18next";
import { Cpu } from "lucide-react";
import { ProjectType } from "@/types/portfolio";

interface ProjectImplementationProps {
    project: ProjectType;
}

export default function ProjectImplementation({ project }: ProjectImplementationProps) {
    const { t } = useTranslation();

    const rawImplementation = t(`projects.${project.id}.implementation`, {
        returnObjects: true,
        defaultValue: []
    });

    const items = Array.isArray(rawImplementation) ? (rawImplementation as string[]) : [];

    if (items.length === 0) return null;

    return (
        <section className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-emerald-500" />
                {t("projects.details.implementation", "Technical Implementation & Systems Architecture")}
            </h2>
            <ul className="space-y-4">
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="flex items-start gap-3.5 text-slate-700 dark:text-slate-300 leading-relaxed group"
                    >
                        <span className="w-2 h-2 mt-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 group-hover:scale-125 transition-transform shrink-0" />
                        <span className="text-base sm:text-lg">{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
