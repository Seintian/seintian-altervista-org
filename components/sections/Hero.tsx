"use client";

import { formatCodeSpans } from "@/lib/formatText";

import ContactButton from "@/components/ui/ContactButton";
import { useTranslation } from "react-i18next";
import { ContactItem } from "@/types/portfolio";
import { useLocalizedContacts } from "@/hooks/useLocalizedContacts";
import dynamic from "next/dynamic";

const RingBufferStream = dynamic(() => import("@/components/canvas/RingBufferStream"), {
  ssr: false,
  loading: () => <div className="w-full h-[280px] sm:h-[320px] lg:h-[360px]" />,
});

interface HeroProps {
  contacts?: ContactItem[];
}

export default function Hero({ contacts }: HeroProps) {
  const { t } = useTranslation();
  const localizedContacts = useLocalizedContacts(contacts);

  return (
    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Semantic Typographic Hierarchy */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-6 transition-colors duration-300">
            {t("hero.greeting")}{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {t("hero.name")}
            </span>
            .
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-6 transition-colors duration-300">
            {t("hero.role")}
          </h2>
          <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 max-w-2xl mb-8 leading-relaxed transition-colors duration-300">
            {formatCodeSpans(t("hero.description"))}
          </p>

          <div className="flex flex-wrap gap-4 min-h-[48px]">
            {localizedContacts.map((contact) => (
              <ContactButton
                key={contact.id}
                id={contact.id}
                label={t(contact.labelKey)}
                url={contact.url}
                isPrimary={contact.isPrimary}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Metaphor 3 Ambient Ring Buffer Stream */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <RingBufferStream />
        </div>
      </div>
    </section>
  );
}
