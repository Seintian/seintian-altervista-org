import React from "react";

/**
 * Formats a string containing markdown-style backticks (`code`) into
 * stylized, accessible <code> spans tailored for technical and academic terms.
 */
export function formatCodeSpans(text: string): React.ReactNode {
    if (!text || typeof text !== "string") return text;
    if (!text.includes("`")) return text;

    const parts = text.split(/(`[^`]+`)/g);

    return parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
            const code = part.slice(1, -1);
            return (
                <code
                    key={index}
                    className="font-mono text-[0.88em] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 text-blue-600 dark:text-blue-400 border border-slate-200/80 dark:border-slate-700/80 font-semibold tracking-tight inline-block align-baseline"
                >
                    {code}
                </code>
            );
        }
        return part;
    });
}
