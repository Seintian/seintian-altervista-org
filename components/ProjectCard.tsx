import { ExternalLink, GraduationCap, User, Briefcase } from "lucide-react";
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
    origin?: "university" | "personal" | "freelance";
}

const ORIGIN_CONFIG = {
    university: {
        accentText: "text-indigo-600 dark:text-indigo-400",
        titleHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-slate-900 dark:text-slate-100",
        borderHover: "hover:border-indigo-300 dark:hover:border-indigo-700",
        shadowHover: "hover:shadow-indigo-900/20 hover:shadow-xl",
        ringFocus: "focus-within:ring-indigo-500",
        bgHover: "group-hover:from-indigo-50 dark:group-hover:from-indigo-900/20",
        watermarkHover: "group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:opacity-10 dark:group-hover:opacity-20",
        techBadge: "text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200/50 dark:border-indigo-800/50",
        linkHover: "hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30",
        icon: GraduationCap,
    },
    personal: {
        accentText: "text-emerald-600 dark:text-emerald-400",
        titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400 text-slate-900 dark:text-slate-100",
        borderHover: "hover:border-emerald-300 dark:hover:border-emerald-700",
        shadowHover: "hover:shadow-emerald-900/20 hover:shadow-xl",
        ringFocus: "focus-within:ring-emerald-500",
        bgHover: "group-hover:from-emerald-50 dark:group-hover:from-emerald-900/20",
        watermarkHover: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:opacity-10 dark:group-hover:opacity-20",
        techBadge: "text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/50",
        linkHover: "hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30",
        icon: User,
    },
    freelance: {
        accentText: "text-amber-600 dark:text-amber-500",
        titleHover: "group-hover:text-amber-600 dark:group-hover:text-amber-500 text-slate-900 dark:text-slate-100",
        borderHover: "hover:border-amber-300 dark:hover:border-amber-700",
        shadowHover: "hover:shadow-amber-900/20 hover:shadow-xl",
        ringFocus: "focus-within:ring-amber-500",
        bgHover: "group-hover:from-amber-50 dark:group-hover:from-amber-900/20",
        watermarkHover: "group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:opacity-10 dark:group-hover:opacity-20",
        techBadge: "text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-900/20 border-amber-200/50 dark:border-amber-800/50",
        linkHover: "hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30",
        icon: Briefcase,
    },
    default: {
        accentText: "text-blue-600 dark:text-blue-400",
        titleHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400 text-slate-900 dark:text-slate-100",
        borderHover: "hover:border-blue-300 dark:hover:border-blue-700",
        shadowHover: "hover:shadow-blue-900/20 hover:shadow-xl",
        ringFocus: "focus-within:ring-blue-500",
        bgHover: "group-hover:from-blue-50 dark:group-hover:from-blue-900/20",
        watermarkHover: "group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:opacity-10 dark:group-hover:opacity-20",
        techBadge: "text-blue-700 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-800/50",
        linkHover: "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30",
        icon: undefined,
    }
} as const;

export default function ProjectCard({ title, description, url, repo, technologies, origin }: ProjectCardProps) {
    const repoSlug = repo?.split("/").pop();
    const { t } = useTranslation();

    const config = origin ? ORIGIN_CONFIG[origin] : ORIGIN_CONFIG.default;
    const Icon = config.icon;

    return (
        <div className={`flex flex-col h-full bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-all duration-500 group relative overflow-hidden isolate focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-950 ${config.borderHover} ${config.shadowHover} ${config.ringFocus}`}>
            {/* Subtle background gradient on hover */}
            <div className={`absolute inset-0 bg-linear-to-br ${config.bgHover} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-20`} />

            {/* Watermark Icon */}
            {Icon && (
                <Icon 
                    strokeWidth={1}
                    className={`absolute -right-8 -bottom-8 w-56 h-56 transform -rotate-12 pointer-events-none transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3 -z-10 text-slate-100 dark:text-slate-800/50 ${config.watermarkHover} opacity-50`} 
                />
            )}

            <div className="flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        {origin && Icon && (
                            <div className={`flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest mb-2.5 ${config.accentText} opacity-80 group-hover:opacity-100 transition-opacity h-5`}>
                                <Icon className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                                <span className="leading-5 pt-px">{t(`projects.origins.${origin}`)}</span>
                            </div>
                        )}
                        <h3 className={`text-xl font-bold transition-colors duration-300 leading-tight ${config.titleHover}`}>
                            {repoSlug ? (
                                <Link href={`/${repoSlug}`} className="focus:outline-none before:absolute before:inset-0 before:z-10 text-inherit hover:text-inherit">
                                    {title}
                                </Link>
                            ) : (
                                title
                            )}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 h-7 ml-4 relative z-20">
                        {repo && (
                            <Link
                                href={repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                aria-label={t("common.github_repo", "GitHub Repository")}
                            >
                                <GithubIcon className="w-5 h-5 shrink-0" />
                            </Link>
                        )}
                        {url && (
                            <Link
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center w-8 h-8 rounded-full text-slate-400 dark:text-slate-500 transition-colors cursor-pointer ${config.linkHover}`}
                                aria-label={t("common.live_demo", "Live Demo")}
                            >
                                <ExternalLink className="w-5 h-5 shrink-0" />
                            </Link>
                        )}
                    </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400/90 mb-8 grow transition-colors duration-300 text-sm sm:text-base leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto relative z-20">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className={`px-3 py-1 text-[0.72rem] font-semibold tracking-wide rounded-full border transition-colors duration-500 ${config.techBadge}`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
