// This file contains content that is likely to grow or change (Amplifiable).
export const siteData = {
    contacts: [
        { id: "email", label: "Email Me", url: "mailto:seintian@altervista.org", isPrimary: true },
        { id: "github", label: "GitHub", url: "https://github.com/Seintian", isPrimary: false },
        { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/christian-santarelli-4290ab19a/", isPrimary: false },
        { id: "cv", label: "Download CV", url: "/cv.pdf", isPrimary: false }
    ],
    // The Bento Box Navigation Modules
    modules: [
        {
            id: "experience",
            title: "Professional Experience",
            description: "My career timeline as a Freelance Web Developer.",
            href: "#experience",
            colSpan: "md:col-span-2", // Takes up 2 columns on desktop
            rowSpan: "md:row-span-1"
        },
        {
            id: "projects",
            title: "Featured Projects",
            description: "Enterprise web apps, HCI platforms, and core CS projects.",
            href: "#projects",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-2"  // Taller card
        },
        {
            id: "education",
            title: "Education",
            description: "BSc in Computer Science at Università di Torino.",
            href: "#education",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1"
        },
        {
            id: "skills",
            title: "Skills Matrix",
            description: "Languages, Frontend, Backend, DevOps & Core CS.",
            href: "#about",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1"
        }
    ],
    // The Experience Timeline points
    experience: [
        {
            id: "role-1",
            role: "Freelance Web Developer",
            company: "Freelance",
            period: "2022 - Present",
            description: "Gestione e sviluppo end-to-end di applicazioni web dinamiche. Progettazione architetturale e coding. Gestione dei deployment e manutenzione mensile per vari clienti. Attività di consulenza tecnica per i team creativi, analizzando feedback e trend per ottimizzare l'efficienza, le performance e la UX del software.",
            technologies: ["PHP", "JavaScript", "CSS", "Bulma"]
        }
    ],
    // Education Timeline
    education: [
        {
            id: "edu-1",
            degree: "Laurea in Informatica (BSc in Computer Science)",
            school: "Università di Torino",
            location: "Torino",
            period: "2023 - Present"
        },
        {
            id: "edu-2",
            degree: "Diploma di Maturità Scientifica",
            school: "Liceo Scientifico Maria Curie",
            location: "Pinerolo (TO)",
            period: "2018 - 2023"
        }
    ],
    // Certifications
    certifications: [
        "First Certificate in English - B2 (2022)",
        "Corsi di formazione generica e specifica per lavoratori studenti (12 ore)"
    ],
    // Projects Showcase
    projects: [
        {
            id: "proj-1",
            title: "GreenHabits (Web Technologies)",
            description: "Piattaforma web full-stack con architettura enterprise. Implementata con un backend in Java Spring Boot, frontend in React/Vite (TS), e database PostgreSQL. L'infrastruttura è completamente containerizzata con Docker e include un sistema di monitoraggio avanzato con Grafana e Prometheus.",
            url: "",
            repo: "https://github.com/Seintian/unito-web-technologies-25-26",
            technologies: ["Java", "Spring Boot", "React", "Docker", "PostgreSQL"],
            category: "core-cs"
        },
        {
            id: "proj-2",
            title: "Human-Computer Interaction (HCI) Web Platform",
            description: "Sviluppo di un'interfaccia utente web moderna e accessibile per il corso di HCI. Focus rigoroso su UX/UI design, responsività e principi di usabilità.",
            url: "https://seintian.github.io/unito-human-computer-interaction-25-26",
            repo: "https://github.com/Seintian/unito-human-computer-interaction-25-26",
            technologies: ["UX/UI Design", "Web Development", "HTML/CSS"],
            category: "core-cs"
        },
        {
            id: "proj-3",
            title: "WinHUD",
            description: "Applicazione desktop per Windows sviluppata in C# (.NET/WPF). Implementa un overlay customizzabile per il monitoraggio in tempo reale dei dati hardware e delle performance del sistema.",
            url: "",
            repo: "https://github.com/Seintian/WinHUD",
            technologies: ["C#", ".NET", "WPF"],
            category: "featured"
        },
        {
            id: "proj-4",
            title: "libnumakit",
            description: "Libreria di sistema avanzata scritta in C (build con CMake) per la gestione della memoria su architetture NUMA. Include logiche di task pooling, scheduling e memory migration a basso livello.",
            url: "",
            repo: "https://github.com/Seintian/libnumakit",
            technologies: ["C", "CMake", "NUMA", "IPC"],
            category: "featured"
        },
        {
            id: "proj-5",
            title: "Formal Languages & Compilers",
            description: "Sviluppo from scratch di un compilatore in Java. Include l'implementazione di un analizzatore lessicale (Lexer), un analizzatore sintattico top-down (Parser LL(1)), analisi semantica tramite SDT (Syntax-Directed Translation) e generazione di bytecode eseguibile per la Java Virtual Machine (JVM).",
            url: "",
            repo: "https://github.com/Seintian/unito-formal-languages-and-compilers-25-26",
            technologies: ["Java", "Compilers", "JVM", "Parsers"],
            category: "core-cs"
        },
        {
            id: "proj-6",
            title: "POSIX Operating Systems Simulation",
            description: "Simulazione multi-processo complessa sviluppata in C per ambienti POSIX. L'architettura software sfrutta primitive IPC avanzate (Message Queues, Shared Memory, e Semafori) per la gestione sicura della concorrenza e della sincronizzazione tra nodi (Director, Worker, ecc.).",
            url: "",
            repo: "https://github.com/Seintian/unito-operative-systems-24-25",
            technologies: ["C", "POSIX", "IPC", "Multithreading"],
            category: "core-cs"
        },
        {
            id: "proj-7",
            title: "Algorithms & Data Structures Library",
            description: "Libreria in C contenente l'implementazione manuale di strutture dati e algoritmi fondamentali, progettata per massima efficienza. Implementa Grafi, Hash Tables, calcolo dell'Edit Distance e moduli di sorting, validata tramite rigoroso unit testing (framework Unity).",
            url: "",
            repo: "https://github.com/Seintian/unito-algorithms-and-data-structures-24-25",
            technologies: ["C", "TDD", "Algorithms", "Data Structs"],
            category: "core-cs"
        },
        {
            id: "proj-8",
            title: "HCI Data Analysis Pipeline",
            description: "Pipeline di elaborazione e analisi dati sviluppata in Python (Pandas, Jupyter Notebooks) basata su dataset legati alle interfacce uomo-macchina. Comprende script modulari per pre-cleaning, trattamento anomalie, feature engineering ed Exploratory Data Analysis (EDA).",
            url: "",
            repo: "https://github.com/Seintian/unito-hci-data-analysis-25-26",
            technologies: ["Python", "Pandas", "Jupyter", "Data Analysis"],
            category: "core-cs"
        }
    ]
};
