import EducationTimeline from "@/components/EducationTimeline";
import { useTranslation } from "react-i18next";

interface EducationSectionProps {
    education?: Array<{
        id: string;
        degreeKey: string;
        schoolKey: string;
        locationKey: string;
        periodKey: string;
    }>;
    certifications?: string[];
    isLoading?: boolean;
}

export default function EducationSection({ education, certifications, isLoading }: EducationSectionProps) {
    const { t } = useTranslation();

    return (
        <section id="education" className="border-t border-slate-200 pt-24 pb-24 scroll-mt-12">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("sections.education.title")}</h2>
                <p className="text-lg text-slate-600 max-w-2xl">
                    {t("sections.education.description")}
                </p>
            </div>

            <EducationTimeline education={education} certifications={certifications} isLoading={isLoading} />
        </section>
    );
}
