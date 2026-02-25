"use client"

import { useTranslation } from "react-i18next";
import { ArrowLeft, ExternalLink, FileText, Video } from "lucide-react";
import Link from "next/link";
import GlobalLoadingScreen from "@/components/ui/GlobalLoadingScreen";
import { useEffect, useState } from "react";

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

// Matches the Type from siteData
export interface ProjectType {
    id: string;
    titleKey: string;
    descriptionKey: string;
    url?: string;
    repo?: string;
    technologies: string[];
    category: string;
    coverImage?: string;
    themeColor?: 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'slate';
    roleKey?: string;
    durationKey?: string;
    customLinks?: {
        labelKey: string;
        url: string;
        icon?: 'document' | 'video' | 'link';
    }[];
}

// Utility to map themeColor to Tailwind gradients
const getThemeGradient = (color?: string) => {
    switch (color) {
        case 'emerald':
            return 'from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500';
        case 'purple':
            return 'from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500';
        case 'amber':
            return 'from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500';
        case 'rose':
            return 'from-rose-500 to-red-600 dark:from-rose-400 dark:to-red-500';
        case 'slate':
            return 'from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-600';
        case 'blue':
        default:
            return 'from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400';
    }
};

// Utility to render the correct icon for custom links
const getCustomIcon = (iconStr?: string, className?: string) => {
    switch (iconStr) {
        case 'document':
            return <FileText className={className} />;
        case 'video':
            return <Video className={className} />;
        case 'link':
        default:
            return <ExternalLink className={className} />;
    }
};

export default function ProjectClientPage({ project }: { project: ProjectType }) {
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <GlobalLoadingScreen />;
    }

    return (
        <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 md:py-24">
            {/* Back Button */}
            <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-12"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
            </Link>

            {/* Hero Section */}
            <div className="space-y-6 mb-16">
                {project.coverImage && (
                    <div className="w-full h-48 md:h-80 rounded-2xl overflow-hidden mb-8 ring-1 ring-slate-200 dark:ring-slate-800">
                        <img
                            src={project.coverImage}
                            alt={t(project.titleKey)}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                )}

                <h1 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent pb-2 lg:pb-3 leading-snug lg:leading-normal bg-linear-to-r ${getThemeGradient(project.themeColor)}`}>
                    {t(project.titleKey)}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                    {t(project.descriptionKey)}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4">
                    {project.technologies?.map((tech, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                    {project.repo && (
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-full font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                        >
                            <GithubIcon className="w-5 h-5" />
                            {t('common.github_repo')}
                        </a>
                    )}
                    {project.url && (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                            {t('common.live_demo')}
                        </a>
                    )}

                    {/* Custom Links */}
                    {project.customLinks?.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                        >
                            {getCustomIcon(link.icon, "w-5 h-5")}
                            {t(link.labelKey)}
                        </a>
                    ))}
                </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-slate-200 dark:border-slate-800">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
                            Overview
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                            <p>
                                {/* Dynamically lookup the longDescription key */}
                                {t(`projects.${project.id}.longDescription`, { defaultValue: t(project.descriptionKey) })}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
                            Key Features
                        </h2>
                        <ul className="space-y-3">
                            {(t(`projects.${project.id}.features`, { returnObjects: true, defaultValue: [] }) as string[]).map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-500 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* New Technical Sections */}
                    {(t(`projects.${project.id}.theory`, { returnObjects: true, defaultValue: [] }) as string[]).length > 0 && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
                                Theory & Foundation
                            </h2>
                            <ul className="space-y-3">
                                {(t(`projects.${project.id}.theory`, { returnObjects: true }) as string[]).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 mt-2 rounded-full bg-purple-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {(t(`projects.${project.id}.implementation`, { returnObjects: true, defaultValue: [] }) as string[]).length > 0 && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
                                Technical Implementation
                            </h2>
                            <ul className="space-y-3">
                                {(t(`projects.${project.id}.implementation`, { returnObjects: true }) as string[]).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 mt-2 rounded-full shrink-0 ring-1 ring-emerald-500 bg-emerald-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Sidebar Info maybe? */}
                <div className="space-y-8 lg:border-l lg:border-slate-200 lg:dark:border-slate-800 lg:pl-12">
                    {/* Add more specific fields here later if you want, e.g. timeframe, team size */}
                    <section>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3">{t('projects.details.type', { defaultValue: 'Project Type' })}</h3>
                        <p className="text-slate-600 dark:text-slate-300 capitalize">
                            {t(`projects.categories.${project.category}`, { defaultValue: project.category.replace("-", " ") })}
                        </p>
                    </section>

                    {project.roleKey && (
                        <section>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3">{t('projects.details.role', { defaultValue: 'My Role' })}</h3>
                            <p className="text-slate-600 dark:text-slate-300">{t(project.roleKey)}</p>
                        </section>
                    )}

                    {project.durationKey && (
                        <section>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3">{t('projects.details.duration', { defaultValue: 'Duration' })}</h3>
                            <p className="text-slate-600 dark:text-slate-300">{t(project.durationKey)}</p>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
