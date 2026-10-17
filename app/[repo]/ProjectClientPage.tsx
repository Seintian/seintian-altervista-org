"use client";

import { ProjectType } from "@/types/portfolio";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectFeatures from "@/components/project/ProjectFeatures";
import ProjectTheory from "@/components/project/ProjectTheory";
import ProjectImplementation from "@/components/project/ProjectImplementation";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import TelemetryInteractiveDemo from "@/components/project/TelemetryInteractiveDemo";

export type { ProjectType };

export default function ProjectClientPage({ project }: { project: ProjectType }) {
    const isYatal = project.id === "proj-yatal";

    return (
        <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 md:py-24">
            <ProjectHeader project={project} />

            {/* Interactive Telemetry & Systems Architecture Lab for YATAL */}
            {isYatal && <TelemetryInteractiveDemo />}

            {/* Main Content & Sidebar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="lg:col-span-2 space-y-8">
                    <ProjectOverview project={project} />
                    <ProjectFeatures project={project} />
                    <ProjectTheory project={project} />
                    <ProjectImplementation project={project} />
                </div>

                <ProjectSidebar project={project} />
            </div>
        </main>
    );
}
