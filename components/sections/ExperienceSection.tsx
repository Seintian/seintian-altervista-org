import ExperienceTimeline from "@/components/ExperienceTimeline";

interface ExperienceSectionProps {
  experience?: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
  }>;
  isLoading?: boolean;
}

export default function ExperienceSection({ experience, isLoading }: ExperienceSectionProps) {
  return (
    <section id="experience" className="border-t border-slate-200 pt-24 min-h-screen scroll-mt-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Experience</h2>
        <p className="text-lg text-slate-600 max-w-2xl">
          A look at my career history, the teams I&apos;ve worked with, and the technologies I&apos;ve leveraged to drive business results.
        </p>
      </div>

      <ExperienceTimeline experience={experience} isLoading={isLoading} />
    </section>
  );
}
