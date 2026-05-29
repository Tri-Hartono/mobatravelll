"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export default function VideoShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative h-[360px] md:h-[480px] w-full overflow-hidden rounded-3xl lg:rounded-[40px] shadow-xl group">
        {/* Surf image background */}
        <img
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1600"
          alt="Surfing in Blue Sea"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white text-brand hover:text-brand-hover hover:scale-110 shadow-2xl transition-all duration-300 cursor-pointer focus:outline-hidden"
          >
            {/* Pulsing ring animation */}
            <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-75" />
            <Play className="h-8 w-8 fill-current ml-1" />
          </button>
        </div>
      </div>

      {/* Video Modal (Popup) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Travel Video Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
