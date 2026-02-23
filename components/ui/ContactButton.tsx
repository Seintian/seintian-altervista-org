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
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isPrimary
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400"
      }`}
    >
      {label}
    </a>
  );
}
