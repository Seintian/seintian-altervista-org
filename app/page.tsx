"use client";

import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/BentoGrid";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import { useSiteData } from "@/hooks/useSiteData";

export default function Home() {
  const { data, isLoading } = useSiteData();

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 md:py-24">
      <Hero
        contacts={data?.contacts}
        isLoading={isLoading}
      />
      <BentoGrid
        modules={data?.modules}
        isLoading={isLoading}
      />
      <ExperienceSection
        experience={data?.experience}
        isLoading={isLoading}
      />
      <ProjectsSection
        projects={data?.projects}
        isLoading={isLoading}
      />
      <EducationSection
        education={data?.education}
        certifications={data?.certificationsKeys}
        isLoading={isLoading}
      />
    </main>
  );
}
