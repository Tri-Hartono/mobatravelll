"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Subscribe() {
  const { data } = useLanguage();
  const sub = data.subscribe;
  
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      alert(`${sub.successAlert} ${email}`);
      setEmail("");
      setSubscribed(false);
    }, 1000);
  };

  return (
    <section id="subscribe" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-[32px] bg-brand-light border border-brand/10 px-8 py-12 md:py-16 md:px-12 text-center shadow-xs">
        {/* Floating circles decor */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand/5 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            {sub.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-lg">
            {sub.subtitle}
          </p>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="mt-8 w-full max-w-md flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={sub.placeholder}
                className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:border-brand focus:outline-hidden shadow-xs transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={subscribed}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-brand/15 hover:bg-brand-hover active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {subscribed ? sub.subscribing : sub.button}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
