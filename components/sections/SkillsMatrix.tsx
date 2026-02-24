"use client";

import { useTranslation } from "react-i18next";
import { Code2, Layout, Server, Cpu, Wrench } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface SkillsMatrixProps {
  skills?: {
    languages: Skill[];
    frontend: Skill[];
    backend: Skill[];
    core: Skill[];
    tools: Skill[];
  };
}

const iconMap = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  core: Cpu,
  tools: Wrench,
};

export default function SkillsMatrix({ skills }: SkillsMatrixProps) {
  const { t } = useTranslation();

  if (!skills) return null;

  const categories = Object.keys(skills) as Array<keyof typeof skills>;

  return (
    <section id="skills" className="border-t border-slate-200 dark:border-slate-800 pt-24 pb-24 scroll-mt-12 transition-colors duration-300">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300">
          {t("sections.skills.title")}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl transition-colors duration-300">
          {t("sections.skills.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = iconMap[category];
          const categorySkills = skills[category];

          return (
            <div
              key={category}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {t(`sections.skills.categories.${category}`)}
                </h3>
              </div>

              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {skill.name}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
