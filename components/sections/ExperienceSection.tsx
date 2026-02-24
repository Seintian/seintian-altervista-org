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
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="experience" className="border-t border-slate-200 dark:border-slate-800 pt-24 min-h-screen scroll-mt-12 transition-colors duration-300">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300">{t("sections.experience.title")}</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl transition-colors duration-300">
          {t("sections.experience.description")}
        </p>
      </div>

      <ExperienceTimeline experience={experience} />
    </section>
  );
}
