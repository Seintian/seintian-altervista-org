"use client";

import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/BentoGrid";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import SkillsMatrix from "@/components/sections/SkillsMatrix";
import GlobalLoadingScreen from "@/components/ui/GlobalLoadingScreen";
import { useSiteData } from "@/hooks/useSiteData";

export default function Home() {
  const { data, isLoading } = useSiteData();

  if (isLoading) {
    return <GlobalLoadingScreen />;
  }

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 md:py-24">
      <Hero
        contacts={data?.contacts}
      />
      <BentoGrid
        modules={data?.modules}
      />
      <SkillsMatrix
        skills={data?.skills}
      />
      <ExperienceSection
        experience={data?.experience}
      />
      <ProjectsSection
        projects={data?.projects}
      />
      <EducationSection
        education={data?.education}
        certifications={data?.certificationsKeys}
      />
    </main>
  );
}
