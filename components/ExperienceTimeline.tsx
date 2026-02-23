import Skeleton from "@/components/ui/Skeleton";

interface ExperienceTimelineProps {
  experience?: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
  }>;
  isLoading?: boolean;
}

export default function ExperienceTimeline({ experience, isLoading }: ExperienceTimelineProps) {
  if (isLoading) {
    return <TimelineSkeleton />;
  }

  if (!experience) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ol className="relative border-s-2 border-slate-200 ml-3 md:ml-0">
        {experience.map((job) => (
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

function TimelineSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative border-s-2 border-slate-100 ml-3 md:ml-0">
        {[1, 2].map((i) => (
          <div key={i} className="mb-12 ms-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <Skeleton className="h-6 w-48 mb-2 sm:mb-0" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-20 w-full mb-4" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
