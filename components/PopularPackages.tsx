"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

const packageIdMap: Record<string, string> = {
  p1: "r1", // Pulau Macan -> Pulau Macan Eco Resort
  p2: "r2", // Pulau Pari -> Pulau Pari Sandy Beach
  p3: "r4", // Pulau Pramuka -> Pulau Pramuka Turtle Tour
  p4: "r3"  // Pulau Harapan -> Pulau Harapan Hopping
};

export default function PopularPackages() {
  const { data } = useLanguage();
  const packages = data.popularPackages;

  return (
    <section id="trip-plan" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Title block */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          {packages.title}
        </h2>
        <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
          {packages.subtitle}
        </p>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {packages.items.map((pkg) => {
          const mappedId = packageIdMap[pkg.id] || pkg.id;
          return (
            <Link
              key={pkg.id}
              href={`/destinations/${mappedId}`}
              className="group relative h-[360px] w-full overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer block"
            >
              {/* Card Background Image */}
              <img
                src={pkg.image}
                alt={pkg.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />

              {/* Content Bottom Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                <span className="inline-flex max-w-max rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white mb-2">
                  {pkg.duration}
                </span>
                <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-brand-light transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-xs text-gray-300 font-medium">{packages.clickDetail}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Explore More Button */}
      <div className="mt-12 flex justify-center">
        <Link 
          href="/destinations"
          className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/10 hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          {packages.exploreMore}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
