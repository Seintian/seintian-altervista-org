import { siteData } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectClientPage, { ProjectType } from "./ProjectClientPage";

// Generate paths for static export
export function generateStaticParams() {
    return siteData.projects.map((project) => {
        // Extract the repo name from the github url
        const repoName = project.repo?.split("/").pop() || "";
        return {
            repo: repoName,
        };
    }).filter(param => param.repo !== "");
}

export default async function ProjectPage({ params }: { params: Promise<{ repo: string }> }) {
    const { repo } = await params;

    // Read project info based on repo param
    const project = siteData.projects.find((p) => {
        const pRepoName = p.repo?.split("/").pop();
        return pRepoName === repo;
    });

    if (!project) {
        notFound();
    }

    return <ProjectClientPage project={project as ProjectType} />;
}
