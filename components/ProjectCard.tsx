import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function GithubIcon({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            {...props}
            className={`inline-block bg-current ${className}`}
            style={{
                ...props.style,
                maskImage: 'url(/icons/github.svg)',
                WebkitMaskImage: 'url(/icons/github.svg)',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center'
            }}
            title="GitHub"
            role="img"
        />
    );
}

interface ProjectCardProps {
    title: string;
    description: string;
    url?: string;
    repo?: string;
    technologies: string[];
}

export default function ProjectCard({ title, description, url, repo, technologies }: ProjectCardProps) {
    const repoSlug = repo?.split("/").pop();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 group relative overflow-hidden isolate focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-950">
            {/* Subtle background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 dark:from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

            <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {repoSlug ? (
                            <Link href={`/${repoSlug}`} className="focus:outline-none before:absolute before:inset-0 before:z-10 text-inherit hover:text-inherit">
                                {title}
                            </Link>
                        ) : (
                            title
                        )}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0 h-7 relative z-20">
                        {repo && (
                            <Link
                                href={repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                aria-label={t("common.github_repo", "GitHub Repository")}
                            >
                                <GithubIcon className="w-5 h-5 flex-shrink-0" />
                            </Link>
                        )}
                        {url && (
                            <Link
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                                aria-label={t("common.live_demo", "Live Demo")}
                            >
                                <ExternalLink className="w-5 h-5 flex-shrink-0" />
                            </Link>
                        )}
                    </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow transition-colors duration-300">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800 transition-colors duration-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
