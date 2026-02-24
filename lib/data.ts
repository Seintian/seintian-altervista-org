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
            href: "#about",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1"
        }
    ],
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
            category: "core-cs"
        },
        {
            id: "proj-2",
            titleKey: "projects.proj-2.title",
            descriptionKey: "projects.proj-2.description",
            url: "https://seintian.github.io/unito-human-computer-interaction-25-26",
            repo: "https://github.com/Seintian/unito-human-computer-interaction-25-26",
            technologies: ["UX/UI Design", "Web Development", "HTML/CSS"],
            category: "core-cs"
        },
        {
            id: "proj-3",
            titleKey: "projects.proj-3.title",
            descriptionKey: "projects.proj-3.description",
            url: "",
            repo: "https://github.com/Seintian/WinHUD",
            technologies: ["C#", ".NET", "WPF"],
            category: "featured"
        },
        {
            id: "proj-4",
            titleKey: "projects.proj-4.title",
            descriptionKey: "projects.proj-4.description",
            url: "",
            repo: "https://github.com/Seintian/libnumakit",
            technologies: ["C", "CMake", "NUMA", "IPC"],
            category: "featured"
        },
        {
            id: "proj-5",
            titleKey: "projects.proj-5.title",
            descriptionKey: "projects.proj-5.description",
            url: "",
            repo: "https://github.com/Seintian/unito-formal-languages-and-compilers-25-26",
            technologies: ["Java", "Compilers", "JVM", "Parsers"],
            category: "core-cs"
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
            technologies: ["Python", "Pandas", "Jupyter", "Data Analysis"],
            category: "core-cs"
        }
    ]
};
