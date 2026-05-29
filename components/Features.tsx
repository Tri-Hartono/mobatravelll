"use client";

import * as Icons from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Features() {
  const { data } = useLanguage();
  const features = data.features;

  return (
    <section id="about-us" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-gray-50/50 rounded-3xl my-12">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          {features.title}
        </h2>
        <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
          {features.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.items.map((feat) => {
          // Dynamic icon loader
          let IconComponent = Icons.Globe;
          if (feat.icon === "UserCheck") IconComponent = Icons.UserCheck;
          if (feat.icon === "Calendar") IconComponent = Icons.Calendar;

          return (
            <div
              key={feat.id}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 mb-6">
                <IconComponent className="h-8 w-8" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand transition-colors duration-200">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {feat.description}
              </p>

              {/* Read more CTA */}
              <a
                href="#"
                className="text-sm font-bold text-brand hover:text-brand-hover inline-flex items-center gap-1 group-hover:underline"
              >
                {features.readMore}
                <Icons.ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
