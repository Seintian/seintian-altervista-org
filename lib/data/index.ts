import { SiteData, ProjectType } from "@/types/portfolio";
import { contacts, getLocalizedCvUrl } from "./contacts";
import { modules } from "./modules";
import { skills } from "./skills";
import { experience } from "./experience";
import { education, certificationsKeys } from "./education";
import { projects } from "./projects";

export function getProjectSlug(project: { id: string; repo?: string; slug?: string }): string {
    if (project.slug) return project.slug;
    if (project.repo) {
        const repoName = project.repo.split("/").pop();
        if (repoName) return repoName;
    }
    return project.id;
}

export function getProjectBySlug(slug: string): ProjectType | undefined {
    return projects.find((p) => getProjectSlug(p) === slug);
}

export const siteData: SiteData = {
    contacts,
    modules,
    skills,
    experience,
    education,
    certificationsKeys,
    projects
};

export {
    contacts,
    getLocalizedCvUrl,
    modules,
    skills,
    experience,
    education,
    certificationsKeys,
    projects
};
