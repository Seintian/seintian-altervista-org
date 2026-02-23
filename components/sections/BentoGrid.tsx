import BentoCard from "@/components/ui/BentoCard";
import Skeleton from "@/components/ui/Skeleton";

interface BentoGridProps {
  modules?: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
    colSpan: string;
    rowSpan: string;
  }>;
  isLoading?: boolean;
}

export default function BentoGrid({ modules, isLoading }: BentoGridProps) {
  if (isLoading) {
    return <BentoSkeleton />;
  }

  if (!modules) {
    return null;
  }

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

function BentoSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 auto-rows-[160px] gap-4 mb-24">
      <Skeleton className="md:col-span-2 md:row-span-1 h-full w-full" />
      <Skeleton className="md:col-span-1 md:row-span-2 h-full w-full" />
      <Skeleton className="md:col-span-1 md:row-span-1 h-full w-full" />
      <Skeleton className="md:col-span-1 md:row-span-1 h-full w-full" />
    </section>
  );
}
