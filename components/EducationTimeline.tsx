import { useTranslation } from "react-i18next";

interface EducationTimelineProps {
    education?: Array<{
        id: string;
        degreeKey: string;
        schoolKey: string;
        locationKey: string;
        periodKey: string;
    }>;
    certifications?: string[];
}

export default function EducationTimeline({ education, certifications }: EducationTimelineProps) {
    const { t } = useTranslation();

    if (!education) {
        return null;
    }

    return (
        <div className="max-w-3xl mx-auto">
            <ol className="relative border-s-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-0 mb-12 transition-colors duration-300">
                {education.map((edu) => (
                    <li key={edu.id} className="mb-12 ms-8 group">
                        {/* The Timeline Dot */}
                        <span className="absolute flex items-center justify-center w-4 h-4 bg-white dark:bg-slate-900 rounded-full -start-[9px] ring-4 ring-slate-100 dark:ring-slate-900 border border-slate-300 dark:border-slate-700 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:ring-blue-50 dark:group-hover:ring-blue-900/30 transition-all duration-300"></span>

                        {/* Content Card */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                                {t(edu.degreeKey)}
                            </h3>
                            <time className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 sm:mt-0 transition-colors duration-300">
                                {t(edu.periodKey)}
                            </time>
                        </div>

                        <div className="text-blue-600 dark:text-blue-400 font-medium mb-1 transition-colors duration-300">
                            {t(edu.schoolKey)}
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">
                            {t(edu.locationKey)}
                        </p>
                    </li>
                ))}
            </ol>

            {certifications && certifications.length > 0 && (
                <div className="mt-8 ms-3 md:ms-0">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300">{t("common.certifications")}</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 transition-colors duration-300">
                        {certifications.map((certKey, idx) => (
                            <li key={idx}>{t(certKey)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
