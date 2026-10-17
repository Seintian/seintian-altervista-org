import { siteData, getProjectSlug } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectClientPage, { ProjectType } from "./ProjectClientPage";

// Generate paths for static export
export function generateStaticParams() {
    return siteData.projects.map((project) => ({
        repo: getProjectSlug(project),
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ repo: string }> }) {
    const { repo } = await params;

    // Read project info based on repo param or slug
    const project = siteData.projects.find((p) => getProjectSlug(p) === repo);

    if (!project) {
        notFound();
    }

    return <ProjectClientPage project={project as ProjectType} />;
}
