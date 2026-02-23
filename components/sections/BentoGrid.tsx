import { useSiteContext } from "@/context/SiteContext";
import BentoCard from "@/components/ui/BentoCard";

export default function BentoGrid() {
  const { modules } = useSiteContext();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 auto-rows-[160px] gap-4 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
      {modules.map((mod) => (
        <BentoCard
          key={mod.id}
          title={mod.title}
          description={mod.description}
          href={mod.href}
          colSpan={mod.colSpan}
          rowSpan={mod.rowSpan}
        />
      ))}
    </section>
  );
}
