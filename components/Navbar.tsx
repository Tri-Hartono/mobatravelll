"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, data } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarBg = mobileMenuOpen 
    ? 'bg-black/95 backdrop-blur-md shadow-lg' 
    : scrolled 
      ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100/80' 
      : 'bg-transparent';

  const navbarHeight = scrolled ? 'h-20' : 'h-24';

  // Premium dynamic text and icon color transitions
  const logoTextClass = mobileMenuOpen 
    ? 'text-white' 
    : scrolled 
      ? 'text-gray-900 group-hover:text-brand' 
      : 'text-white';

  const linkTextClass = mobileMenuOpen
    ? 'text-white'
    : scrolled
      ? 'text-gray-700 hover:text-brand'
      : 'text-white/90 hover:text-white';

  const globeTextClass = mobileMenuOpen
    ? 'text-white hover:bg-white/10'
    : scrolled
      ? 'text-gray-700 hover:bg-gray-100'
      : 'text-white hover:bg-white/10';

  const iconClass = mobileMenuOpen
    ? 'text-white/80'
    : scrolled
      ? 'text-gray-500'
      : 'text-white/80';

  const chevronClass = mobileMenuOpen
    ? 'text-white/60'
    : scrolled
      ? 'text-gray-400'
      : 'text-white/60';

  const mobileToggleClass = mobileMenuOpen
    ? 'text-white hover:bg-white/10 animate-fadeIn'
    : scrolled
      ? 'text-gray-700 hover:bg-gray-100'
      : 'text-white hover:bg-white/10';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${navbarBg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex ${navbarHeight} items-center justify-between transition-all duration-300`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img src="/logo.png" alt="mobatravelll logo" className="h-11 w-11 object-contain group-hover:scale-105 transition-transform duration-300" />
              <span className={`text-2xl font-extrabold tracking-tight group-hover:text-brand/90 transition-colors ${logoTextClass}`}>
                {data.brandName}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {data.navigation.map((item) => {
              const resolvedHref = item.href.startsWith("#") ? `/${item.href}` : item.href;
              return (
                <Link
                  key={item.name}
                  href={resolvedHref}
                  className={`text-sm font-semibold transition-colors duration-200 ${linkTextClass}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right section (Language & Get Started Button) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${globeTextClass}`}
              >
                <Globe className={`h-4 w-4 transition-colors ${iconClass}`} />
                <span>{language === "id" ? "Indonesia" : "English"}</span>
                <ChevronDown className={`h-3 w-3 transition-colors ${chevronClass}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden z-50">
                  <button
                    onClick={() => {
                      setLanguage("id");
                      setLangOpen(false);
                    }}
                    className="flex w-full items-center px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-brand-light hover:text-brand transition-colors text-left font-semibold cursor-pointer"
                  >
                    🇮🇩 Indonesia
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangOpen(false);
                    }}
                    className="flex w-full items-center px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-brand-light hover:text-brand transition-colors text-left font-semibold cursor-pointer"
                  >
                    🇺🇸 English
                  </button>
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              {language === "id" ? "Hubungi Kami" : "Contact Us"}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Language Selector Toggle */}
            <button
              onClick={() => setLanguage(language === "id" ? "en" : "id")}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold ${mobileToggleClass}`}
            >
              <Globe className="h-3.5 w-3.5" />
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 ${mobileToggleClass}`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
          <div className="space-y-1 px-4 py-4 pb-6">
            {data.navigation.map((item) => {
              const resolvedHref = item.href.startsWith("#") ? `/${item.href}` : item.href;
              return (
                <Link
                  key={item.name}
                  href={resolvedHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-white/95 hover:bg-white/10 transition-all"
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10 px-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-brand py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-brand-hover transition-colors"
              >
                {language === "id" ? "Hubungi Kami" : "Contact Us"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

