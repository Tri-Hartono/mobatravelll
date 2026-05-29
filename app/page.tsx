import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularPackages from "@/components/PopularPackages";
import Features from "@/components/Features";
import VideoShowcase from "@/components/VideoShowcase";
import Recommendations from "@/components/Recommendations";
import Articles from "@/components/Articles";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd] relative overflow-x-hidden">
      {/* Scattered Decorative Floating Circles (Bulat-bulat Kecil dari Mockup) */}
      <div className="absolute top-[850px] left-[5%] md:left-[10%] w-3.5 h-3.5 rounded-full bg-brand/40 animate-pulse pointer-events-none z-10" />
      <div className="absolute top-[980px] right-[6%] md:right-[12%] w-4 h-4 rounded-full bg-purple-500/30 pointer-events-none z-10" />
      <div className="absolute top-[1350px] left-[15%] w-2 h-2 rounded-full bg-brand/60 pointer-events-none z-10" />
      <div className="absolute top-[1500px] right-[18%] w-3 h-3 rounded-full bg-brand/50 pointer-events-none z-10 animate-bounce" />
      <div className="absolute top-[2100px] left-[8%] w-4 h-4 rounded-full bg-brand-hover/45 pointer-events-none z-10" />
      <div className="absolute top-[2450px] right-[8%] w-2.5 h-2.5 rounded-full bg-purple-400/40 pointer-events-none z-10" />
      <div className="absolute top-[3150px] left-[12%] w-3 h-3 rounded-full bg-brand/50 pointer-events-none z-10" />
      <div className="absolute top-[3450px] right-[14%] w-4 h-4 rounded-full bg-brand-hover/35 pointer-events-none z-10 animate-pulse" />
      <div className="absolute top-[3900px] left-[6%] w-2 h-2 rounded-full bg-brand/60 pointer-events-none z-10" />

      {/* Header Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Banner and search form */}
        <Hero />

        {/* Popular Packages grid */}
        <PopularPackages />

        {/* Feature section */}
        <Features />

        {/* Surfing video promo showcase */}
        <VideoShowcase />

        {/* Travel recommendations with location sorting */}
        <Recommendations />

        {/* Dynamic travel blogs */}
        <Articles />

        {/* Subscription letter box */}
        <Subscribe />
      </main>

      {/* Comprehensive footer with brand and contact info */}
      <Footer />
    </div>
  );
}
