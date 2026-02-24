import ProjectCard from "@/components/ProjectCard";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Search, X } from "lucide-react";

interface ProjectsSectionProps {
    projects?: Array<{
        id: string;
        titleKey: string;
        descriptionKey: string;
        url?: string;
        repo?: string;
        technologies: string[];
        category?: string;
    }>;
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects?.filter((project) => {
        const query = searchQuery.toLowerCase();
        const title = t(project.titleKey).toLowerCase();
        const technologies = project.technologies.map(tech => tech.toLowerCase());
        const category = project.category?.toLowerCase() || "";

        return (
            title.includes(query) ||
            technologies.some(tech => tech.includes(query)) ||
            category.includes(query)
        );
    });

    return (
        <section id="projects" className="border-t border-slate-200 dark:border-slate-800 pt-24 pb-24 scroll-mt-12 bg-slate-50 dark:bg-transparent -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300">{t("sections.projects.title")}</h2>
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
                            className="block w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder={t("common.search_placeholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {filteredProjects?.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={t(project.titleKey)}
                            description={t(project.descriptionKey)}
                            url={project.url}
                            repo={project.repo}
                            technologies={project.technologies}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
