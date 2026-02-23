import React from "react";

interface BentoCardProps {
  title: string;
  description: string;
  href: string;
  colSpan?: string;
  rowSpan?: string;
}

export default function BentoCard({ title, description, href, colSpan, rowSpan }: BentoCardProps) {
  return (
    <a
      href={href}
      className={`group flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 ${colSpan} ${rowSpan}`}
    >
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
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
  );
}
