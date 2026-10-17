"use client";

import { useTranslation } from "react-i18next";
import { Layers, Calendar, UserCheck, Wrench } from "lucide-react";
import { ProjectType } from "@/types/portfolio";

interface ProjectSidebarProps {
    project: ProjectType;
}

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
    const { t } = useTranslation();

    return (
        <aside className="space-y-8 lg:border-l lg:border-slate-200 lg:dark:border-slate-800 lg:pl-10">
            {/* Project Category */}
            <section className="bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        {t("projects.details.type", "Project Category")}
                    </h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium capitalize">
                    {t(`projects.categories.${project.category}`, project.category.replace("-", " "))}
                </p>
            </section>

            {/* Role */}
            {project.roleKey && (
                <section className="bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                        <UserCheck className="w-4 h-4 text-emerald-500" />
                        <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            {t("projects.details.role", "Engineering Role")}
                        </h3>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {t(project.roleKey)}
                    </p>
                </section>
            )}

            {/* Duration */}
            {project.durationKey && (
                <section className="bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            {t("projects.details.duration", "Timeline")}
                        </h3>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {t(project.durationKey)}
                    </p>
                </section>
            )}

            {/* Technologies */}
            <section className="bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
                    <Wrench className="w-4 h-4 text-amber-500" />
                    <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        {t("projects.details.technologies", "Technologies & Tooling")}
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>
        </aside>
    );
}
