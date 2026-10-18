"use client";

import ContactButton from "@/components/ui/ContactButton";
import { useTranslation } from "react-i18next";
import { ContactItem } from "@/types/portfolio";
import { useLocalizedContacts } from "@/hooks/useLocalizedContacts";
import { formatCodeSpans } from "@/lib/formatText";

interface HeroProps {
  contacts?: ContactItem[];
}

export default function Hero({ contacts }: HeroProps) {
  const { t } = useTranslation();
  const localizedContacts = useLocalizedContacts(contacts);

  return (
    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-5 transition-colors duration-300">
          {t("hero.greeting")}{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {t("hero.name")}
          </span>
          .
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300 mb-5 transition-colors duration-300">
          {t("hero.role")}
        </h2>
        <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed mb-8 transition-colors duration-300">
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
    </section>
  );
}
