"use client";

import { formatCodeSpans } from "@/lib/formatText";

import { useTranslation } from "react-i18next";
import { BookOpen } from "lucide-react";
import { ProjectType } from "@/types/portfolio";

interface ProjectTheoryProps {
    project: ProjectType;
}

export default function ProjectTheory({ project }: ProjectTheoryProps) {
    const { t } = useTranslation();

    const rawTheory = t(`projects.${project.id}.theory`, {
        returnObjects: true,
        defaultValue: []
    });

    const theory = Array.isArray(rawTheory) ? (rawTheory as string[]) : [];

    if (theory.length === 0) return null;

    return (
        <section className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50 flex items-center gap-2.5 -ml-2">
                <BookOpen className="w-6 h-6 text-purple-500 shrink-0" />
                {t("projects.details.theory", "Theory & Computer Science Foundations")}
            </h2>
            <ul className="space-y-4">
                {theory.map((item, idx) => (
                    <li
                        key={idx}
                        className="flex items-start gap-3.5 text-slate-700 dark:text-slate-300 leading-relaxed group"
                    >
                        <span className="w-2 h-2 mt-2.5 rounded-full bg-purple-500 group-hover:scale-125 transition-transform shrink-0" />
                        <span className="text-sm sm:text-[15px]">{formatCodeSpans(item)}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
