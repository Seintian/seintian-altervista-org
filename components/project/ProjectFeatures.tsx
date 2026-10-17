"use client";

import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { ProjectType } from "@/types/portfolio";

interface ProjectFeaturesProps {
    project: ProjectType;
}

export default function ProjectFeatures({ project }: ProjectFeaturesProps) {
    const { t } = useTranslation();

    const rawFeatures = t(`projects.${project.id}.features`, {
        returnObjects: true,
        defaultValue: []
    });

    const features = Array.isArray(rawFeatures) ? (rawFeatures as string[]) : [];

    if (features.length === 0) return null;

    return (
        <section className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                {t("projects.details.features", "Key Features")}
            </h2>
            <ul className="space-y-4">
                {features.map((feature, idx) => (
                    <li
                        key={idx}
                        className="flex items-start gap-3.5 text-slate-700 dark:text-slate-300 leading-relaxed group"
                    >
                        <span className="w-2 h-2 mt-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform shrink-0" />
                        <span className="text-base sm:text-lg">{feature}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
