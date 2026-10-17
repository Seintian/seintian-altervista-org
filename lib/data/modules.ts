import { BentoModule } from "@/types/portfolio";

export const modules: BentoModule[] = [
    {
        id: "experience",
        titleKey: "modules.experience.title",
        descriptionKey: "modules.experience.description",
        href: "#experience",
        colSpan: "md:col-span-2",
        rowSpan: "md:row-span-1"
    },
    {
        id: "projects",
        titleKey: "modules.projects.title",
        descriptionKey: "modules.projects.description",
        href: "#projects",
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-2"
    },
    {
        id: "education",
        titleKey: "modules.education.title",
        descriptionKey: "modules.education.description",
        href: "#education",
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1"
    },
    {
        id: "skills",
        titleKey: "modules.skills.title",
        descriptionKey: "modules.skills.description",
        href: "#skills",
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1"
    }
];
