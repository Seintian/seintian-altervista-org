"use client";

import { useTranslation } from "react-i18next";
import { Code2, Layout, Server, Cpu, Wrench, Award, Shield, Zap } from "lucide-react";

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

const tierConfig = {
  advanced: {
    icon: Award,
    style: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-100 dark:border-blue-800",
  },
  proficient: {
    icon: Shield,
    style: "bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400 border-slate-100 dark:border-slate-700",
  },
  familiar: {
    icon: Zap,
    style: "bg-slate-50/50 text-slate-500 dark:bg-slate-900/30 dark:text-slate-500 border-slate-100/50 dark:border-slate-800",
  }
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

              <div className="grid grid-cols-1 gap-2">
                {categorySkills.map((skill) => {
                  const level = skill.level;
                  if (level <= 30) return null;

                  let tier: "advanced" | "proficient" | "familiar" = "familiar";
                  if (level > 70) tier = "advanced";
                  else if (level > 50) tier = "proficient";
                  else if (level > 30) tier = "familiar";

                  const config = tierConfig[tier];
                  const TierIcon = config.icon;

                  return (
                    <div
                      key={skill.id}
                      className="flex items-start justify-between p-3 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200 group/skill"
                      title={t(`sections.skills.tiers.${tier}`)}
                    >
                      <span className="font-medium text-slate-700 dark:text-slate-300 group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 transition-colors leading-7">
                        {t(`sections.skills.items.${skill.id}`, skill.name)}
                      </span>
                      <div className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-lg border ${config.style} transition-all duration-200 group-hover/skill:scale-110`}>
                        <TierIcon className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
