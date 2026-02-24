import BentoCard from "@/components/ui/BentoCard";
import { useTranslation } from "react-i18next";

interface BentoGridProps {
  modules?: Array<{
    id: string;
    titleKey: string;
    descriptionKey: string;
    href: string;
    colSpan: string;
    rowSpan: string;
  }>;
}

export default function BentoGrid({ modules }: BentoGridProps) {
  const { t } = useTranslation();

  if (!modules) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 auto-rows-[160px] gap-4 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
      {modules.map((mod) => (
        <BentoCard
          key={mod.id}
          title={t(mod.titleKey)}
          description={t(mod.descriptionKey)}
          href={mod.href}
          colSpan={mod.colSpan}
          rowSpan={mod.rowSpan}
        />
      ))}
    </section>
  );
}
