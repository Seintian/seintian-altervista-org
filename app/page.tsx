import { siteData } from "@/lib/data";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 md:py-24">

      {/* Hero Section */}
      <section className="flex flex-col items-start justify-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
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

      {/* Bento Box Navigation Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-3 auto-rows-[160px] gap-4 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
        {siteData.modules.map((mod) => (
          <a
            key={mod.id}
            href={mod.href}
            className={`group flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 ${mod.colSpan} ${mod.rowSpan}`}
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {mod.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {mod.description}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              {/* Animated Arrow Icon */}
              <svg 
                className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-all duration-300 group-hover:translate-x-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        ))}
      </section>

      {/* Checkpoint 3: The Custom Timeline */}
      <section id="experience" className="border-t border-slate-200 pt-24 min-h-screen scroll-mt-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Experience</h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            A look at my career history, the teams I've worked with, and the technologies I've leveraged to drive business results.
          </p>
        </div>

        {/* Drop the modular component here */}
        <ExperienceTimeline />
      </section>

    </main>
  );
}
