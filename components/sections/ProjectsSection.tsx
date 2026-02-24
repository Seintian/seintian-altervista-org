import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/Skeleton";
import { useTranslation } from "react-i18next";

interface ProjectsSectionProps {
    projects?: Array<{
        id: string;
        titleKey: string;
        descriptionKey: string;
        url?: string;
        repo?: string;
        technologies: string[];
    }>;
    isLoading?: boolean;
}

export default function ProjectsSection({ projects, isLoading }: ProjectsSectionProps) {
    const { t } = useTranslation();

    return (
        <section id="projects" className="border-t border-slate-200 dark:border-slate-800 pt-24 pb-24 scroll-mt-12 bg-slate-50 dark:bg-transparent -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300">{t("sections.projects.title")}</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl transition-colors duration-300">
                        {t("sections.projects.description")}
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-64 w-full rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        {projects?.map((project) => (
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
                )}
            </div>
        </section>
    );
}
