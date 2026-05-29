"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Articles() {
  const { data } = useLanguage();
  const articles = data.articles;

  return (
    <section id="review" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Title block */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          {articles.title}
        </h2>
        <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
          {articles.subtitle}
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.items.map((art) => (
          <div
            key={art.id}
            className="group relative h-[400px] w-full overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={art.image}
              alt={art.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

            {/* Content Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end">
              <span className="text-xs font-semibold text-brand mb-1.5 uppercase tracking-wider">
                {art.location}
              </span>
              <h3 className="text-xl font-bold leading-snug mb-3 group-hover:text-brand-light transition-colors">
                {art.title}
              </h3>
              <span className="text-xs font-bold inline-flex items-center gap-1 text-gray-300 group-hover:text-white transition-colors">
                {articles.readArticle}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-12 flex justify-center">
        <button className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/10 hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
          {articles.exploreMore}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
