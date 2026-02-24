import Skeleton from "@/components/ui/Skeleton";
import { useTranslation } from "react-i18next";

interface ExperienceTimelineProps {
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

export default function ExperienceTimeline({ experience, isLoading }: ExperienceTimelineProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return <TimelineSkeleton />;
  }

  if (!experience) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ol className="relative border-s-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-0 transition-colors duration-300">
        {experience.map((job) => (
          <li key={job.id} className="mb-12 ms-8 group">
            {/* The Timeline Dot */}
            <span className="absolute flex items-center justify-center w-4 h-4 bg-white dark:bg-slate-900 rounded-full -start-[9px] ring-4 ring-slate-100 dark:ring-slate-900 border border-slate-300 dark:border-slate-700 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:ring-blue-50 dark:group-hover:ring-blue-900/30 transition-all duration-300"></span>

            {/* Content Card */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                {t(job.roleKey)} <span className="text-blue-600 dark:text-blue-400 font-medium hidden sm:inline transition-colors duration-300">@ {t(job.companyKey)}</span>
              </h3>
              <time className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 sm:mt-0 transition-colors duration-300">
                {t(job.periodKey)}
              </time>
            </div>

            {/* Mobile Company Name */}
            <div className="text-blue-600 dark:text-blue-400 font-medium sm:hidden mb-2 transition-colors duration-300">
              {t(job.companyKey)}
            </div>

            <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
              {t(job.descriptionKey)}
            </p>

            {/* Technologies Pills */}
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative border-s-2 border-slate-100 dark:border-slate-800 ml-3 md:ml-0">
        {[1, 2].map((i) => (
          <div key={i} className="mb-12 ms-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <Skeleton className="h-6 w-48 mb-2 sm:mb-0" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-20 w-full mb-4" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
