import EducationTimeline from "@/components/EducationTimeline";

interface EducationSectionProps {
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

export default function EducationSection({ education, certifications, isLoading }: EducationSectionProps) {
    return (
        <section id="education" className="border-t border-slate-200 pt-24 pb-24 scroll-mt-12">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Education & Certifications</h2>
                <p className="text-lg text-slate-600 max-w-2xl">
                    My academic background and relevant certifications in Computer Science and software engineering.
                </p>
            </div>

            <EducationTimeline education={education} certifications={certifications} isLoading={isLoading} />
        </section>
    );
}
