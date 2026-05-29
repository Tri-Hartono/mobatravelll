"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getTripData, TripDataSchema, Language, LanguageContextType } from "./dataLoader";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("id"); // Default to Indonesian
  const [data, setData] = useState<TripDataSchema>(getTripData("id"));

  useEffect(() => {
    setData(getTripData(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
