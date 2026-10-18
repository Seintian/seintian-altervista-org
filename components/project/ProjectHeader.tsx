"use client";

import { formatCodeSpans } from "@/lib/formatText";

import { useTranslation } from "react-i18next";
import { ArrowLeft, ExternalLink, FileText, Video, GraduationCap, User, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProjectType, ThemeColor } from "@/types/portfolio";

function GithubIcon({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            {...props}
            className={`inline-block bg-current ${className}`}
            style={{
                ...props.style,
                maskImage: "url(/icons/github.svg)",
                WebkitMaskImage: "url(/icons/github.svg)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center"
            }}
            title="GitHub"
            role="img"
        />
    );
}

const getThemeGradient = (color?: ThemeColor) => {
    switch (color) {
        case "emerald":
            return "from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500";
        case "purple":
            return "from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500";
        case "amber":
            return "from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500";
        case "rose":
            return "from-rose-500 to-red-600 dark:from-rose-400 dark:to-red-500";
        case "slate":
            return "from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-600";
        case "red":
            return "from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400";
        case "indigo":
            return "from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400";
        case "cyan":
            return "from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400";
        case "blue":
        default:
            return "from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400";
    }
};

const getCustomIcon = (iconStr?: string, className?: string) => {
    switch (iconStr) {
        case "document":
            return <FileText className={className} />;
        case "video":
            return <Video className={className} />;
        case "link":
        case "external":
        default:
            return <ExternalLink className={className} />;
    }
};

const renderOriginIcon = (origin?: string, className = "w-3.5 h-3.5") => {
    switch (origin) {
        case "university":
            return <GraduationCap className={className} />;
        case "personal":
            return <User className={className} />;
        case "freelance":
            return <Briefcase className={className} />;
        default:
            return null;
    }
};

interface ProjectHeaderProps {
    project: ProjectType;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 mb-16">
            {/* Back to Portfolio Link */}
            <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                {t("common.back_to_portfolio", "Back to Portfolio")}
            </Link>

            {/* Optional Cover Image */}
            {project.coverImage && (
                <div className="w-full h-48 md:h-80 rounded-2xl overflow-hidden mb-8 ring-1 ring-slate-200 dark:ring-slate-800 relative">
                    <Image
                        src={project.coverImage}
                        alt={t(project.titleKey)}
                        width={1200}
                        height={600}
                        unoptimized
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            )}

            {/* Origin & Category Badges */}
            <div className="flex flex-wrap items-center gap-3">
                {project.origin && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {renderOriginIcon(project.origin)}
                        {t(`projects.origins.${project.origin}`, project.origin)}
                    </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
                    {t(`projects.categories.${project.category}`, project.category.replace("-", " "))}
                </span>
            </div>

            {/* Main Title */}
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent pb-2 lg:pb-3 leading-snug lg:leading-normal bg-linear-to-r ${getThemeGradient(project.themeColor)}`}>
                {t(project.titleKey)}
            </h1>

            {/* Short Tagline / Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {formatCodeSpans(t(project.descriptionKey))}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
                {project.repo && (
                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-full font-medium hover:bg-slate-800 dark:hover:bg-slate-200 shadow-md hover:shadow-lg transition-all"
                        aria-label={t("common.github_repo", "GitHub Repository")}
                    >
                        <GithubIcon className="w-5 h-5" />
                        {t("common.github_repo", "GitHub Repository")}
                    </a>
                )}
                {project.url && (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
                        aria-label={t("common.live_demo", "Live Demo")}
                    >
                        <ExternalLink className="w-5 h-5" />
                        {t("common.live_demo", "Live Demo")}
                    </a>
                )}

                {/* Custom Links */}
                {project.customLinks?.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                        aria-label={t(link.labelKey)}
                    >
                        {getCustomIcon(link.icon, "w-5 h-5")}
                        {t(link.labelKey)}
                    </a>
                ))}
            </div>
        </div>
    );
}
