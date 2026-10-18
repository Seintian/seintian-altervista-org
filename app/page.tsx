"use client";

import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/BentoGrid";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import SkillsMatrix from "@/components/sections/SkillsMatrix";
import { siteData } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 md:py-24">
      <Hero
        contacts={siteData.contacts}
      />
      <BentoGrid
        modules={siteData.modules}
      />
      <SkillsMatrix
        skills={siteData.skills}
      />
      <ExperienceSection
        experience={siteData.experience}
      />
      <ProjectsSection
        projects={siteData.projects}
      />
      <EducationSection
        education={siteData.education}
        certifications={siteData.certificationsKeys}
      />
    </main>
  );
}
