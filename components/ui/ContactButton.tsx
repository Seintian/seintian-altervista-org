interface ContactButtonProps {
  label: string;
  url: string;
  id: string;
  isPrimary?: boolean;
}

export default function ContactButton({ label, url, id, isPrimary }: ContactButtonProps) {
  return (
    <a
      href={url}
      target={id !== "email" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isPrimary
          ? "bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700 shadow-md hover:shadow-lg dark:hover:shadow-blue-900/40"
          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600"
        }`}
    >
      {label}
    </a>
  );
}
