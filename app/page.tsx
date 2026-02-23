import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/BentoGrid";
import ExperienceSection from "@/components/sections/ExperienceSection";

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 md:py-24">
      <Hero />
      <BentoGrid />
      <ExperienceSection />
    </main>
  );
}
