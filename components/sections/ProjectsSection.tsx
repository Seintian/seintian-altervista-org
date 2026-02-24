import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/Skeleton";

interface ProjectsSectionProps {
    projects?: Array<{
        id: string;
        title: string;
        description: string;
        url?: string;
        repo?: string;
        technologies: string[];
    }>;
    isLoading?: boolean;
}

export default function ProjectsSection({ projects, isLoading }: ProjectsSectionProps) {
    return (
        <section id="projects" className="border-t border-slate-200 pt-24 pb-24 scroll-mt-12 bg-slate-50 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        A selection of my best work spanning enterprise web apps, low-level system libraries, and academic platforms.
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
                                title={project.title}
                                description={project.description}
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
