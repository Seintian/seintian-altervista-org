# Christian Santarelli | Software Engineering Portfolio

> **Live Site:** [seintian.altervista.org](https://seintian.altervista.org)
> **Author:** Christian Santarelli ([GitHub](https://github.com/Seintian), [LinkedIn](https://linkedin.com/in/christian-santarelli-4290ab19a/))

## Overview

Welcome to the source code of my personal Software Engineering portfolio. Designed with both **IT Professionals** (Tech Leads, Senior Developers) and **Human Resources** (Technical Recruiters, Talent Acquisition) in mind, this project serves as a comprehensive showcase of my technical proficiency, software architecture skills, and professional journey.

This portfolio is not just a static webpage; it is a fully internationalized, highly interactive Web Application built on the latest React and Next.js paradigms. It highlights my experience in solving complex computer science problems across various domains: from web technologies to operating systems, from algorithms to low-level compiler design.

---

## 🎯 Value Proposition

### For Technical Recruiters & HR
- **Comprehensive Candidate Profile:** Instant access to my skills, education, professional experience, and verifiable certifications.
- **Multilingual Support:** The application is fully internationalized (i18n) and automatically detects the user's browser language, providing a seamless localization experience.
- **Responsive & Accessible Design:** Built to provide an optimal viewing experience across all devices, ensuring that my profile is always accessible without compromise.
- **Direct Contact:** Quick links to my updated CV, LinkedIn profile, email, and open-source contributions.

### For IT Professionals & Tech Leads
- **Modern Tech Stack:** Built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**, demonstrating up-to-date knowledge of the rapidly evolving React ecosystem.
- **Clean Architecture:** Component-driven design utilizing a modern **Bento Grid** layout, highly decoupled state management, and strict **TypeScript** typing.
- **Project Deep Dives:** Detailed breakdown of academic and personal projects encompassing varied stacks (Java, C, C#, TypeScript, Python) and domains (NUMA Architectures, Compilers, OS, Data Structures).
- **Performance Optimized:** Includes custom hooks for data fetching, dynamic adaptive theming, and seamless route loading optimization.

---

## 💻 Tech Stack & Architecture

### Core Technologies
- **Framework:** [Next.js](https://nextjs.org/) (App Router paradigm)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for end-to-end type safety and predictable code.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for utility-first, responsive, and maintainable styling.
- **State Management & Data Fetching:** [@tanstack/react-query](https://tanstack.com/query/latest)

### Key Features
- **🌐 Internationalization (i18n):** Powered by `i18next` and `react-i18next`. Seamlessly translates content based on browser preferences.
- **🌓 Adaptive Theming:** Uses `next-themes` for a flicker-free Dark/Light mode toggle that respects UI/UX system preferences.
- **🧱 UI/UX Design:** Implements a scannable **Bento Grid** component architecture for strong visual hierarchy, drawing inspiration from premium, modern design principles.
- **⚡ Performance First:** Fully optimized layout shifts, robust loading states (`nextjs-toploader`), and optimized hydration mechanisms.

### Directory Structure

```text
seintian-altervista-org/
├── app/                  # Next.js App Router (Pages, Layouts, globals.css)
├── components/           # React Components
│   ├── sections/         # Major page sections (Hero, BentoGrid, Projects, etc.)
│   └── ui/               # Reusable atomic UI elements (Buttons, Loaders, Switchers)
├── hooks/                # Custom React Hooks (e.g., useSiteData)
├── lib/                  # Core Business Logic and Static Data structures (e.g., data.ts)
├── public/               # Static assets (CV, images, icons)
└── ...config files       # Next, Tailwind, ESLint, TypeScript configurations
```

---

## 🚀 Getting Started (For Developers)

If you wish to clone this repository to explore the codebase or run it locally, follow these straightforward steps.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- A package manager: `npm`, `yarn`, `pnpm`, or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Seintian/seintian-altervista-org.git
   cd seintian-altervista-org
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser. The page will hot-reload automatically as you edit files in the `app/` or `components/` directory.

---

## 🏗️ Project Showcase Highlight

This application dynamically renders several complex projects managed centrally in `lib/data.ts`. Some highlighted open-source repositories included in this portfolio:

- **Web Technologies:** Full-stack Spring Boot & React architecture with Docker & PostgreSQL.
- **Human-Computer Interaction (HCI):** Specialized Vite & React app optimizing UX/UI.
- **libnumakit:** Low-level C library handling NUMA architectures and Inter-Process Communication (IPC).
- **WinHUD:** A modern WPF/.NET 10 heads-up display native application.
- **Formal Languages and Compilers:** Custom JVM-based parsers and grammar implementations in Java.
- **Operating Systems:** Advanced C programming featuring POSIX threads, IPC, and custom Makefiles.
- **Data Analysis:** Python, Pandas, and PyArrow-based data parsing workflows.

*(All repositories are linked and described in full detail within the live portfolio).*

---

## 📬 Contact & Links

Whether you are a technical recruiter looking for a passionate software engineer or a fellow developer wanting to connect:

- **Email:** [seintian@altervista.org](mailto:seintian@altervista.org)
- **LinkedIn:** [Christian Santarelli](https://linkedin.com/in/christian-santarelli-4290ab19a/)
- **GitHub:** [@Seintian](https://github.com/Seintian)

---
*Crafting robust architectures and stunning digital experiences.*
