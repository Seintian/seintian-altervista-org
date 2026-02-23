import ContactButton from "@/components/ui/ContactButton";
import Skeleton from "@/components/ui/Skeleton";

interface HeroProps {
  contacts?: Array<{
    id: string;
    label: string;
    url: string;
    isPrimary: boolean;
  }>;
  isLoading?: boolean;
}

export default function Hero({ contacts, isLoading }: HeroProps) {
  return (
    <section className="flex flex-col items-start justify-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
        Hello, I&apos;m <span className="text-blue-600">Christian Santarelli</span>.
      </h1>
      <h2 className="text-2xl md:text-3xl font-medium text-slate-700 mb-6">
        Software Engineer & Developer
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
        I build scalable web applications, automated deployment pipelines, and clean digital architectures. Focused on performance and modular design.
      </p>

      <div className="flex flex-wrap gap-4 min-h-[48px]">
        {isLoading || !contacts ? (
          <>
            <Skeleton className="h-12 w-32 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </>
        ) : (
          contacts.map((contact) => (
            <ContactButton
              key={contact.id}
              id={contact.id}
              label={contact.label}
              url={contact.url}
              isPrimary={contact.isPrimary}
            />
          ))
        )}
      </div>
    </section>
  );
}
