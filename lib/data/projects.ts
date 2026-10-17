import { ProjectType } from "@/types/portfolio";

export const projects: ProjectType[] = [
    {
        id: "proj-yatal",
        slug: "yatal",
        titleKey: "projects.proj-yatal.title",
        descriptionKey: "projects.proj-yatal.description",
        url: "https://github.com/alpha-unito/yatal",
        repo: "https://github.com/alpha-unito/yatal",
        technologies: ["Rust", "Linux Systems", "io_uring", "Tokio", "jemalloc", "InfluxDB"],
        category: "featured",
        origin: "university",
        themeColor: "indigo",
        roleKey: "projects.proj-yatal.role",
        durationKey: "projects.proj-yatal.duration",
        customLinks: [
            {
                labelKey: "projects.proj-yatal.links.thesis",
                url: "https://github.com/alpha-unito/yatal/tree/main/docs",
                icon: "document"
            },
            {
                labelKey: "projects.proj-yatal.links.benchmarks",
                url: "https://github.com/alpha-unito/yatal/blob/main/docs/benchmarks/COMPARISON_REPORT.md",
                icon: "external"
            }
        ]
    },
    {
        id: "proj-librbipc",
        slug: "librbipc",
        titleKey: "projects.proj-librbipc.title",
        descriptionKey: "projects.proj-librbipc.description",
        url: "",
        repo: "https://github.com/Seintian/librbipc",
        technologies: ["C23", "Linux Systems", "Shared Memory", "Lock-Free", "Futex", "AVX2 / SIMD"],
        category: "featured",
        origin: "personal",
        themeColor: "cyan",
        roleKey: "projects.proj-librbipc.role",
        durationKey: "projects.proj-librbipc.duration",
        customLinks: [
            {
                labelKey: "projects.proj-librbipc.links.readme",
                url: "https://github.com/Seintian/librbipc/blob/main/README.md",
                icon: "document"
            },
            {
                labelKey: "projects.proj-librbipc.links.benchmarks",
                url: "https://github.com/Seintian/librbipc/tree/main/benchmarks",
                icon: "external"
            }
        ]
    },
    {
        id: "proj-4",
        slug: "libnumakit",
        titleKey: "projects.proj-4.title",
        descriptionKey: "projects.proj-4.description",
        url: "",
        repo: "https://github.com/Seintian/libnumakit",
        technologies: ["C", "CMake", "NUMA", "IPC"],
        category: "featured",
        origin: "personal",
        themeColor: "red",
        roleKey: "projects.proj-4.role",
        durationKey: "projects.proj-4.duration"
    },
    {
        id: "proj-5",
        slug: "unito-formal-languages-and-compilers-25-26",
        titleKey: "projects.proj-5.title",
        descriptionKey: "projects.proj-5.description",
        url: "",
        repo: "https://github.com/Seintian/unito-formal-languages-and-compilers-25-26",
        technologies: ["Java", "Compilers", "JVM", "Parsers"],
        category: "featured",
        origin: "university",
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
        slug: "unito-operative-systems-24-25",
        titleKey: "projects.proj-6.title",
        descriptionKey: "projects.proj-6.description",
        url: "",
        repo: "https://github.com/Seintian/unito-operative-systems-24-25",
        technologies: ["C", "POSIX", "IPC", "Multithreading", "Makefile"],
        category: "featured",
        origin: "university",
        themeColor: "indigo",
        roleKey: "projects.proj-6.role",
        durationKey: "projects.proj-6.duration"
    },
    {
        id: "proj-3",
        slug: "WinHUD",
        titleKey: "projects.proj-3.title",
        descriptionKey: "projects.proj-3.description",
        url: "",
        repo: "https://github.com/Seintian/WinHUD",
        technologies: ["C#", ".NET 10", "WPF"],
        category: "featured",
        origin: "personal",
        themeColor: "slate",
        roleKey: "projects.proj-3.role",
        durationKey: "projects.proj-3.duration"
    },
    {
        id: "proj-7",
        slug: "unito-algorithms-and-data-structures-24-25",
        titleKey: "projects.proj-7.title",
        descriptionKey: "projects.proj-7.description",
        url: "",
        repo: "https://github.com/Seintian/unito-algorithms-and-data-structures-24-25",
        technologies: ["C", "TDD", "Algorithms", "Data Structs"],
        category: "core-cs",
        origin: "university",
        themeColor: "cyan",
        roleKey: "projects.proj-7.role",
        durationKey: "projects.proj-7.duration"
    },
    {
        id: "proj-1",
        slug: "unito-web-technologies-25-26",
        titleKey: "projects.proj-1.title",
        descriptionKey: "projects.proj-1.description",
        url: "",
        repo: "https://github.com/Seintian/unito-web-technologies-25-26",
        technologies: ["Java", "Spring Boot", "React", "Docker", "PostgreSQL"],
        category: "core-cs",
        origin: "university",
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
        slug: "unito-human-computer-interaction-25-26",
        titleKey: "projects.proj-2.title",
        descriptionKey: "projects.proj-2.description",
        url: "https://seintian.github.io/unito-human-computer-interaction-25-26",
        repo: "https://github.com/Seintian/unito-human-computer-interaction-25-26",
        technologies: ["React", "TypeScript", "Vite", "Bootstrap", "UX/UI Design"],
        category: "core-cs",
        origin: "university",
        themeColor: "blue",
        roleKey: "projects.proj-2.role",
        durationKey: "projects.proj-2.duration"
    },
    {
        id: "proj-8",
        slug: "unito-hci-data-analysis-25-26",
        titleKey: "projects.proj-8.title",
        descriptionKey: "projects.proj-8.description",
        url: "",
        repo: "https://github.com/Seintian/unito-hci-data-analysis-25-26",
        technologies: ["Python", "Pandas", "PyArrow", "Jupyter", "Data Analysis"],
        category: "core-cs",
        origin: "university",
        themeColor: "amber",
        roleKey: "projects.proj-8.role",
        durationKey: "projects.proj-8.duration"
    },
    {
        id: "proj-gym",
        slug: "gym-management-system",
        titleKey: "projects.proj-gym.title",
        descriptionKey: "projects.proj-gym.description",
        url: "http://avid3959134.altervista.org/",
        repo: "", // Private repository
        technologies: ["Vanilla PHP", "MySQL", "jQuery", "Bulma CSS", "Session API"],
        category: "web",
        origin: "freelance",
        themeColor: "rose",
        roleKey: "projects.proj-gym.role",
        durationKey: "projects.proj-gym.duration"
    }
];
