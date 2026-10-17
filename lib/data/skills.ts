import { SkillsMatrix } from "@/types/portfolio";

export const skills: SkillsMatrix = {
    languages: [
        { id: "c", name: "C", level: 85 },
        { id: "rust", name: "Rust", level: 82 },
        { id: "java", name: "Java", level: 85 },
        { id: "python", name: "Python", level: 75 },
        { id: "js-ts", name: "JS / TS", level: 75 },
        { id: "cs", name: "C#", level: 65 },
        { id: "php", name: "PHP", level: 60 }
    ],
    frontend: [
        { id: "react", name: "React", level: 75 },
        { id: "tailwind", name: "Tailwind CSS", level: 70 },
        { id: "nextjs", name: "Next.js", level: 65 },
        { id: "bulma", name: "Bulma CSS", level: 65 },
        { id: "html-css", name: "HTML / CSS", level: 80 },
        { id: "bootstrap", name: "Bootstrap", level: 55 },
        { id: "jquery", name: "jQuery", level: 40 }
    ],
    backend: [
        { id: "spring", name: "Spring Boot", level: 65 },
        { id: "docker", name: "Docker", level: 65 },
        { id: "postgres", name: "PostgreSQL", level: 60 },
        { id: "fastapi", name: "FastAPI", level: 40 },
        { id: "flask", name: "Flask", level: 40 }
    ],
    core: [
        { id: "systems-io", name: "Linux Systems & io_uring", level: 80 },
        { id: "algo", name: "Algorithms & DS", level: 80 },
        { id: "os", name: "Operating Systems", level: 75 },
        { id: "compilers", name: "Compilers", level: 70 },
        { id: "numa", name: "NUMA Arch", level: 65 },
        { id: "analysis", name: "Data Analysis", level: 65 }
    ],
    tools: [
        { id: "git", name: "Git", level: 85 },
        { id: "make", name: "Makefile / Make", level: 85 },
        { id: "monitoring", name: "InfluxDB, Grafana & Prometheus", level: 75 },
        { id: "cmake", name: "CMake", level: 55 },
        { id: "k8s", name: "Kubernetes", level: 40 }
    ]
};
