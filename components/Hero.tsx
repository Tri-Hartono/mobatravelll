"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { language, data } = useLanguage();
  const heroData = data.hero;
  const router = useRouter();
  
  const [location, setLocation] = useState(heroData.locations[0]);
  const [checkIn, setCheckIn] = useState("2026-06-14");
  const [checkOut, setCheckOut] = useState("2026-06-18");
  const [guests, setGuests] = useState("4 Person");

  // Keep location updated when language changes
  useEffect(() => {
    setLocation(heroData.locations[0]);
  }, [heroData]);

  return (
    <div className="relative w-full pb-16">
      {/* Background Image Container with Premium Overlay */}
      <div className="relative h-[560px] md:h-[680px] w-full overflow-hidden shadow-lg">
        <img
          src={heroData.bgImage}
          alt="Explore the World"
          className="h-full w-full object-cover object-center scale-[1.01] hover:scale-[1.03] transition-transform duration-10000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/35" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center pt-24 md:pt-32">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-md">
            {heroData.title}
          </h1>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-gray-100 font-medium drop-shadow-xs">
            {heroData.subtitle}
          </p>
        </div>
      </div>

      {/* Floating Search Panel */}
      <div className="relative -mt-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-20">
        <div className="rounded-[32px] bg-white p-6 sm:p-8 shadow-xl border border-gray-100/50 backdrop-blur-md">
          {/* Headline inside Card */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Search className="h-5 w-5 text-brand" /> {heroData.labels.yourLocation}
              </h3>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand">
                {heroData.labels.privacy}
              </span>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
            {/* Location Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {heroData.labels.destination}
              </label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-3 pr-10 text-sm font-semibold text-gray-700 focus:border-brand focus:bg-white focus:outline-hidden appearance-none cursor-pointer"
                >
                  {heroData.locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            {/* Check-In Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {heroData.labels.checkIn}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm font-semibold text-gray-700 focus:border-brand focus:bg-white focus:outline-hidden cursor-pointer"
              />
            </div>

            {/* Check-Out Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {heroData.labels.checkOut}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm font-semibold text-gray-700 focus:border-brand focus:bg-white focus:outline-hidden cursor-pointer"
              />
            </div>

            {/* Guests Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {heroData.labels.guest}
              </label>
              <div className="relative">
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-3 pr-10 text-sm font-semibold text-gray-700 focus:border-brand focus:bg-white focus:outline-hidden appearance-none cursor-pointer"
                >
                  <option value="1 Person">{language === "id" ? "1 Orang" : "1 Person"}</option>
                  <option value="2 Person">{language === "id" ? "2 Orang" : "2 Person"}</option>
                  <option value="4 Person">{language === "id" ? "4 Orang" : "4 Person"}</option>
                  <option value="6 Person">{language === "id" ? "6 Orang" : "6 Person"}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button Row */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                const params = new URLSearchParams();
                if (location) params.set("filter", location);
                router.push(`/destinations?${params.toString()}`);
              }}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <Search className="h-4 w-4" /> {heroData.labels.search}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
