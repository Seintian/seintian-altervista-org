import { siteData } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 md:py-24">
      
      {/* Hero Section */}
      <section className="flex flex-col items-start justify-center mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          Hello, I'm <span className="text-blue-600">{siteData.personal.name}</span>.
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-slate-700 mb-6">
          {siteData.personal.role}
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
          {siteData.personal.bio}
        </p>

        {/* Dynamic Contact Links */}
        <div className="flex flex-wrap gap-4">
          {siteData.contacts.map((contact) => (
            <a
              key={contact.id}
              href={contact.url}
              target={contact.id !== "email" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                contact.isPrimary
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400"
              }`}
            >
              {contact.label}
            </a>
          ))}
        </div>
      </section>

      {/* Placeholder for Checkpoint 2 (Bento Box) */}
      <section className="border-t border-slate-200 pt-12">
        <p className="text-slate-400 italic">Bento Box & Timeline modules coming soon...</p>
      </section>

    </main>
  );
}
