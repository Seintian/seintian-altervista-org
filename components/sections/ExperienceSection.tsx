import ExperienceTimeline from "@/components/ExperienceTimeline";
import { useTranslation } from "react-i18next";

interface ExperienceSectionProps {
  experience?: Array<{
    id: string;
    roleKey: string;
    companyKey: string;
    periodKey: string;
    descriptionKey: string;
    technologies: string[];
  }>;
  isLoading?: boolean;
}

export default function ExperienceSection({ experience, isLoading }: ExperienceSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="experience" className="border-t border-slate-200 pt-24 min-h-screen scroll-mt-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("sections.experience.title")}</h2>
        <p className="text-lg text-slate-600 max-w-2xl">
          {t("sections.experience.description")}
        </p>
      </div>

      <ExperienceTimeline experience={experience} isLoading={isLoading} />
    </section>
  );
}
