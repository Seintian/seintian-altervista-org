import ContactButton from "@/components/ui/ContactButton";
import { useTranslation } from "react-i18next";

interface HeroProps {
  contacts?: Array<{
    id: string;
    labelKey: string;
    url: string;
    isPrimary: boolean;
  }>;
}

export default function Hero({ contacts }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-start justify-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-6 transition-colors duration-300 mt-2 md:mt-0">
        {t("hero.greeting")} <span className="text-blue-600 dark:text-blue-400">{t("hero.name")}</span>.
      </h1>
      <h2 className="text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-6 transition-colors duration-300">
        {t("hero.role")}
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed transition-colors duration-300">
        {t("hero.description")}
      </p>

      <div className="flex flex-wrap gap-4 min-h-[48px]">
        {contacts && contacts.map((contact) => (
          <ContactButton
            key={contact.id}
            id={contact.id}
            label={t(contact.labelKey)}
            url={contact.url}
            isPrimary={contact.isPrimary}
          />
        ))}
      </div>
    </section>
  );
}
