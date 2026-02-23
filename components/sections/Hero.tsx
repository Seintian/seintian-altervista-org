"use client";

import React from "react";
import { useSiteContext } from "@/context/SiteContext";
import ContactButton from "@/components/ui/ContactButton";

export default function Hero() {
  const { personal, contacts } = useSiteContext();

  return (
    <section className="flex flex-col items-start justify-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
        Hello, I'm <span className="text-blue-600">{personal.name}</span>.
      </h1>
      <h2 className="text-2xl md:text-3xl font-medium text-slate-700 mb-6">
        {personal.role}
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
        {personal.bio}
      </p>

      <div className="flex flex-wrap gap-4">
        {contacts.map((contact) => (
          <ContactButton
            key={contact.id}
            id={contact.id}
            label={contact.label}
            url={contact.url}
            isPrimary={contact.isPrimary}
          />
        ))}
      </div>
    </section>
  );
}
