import { siteData } from "@/lib/data";

export default function ExperienceTimeline() {
  return (
    <div className="max-w-3xl mx-auto">
      <ol className="relative border-s-2 border-slate-200 ml-3 md:ml-0">
        {siteData.experience.map((job, index) => (
          <li key={job.id} className="mb-12 ms-8 group">
            {/* The Timeline Dot */}
            <span className="absolute flex items-center justify-center w-4 h-4 bg-white rounded-full -start-[9px] ring-4 ring-slate-100 border border-slate-300 group-hover:border-blue-600 group-hover:ring-blue-50 transition-all duration-300"></span>

            {/* Content Card */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900">
                {job.role} <span className="text-blue-600 font-medium hidden sm:inline">@ {job.company}</span>
              </h3>
              <time className="text-sm font-medium text-slate-500 mt-1 sm:mt-0">
                {job.period}
              </time>
            </div>

            {/* Mobile Company Name */}
            <div className="text-blue-600 font-medium sm:hidden mb-2">
              {job.company}
            </div>

            <p className="mb-4 text-slate-600 leading-relaxed">
              {job.description}
            </p>

            {/* Technologies Pills */}
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-full border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
