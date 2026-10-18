"use client";

import ProjectCard from "@/components/ProjectCard";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { ProjectType } from "@/types/portfolio";
import { useResonance } from "@/lib/context/ResonanceContext";

interface ProjectsSectionProps {
    projects?: ProjectType[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const { selectedTech, clearResonance, matchesTech } = useResonance();

    // Sanitize input to max 100 characters and remove dangerous control chars
    const sanitizedQuery = searchQuery
        .slice(0, 100)
        .replace(/[\x00-\x1F\x7F]/g, "")
        .toLowerCase()
        .trim();

    const filteredProjects = projects?.filter((project) => {
        if (!sanitizedQuery) return true;

        const title = t(project.titleKey).toLowerCase();
        const description = t(project.descriptionKey).toLowerCase();
        const technologies = project.technologies.map((tech) => tech.toLowerCase());
        const category = (project.category || "").toLowerCase();

        return (
            title.includes(sanitizedQuery) ||
            description.includes(sanitizedQuery) ||
            technologies.some((tech) => tech.includes(sanitizedQuery)) ||
            category.includes(sanitizedQuery)
        );
    });

    const matchingCount = projects?.filter((p) => matchesTech(p.technologies)).length || 0;

    return (
        <section id="projects" className="border-t border-slate-200 dark:border-slate-800 pt-24 pb-24 scroll-mt-12 bg-slate-50 dark:bg-transparent -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300">
                            {t("sections.projects.title")}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl transition-colors duration-300">
                            {t("sections.projects.description")}
                        </p>
                    </div>

                    <div className="relative w-full md:w-72 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            maxLength={100}
                            className="block w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder={t("common.search_placeholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                aria-label={t("common.clear_search", "Clear search")}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Topic Filter Active Banner */}
                {selectedTech && (
                    <div className="mb-8 flex items-center justify-between p-3 px-4.5 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2.5">
                            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                {t("projects.resonance_active", "Active filter:")}{" "}
                                <strong className="text-blue-600 dark:text-blue-400 font-semibold">{selectedTech}</strong> ({matchingCount} {t("projects.resonance_count", "matching projects")})
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={clearResonance}
                            className="text-xs font-semibold px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ml-4"
                        >
                            <X className="w-3.5 h-3.5" />
                            <span>{t("projects.resonance_reset", "Clear filter")}</span>
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {filteredProjects?.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={t(project.titleKey)}
                            description={t(project.descriptionKey)}
                            url={project.url}
                            repo={project.repo}
                            slug={project.slug}
                            technologies={project.technologies}
                            origin={project.origin}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
