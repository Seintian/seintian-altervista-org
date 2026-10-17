"use client";

import { useTranslation } from "react-i18next";
import { ProjectType } from "@/types/portfolio";

interface ProjectOverviewProps {
    project: ProjectType;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
    const { t } = useTranslation();

    const overviewText = t(`projects.${project.id}.longDescription`, {
        defaultValue: t(project.descriptionKey)
    });

    return (
        <section className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50">
                {t("projects.details.overview", "Overview")}
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                <p>{overviewText}</p>
            </div>
        </section>
    );
}
