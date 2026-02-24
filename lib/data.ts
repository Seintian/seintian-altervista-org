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
    ]
};
