"use client";

import { useTranslation } from "react-i18next";
import { useResonance, isTechMatch } from "@/lib/context/ResonanceContext";
import { Sparkles } from "lucide-react";

interface ExperienceTimelineProps {
  experience?: Array<{
    id: string;
    roleKey: string;
    companyKey: string;
    periodKey: string;
    descriptionKey: string;
    technologies: string[];
  }>;
}

export default function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  const { t } = useTranslation();
  const { activeTech, selectedTech, setHoveredTech, toggleSelectedTech, matchesTech } = useResonance();

  if (!experience) {
    return null;
  }

  const isAnyTechActive = activeTech !== null;

  return (
    <div className="max-w-3xl mx-auto">
      <ol className="relative border-s-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-0 transition-colors duration-300">
        {experience.map((job) => {
          const hasMatch = matchesTech(job.technologies);
          const isDimmed = isAnyTechActive && !hasMatch;
          const isResonating = isAnyTechActive && hasMatch;

          return (
            <li
              key={job.id}
              className={`mb-12 ms-8 group transition-all duration-300 ${
                isDimmed ? "opacity-40 grayscale-[15%]" : "opacity-100"
              }`}
            >
              {/* The Timeline Dot */}
              <span
                className={`absolute flex items-center justify-center w-4 h-4 bg-white dark:bg-slate-900 rounded-full -start-[9px] ring-4 border transition-all duration-300 ${
                  isResonating
                    ? "border-blue-600 dark:border-blue-400 ring-blue-100 dark:ring-blue-900/50 scale-125"
                    : "ring-slate-100 dark:ring-slate-900 border-slate-300 dark:border-slate-700 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:ring-blue-50 dark:group-hover:ring-blue-900/30"
                }`}
              ></span>

              {/* Content Card */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${isResonating ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-slate-100"}`}>
                    {t(job.roleKey)} <span className="text-blue-600 dark:text-blue-400 font-medium hidden sm:inline transition-colors duration-300">@ {t(job.companyKey)}</span>
                  </h3>
                  {isResonating && (
                    <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      <span>Resonant</span>
                    </span>
                  )}
                </div>
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
                {job.technologies.map((tech) => {
                  const isThisPillMatch = isTechMatch(tech, activeTech || "");
                  const isPinned = selectedTech !== null && isTechMatch(tech, selectedTech);

                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleSelectedTech(tech)}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer text-left ${
                        isThisPillMatch
                          ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500 shadow-sm scale-105"
                          : isPinned
                          ? "bg-blue-600 text-white border-blue-600"
                          : "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105 active:scale-95"
                      }`}
                      title={`Filter / resonate by ${tech}`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
