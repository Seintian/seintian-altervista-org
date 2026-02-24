import Skeleton from "@/components/ui/Skeleton";

interface EducationTimelineProps {
    education?: Array<{
        id: string;
        degree: string;
        school: string;
        location: string;
        period: string;
    }>;
    certifications?: string[];
    isLoading?: boolean;
}

export default function EducationTimeline({ education, certifications, isLoading }: EducationTimelineProps) {
    if (isLoading) {
        return <TimelineSkeleton />;
    }

    if (!education) {
        return null;
    }

    return (
        <div className="max-w-3xl mx-auto">
            <ol className="relative border-s-2 border-slate-200 ml-3 md:ml-0 mb-12">
                {education.map((edu) => (
                    <li key={edu.id} className="mb-12 ms-8 group">
                        {/* The Timeline Dot */}
                        <span className="absolute flex items-center justify-center w-4 h-4 bg-white rounded-full -start-[9px] ring-4 ring-slate-100 border border-slate-300 group-hover:border-blue-600 group-hover:ring-blue-50 transition-all duration-300"></span>

                        {/* Content Card */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                            <h3 className="text-xl font-bold text-slate-900">
                                {edu.degree}
                            </h3>
                            <time className="text-sm font-medium text-slate-500 mt-1 sm:mt-0">
                                {edu.period}
                            </time>
                        </div>

                        <div className="text-blue-600 font-medium mb-1">
                            {edu.school}
                        </div>

                        <p className="text-slate-600 mb-4">
                            {edu.location}
                        </p>
                    </li>
                ))}
            </ol>

            {certifications && certifications.length > 0 && (
                <div className="mt-8 ms-3 md:ms-0">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Certifications</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                        {certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function TimelineSkeleton() {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="relative border-s-2 border-slate-100 ml-3 md:ml-0 mb-12">
                {[1, 2].map((i) => (
                    <div key={i} className="mb-12 ms-8">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                            <Skeleton className="h-6 w-64 mb-2 sm:mb-0" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                ))}
            </div>
        </div>
    );
}
