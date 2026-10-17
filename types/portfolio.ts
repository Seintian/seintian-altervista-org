export type OriginType = "university" | "personal" | "freelance";

export type ThemeColor =
    | "blue"
    | "emerald"
    | "purple"
    | "amber"
    | "rose"
    | "slate"
    | "red"
    | "indigo"
    | "cyan";

export interface CustomLink {
    labelKey: string;
    url: string;
    icon?: "document" | "video" | "link" | "external";
}

export interface ProjectType {
    id: string;
    slug?: string;
    titleKey: string;
    descriptionKey: string;
    url?: string;
    repo?: string;
    technologies: string[];
    category: "featured" | "core-cs" | "web" | string;
    origin?: OriginType;
    coverImage?: string;
    themeColor?: ThemeColor;
    roleKey?: string;
    durationKey?: string;
    customLinks?: CustomLink[];
}

export type SkillTier = "advanced" | "proficient" | "familiar";

export interface Skill {
    id: string;
    name: string;
    level: number;
}

export interface SkillsMatrix {
    languages: Skill[];
    frontend: Skill[];
    backend: Skill[];
    core: Skill[];
    tools: Skill[];
}

export interface ExperienceItem {
    id: string;
    roleKey: string;
    companyKey: string;
    periodKey: string;
    descriptionKey: string;
    technologies: string[];
}

export interface EducationItem {
    id: string;
    degreeKey: string;
    schoolKey: string;
    locationKey: string;
    periodKey: string;
    thesisKey?: string;
    descriptionKey?: string;
}

export interface ContactItem {
    id: string;
    labelKey: string;
    url: string;
    isPrimary: boolean;
    localizedUrls?: {
        en: string;
        it: string;
    };
}

export interface BentoModule {
    id: string;
    titleKey: string;
    descriptionKey: string;
    href: string;
    colSpan: string;
    rowSpan: string;
}

export interface SiteData {
    contacts: ContactItem[];
    modules: BentoModule[];
    skills: SkillsMatrix;
    experience: ExperienceItem[];
    education: EducationItem[];
    certificationsKeys: string[];
    projects: ProjectType[];
}
