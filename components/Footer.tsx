"use client";

import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { data, language } = useLanguage();
  const footerData = data.footer;

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Logo & Intro Col */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="mobatravelll logo" className="h-11 w-11 object-contain" />
              <span className="text-2xl font-extrabold text-brand tracking-tight">
                {data.brandName}
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              {footerData.intro}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/mobatravelll" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand hover:bg-brand hover:text-white transition-all shadow-xs">
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com/mobatravelll" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand hover:bg-brand hover:text-white transition-all shadow-xs">
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com/mobatravelll" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand hover:bg-brand hover:text-white transition-all shadow-xs">
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://youtube.com/mobatravelll" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand hover:bg-brand hover:text-white transition-all shadow-xs">
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore / Jelajahi Links (Dynamic navbar items) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">{footerData.aboutTitle}</h4>
            <ul className="flex flex-col gap-2">
              {data.navigation.map((item) => {
                const resolvedHref = item.href.startsWith("#") ? `/${item.href}` : item.href;
                return (
                  <li key={item.name}>
                    <Link href={resolvedHref} className="text-sm font-semibold text-gray-500 hover:text-brand transition-colors">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company / Informasi Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">{footerData.companyTitle}</h4>
            <ul className="flex flex-col gap-2">
              {footerData.company.map((link) => {
                const isPrivacy = link.name.toLowerCase().includes("privasi") || link.name.toLowerCase().includes("privacy");
                return (
                  <li key={link.name}>
                    <Link 
                      href={isPrivacy ? "/privacy" : "/contact"} 
                      className="text-sm font-semibold text-gray-500 hover:text-brand transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">{footerData.contactTitle}</h4>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${footerData.contact.email}`} className="text-sm font-semibold text-gray-500 hover:text-brand flex items-center gap-1.5 transition-colors">
                <Mail className="h-4 w-4 text-brand" /> {footerData.contact.email}
              </a>
              <div className="mt-2">
                <span className="text-xs text-gray-400 font-bold block mb-1">{footerData.getApp}</span>
                <a 
                  href="https://wa.me/6281917285865" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-brand-hover active:scale-[0.98] transition-all cursor-pointer"
                >
                  {footerData.download}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-400 text-center">
          <p>© {new Date().getFullYear()} {data.brandName}. {footerData.rights}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand transition-colors">{footerData.privacy}</Link>
            <Link href="/contact" className="hover:text-brand transition-colors">{footerData.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
