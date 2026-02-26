// This file contains content structured via keys to be handled by i18next via useTranslation() hook in React Components
export const siteData = {
    contacts: [
        { id: "email", labelKey: "contacts.email", url: "mailto:seintian@altervista.org", isPrimary: true },
        { id: "github", labelKey: "contacts.github", url: "https://github.com/Seintian", isPrimary: false },
        { id: "linkedin", labelKey: "contacts.linkedin", url: "https://linkedin.com/in/christian-santarelli-4290ab19a/", isPrimary: false },
        { id: "cv", labelKey: "contacts.cv", url: "/cv.pdf", isPrimary: false }
    ],
    // The Bento Box Navigation Modules
    modules: [
        {
            id: "experience",
            titleKey: "modules.experience.title",
            descriptionKey: "modules.experience.description",
            href: "#experience",
            colSpan: "md:col-span-2", // Takes up 2 columns on desktop
            rowSpan: "md:row-span-1"
        },
        {
            id: "projects",
            titleKey: "modules.projects.title",
            descriptionKey: "modules.projects.description",
            href: "#projects",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-2"  // Taller card
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
    ],
    // The Skills Matrix
    skills: {
        languages: [
            { id: "java", name: "Java", level: 90 },
            { id: "c", name: "C", level: 85 },
            { id: "cs", name: "C#", level: 80 },
            { id: "js-ts", name: "JS / TS", level: 90 },
            { id: "php", name: "PHP", level: 75 },
            { id: "python", name: "Python", level: 80 }
        ],
        frontend: [
            { id: "react", name: "React", level: 90 },
            { id: "nextjs", name: "Next.js", level: 85 },
            { id: "tailwind", name: "Tailwind CSS", level: 90 },
            { id: "html-css", name: "HTML / CSS", level: 95 }
        ],
        backend: [
            { id: "spring", name: "Spring Boot", level: 85 },
            { id: "postgres", name: "PostgreSQL", level: 80 },
            { id: "docker", name: "Docker", level: 80 }
        ],
        core: [
            { id: "os", name: "Operating Systems", level: 85 },
            { id: "compilers", name: "Compilers", level: 80 },
            { id: "algo", name: "Algorithms & DS", level: 85 },
            { id: "numa", name: "NUMA Arch", level: 75 }
        ],
        tools: [
            { id: "git", name: "Git", level: 90 },
            { id: "cmake", name: "CMake", level: 75 },
            { id: "monitoring", name: "Grafana & Prometheus", level: 70 },
            { id: "analysis", name: "Data Analysis", level: 80 }
        ]
    },
    // The Experience Timeline points
    experience: [
        {
            id: "role-1",
            roleKey: "experience.role-1.role",
            companyKey: "experience.role-1.company",
            periodKey: "experience.role-1.period",
            descriptionKey: "experience.role-1.description",
            technologies: ["PHP", "JavaScript", "CSS", "Bulma"]
        }
    ],
    // Education Timeline
    education: [
        {
            id: "edu-1",
            degreeKey: "education.edu-1.degree",
            schoolKey: "education.edu-1.school",
            locationKey: "education.edu-1.location",
            periodKey: "education.edu-1.period"
        },
        {
            id: "edu-2",
            degreeKey: "education.edu-2.degree",
            schoolKey: "education.edu-2.school",
            locationKey: "education.edu-2.location",
            periodKey: "education.edu-2.period"
        }
    ],
    // Certifications (array of keys)
    certificationsKeys: [
        "certifications.0",
        "certifications.1"
    ],
    // Projects Showcase
    projects: [
        {
            id: "proj-1",
            titleKey: "projects.proj-1.title",
            descriptionKey: "projects.proj-1.description",
            url: "",
            repo: "https://github.com/Seintian/unito-web-technologies-25-26",
            technologies: ["Java", "Spring Boot", "React", "Docker", "PostgreSQL"],
            category: "core-cs",
            themeColor: "emerald",
            roleKey: "projects.proj-1.role",
            durationKey: "projects.proj-1.duration",
            customLinks: [
                {
                    labelKey: "projects.proj-1.docs",
                    url: "https://github.com/Seintian/unito-web-technologies-25-26/blob/master/README.md",
                    icon: "document"
                }
            ]
        },
        {
            id: "proj-2",
            titleKey: "projects.proj-2.title",
            descriptionKey: "projects.proj-2.description",
            url: "https://seintian.github.io/unito-human-computer-interaction-25-26",
            repo: "https://github.com/Seintian/unito-human-computer-interaction-25-26",
            technologies: ["React", "TypeScript", "Vite", "Bootstrap", "UX/UI Design"],
            category: "core-cs",
            themeColor: "blue",
            roleKey: "projects.proj-2.role",
            durationKey: "projects.proj-2.duration"
        },
        {
            id: "proj-3",
            titleKey: "projects.proj-3.title",
            descriptionKey: "projects.proj-3.description",
            url: "",
            repo: "https://github.com/Seintian/WinHUD",
            technologies: ["C#", ".NET 10", "WPF"],
            category: "featured",
            themeColor: "slate",
            roleKey: "projects.proj-3.role",
            durationKey: "projects.proj-3.duration"
        },
        {
            id: "proj-4",
            titleKey: "projects.proj-4.title",
            descriptionKey: "projects.proj-4.description",
            url: "",
            repo: "https://github.com/Seintian/libnumakit",
            technologies: ["C", "CMake", "NUMA", "IPC"],
            category: "featured",
            themeColor: "red",
            roleKey: "projects.proj-4.role",
            durationKey: "projects.proj-4.duration"
        },
        {
            id: "proj-5",
            titleKey: "projects.proj-5.title",
            descriptionKey: "projects.proj-5.description",
            url: "",
            repo: "https://github.com/Seintian/unito-formal-languages-and-compilers-25-26",
            technologies: ["Java", "Compilers", "JVM", "Parsers"],
            category: "core-cs",
            themeColor: "purple",
            roleKey: "projects.proj-5.role",
            durationKey: "projects.proj-5.duration",
            customLinks: [
                {
                    labelKey: "projects.proj-5.links.grammar",
                    url: "https://github.com/Seintian/unito-formal-languages-and-compilers-25-26/blob/master/GRAMMAR.md",
                    icon: "document"
                },
                {
                    labelKey: "projects.proj-5.links.study",
                    url: "https://github.com/Seintian/unito-formal-languages-and-compilers-25-26/blob/master/STUDY_BRIEF.md",
                    icon: "document"
                }
            ]
        },
        {
            id: "proj-6",
            titleKey: "projects.proj-6.title",
            descriptionKey: "projects.proj-6.description",
            url: "",
            repo: "https://github.com/Seintian/unito-operative-systems-24-25",
            technologies: ["C", "POSIX", "IPC", "Multithreading"],
            category: "core-cs"
        },
        {
            id: "proj-7",
            titleKey: "projects.proj-7.title",
            descriptionKey: "projects.proj-7.description",
            url: "",
            repo: "https://github.com/Seintian/unito-algorithms-and-data-structures-24-25",
            technologies: ["C", "TDD", "Algorithms", "Data Structs"],
            category: "core-cs"
        },
        {
            id: "proj-8",
            titleKey: "projects.proj-8.title",
            descriptionKey: "projects.proj-8.description",
            url: "",
            repo: "https://github.com/Seintian/unito-hci-data-analysis-25-26",
            technologies: ["Python", "Pandas", "PyArrow", "Jupyter", "Data Analysis"],
            category: "core-cs",
            themeColor: "amber",
            roleKey: "projects.proj-8.role",
            durationKey: "projects.proj-8.duration"
        }
    ]
};
