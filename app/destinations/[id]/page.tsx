"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Calendar, CheckCircle2, XCircle, ArrowLeft, ArrowRight, MessageSquare, Ship, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { RecommendationItem } from "@/lib/dataLoader";

export default function DestinationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language, data } = useLanguage();
  const recs = data.recommendations;

  const [item, setItem] = useState<RecommendationItem | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState<number>(1);

  // Load the matching destination
  useEffect(() => {
    if (id && recs.items) {
      const found = recs.items.find((p) => p.id === id);
      if (found) {
        setItem(found);
      }
    }
  }, [id, recs]);

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fcfcfd] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
      </div>
    );
  }

  const formattedPrice = item.price.toLocaleString("id-ID");
  const waNumber = "6281917285865";

  const handleBooking = () => {
    if (!selectedDate) return;
    const totalCost = item.price * guests;
    const formattedTotalCost = totalCost.toLocaleString("id-ID");
    const message = language === "id"
      ? `Halo mobatravelll, saya ingin memesan paket *${item.name}* untuk keberangkatan tanggal *${selectedDate}* sejumlah *${guests} orang* dengan total harga *Rp ${formattedTotalCost}* (Rp ${formattedPrice} per pax). Mohon info ketersediaan slotnya ya!`
      : `Hello mobatravelll, I would like to book the *${item.name}* package departing on *${selectedDate}* for *${guests} guests* with a total cost of *Rp ${formattedTotalCost}* (Rp ${formattedPrice} per pax). Please let me know the availability!`;
      
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  // Static high quality details
  const inclusions = language === "id" 
    ? ["Tiket Speedboat PP Marina Ancol", "Welcome Drink & Kelapa Muda", "Makan Prasmanan 3x Sehari", "Alat Snorkeling Lengkap & Kamera Undersea", "Penginapan AC Privat Tepi Pantai", "Pemandu Lokal Berpengalaman"]
    : ["Speedboat Ticket Round Trip Marina Ancol", "Welcome Drink & Fresh Coconut", "Buffet Meals 3x Daily", "Full Snorkeling Gear & Underwater Camera", "Private Air-Conditioned Beachfront Villa", "Experienced Local Expert Guide"];

  const exclusions = language === "id"
    ? ["Belanja Pribadi & Cinderamata", "Tips Guide & Crew (Sukarela)", "Wahana Water Sports Ekstra"]
    : ["Personal Expenses & Souvenirs", "Tips for Guide & Crew (Optional)", "Extra Water Sports Rides"];

  const itinerary = language === "id"
    ? [
        { day: "Hari 1", title: "Keberangkatan & Eksplorasi Bawah Laut", desc: "Berkumpul di Dermaga Marina Ancol pukul 07.30 pagi. Perjalanan seru dengan speedboat berkecepatan tinggi menuju pulau. Tiba di pulau disambut welcome drink kelapa muda segar. Siang hari, naik kapal snorkeling tradisional untuk menjelajah 3 spot terumbu karang indah dengan ikan warna-warni. Sore hari menikmati sepeda santai dan berburu sunset emas." },
        { day: "Hari 2", title: "Konservasi Tukik & Sunset Romantis", desc: "Sarapan pagi prasmanan hangat. Mengunjungi penangkaran penyu hijau (Turtle Conservation) untuk melepas tukik dan belajar menjaga ekosistem laut Kepulauan Seribu. Dilanjutkan makan siang seafood segar khas pulau. Sore hari menikmati BBQ ikan segar di tepi pantai sembari menunggu senja romantis tiba." },
        { day: "Hari 3", title: "Sunrise Emas & Kembali ke Ancol", desc: "Bangun pagi berburu sunrise emas di dermaga pulau utama. Menikmati teh hangat dan sarapan pagi. Acara bebas berfoto di landmark pulau. Pukul 13.30 siang bersiap check-out dan naik speedboat untuk kembali menuju Marina Ancol Jakarta dengan kenangan liburan tak terlupakan." }
      ]
    : [
        { day: "Day 1", title: "Departure & Underwater Snorkeling", desc: "Gather at Marina Ancol Pier at 07.30 AM. Embark on a thrilling speedboat ride to the island. Check-in and enjoy fresh welcome drink coconut. Afternoon boat trip to 3 pristine coral spots for snorkeling with exotic marine life. Evening sunset cycling tour." },
        { day: "Day 2", title: "Sea Turtle Conservation & Beach BBQ", desc: "Delicious buffet breakfast. Visit the green turtle conservation center to release baby turtles and learn about eco preservation. Enjoy fresh seafood lunch. Romantic sunset beach stroll followed by an open-air fish BBQ." },
        { day: "Day 3", title: "Golden Sunrise & Speedboat Return", desc: "Catch the golden sunrise at the island pier. Warm tea and breakfast. Free time for souvenir shopping and photo sessions at the island's landmark. Check-out at 01.30 PM and return speedboat trip to Marina Ancol." }
      ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd] relative overflow-x-hidden">
      <Navbar />

      {/* Decorative Dots */}
      <div className="absolute top-[400px] left-[5%] w-3.5 h-3.5 rounded-full bg-brand/35 pointer-events-none animate-pulse" />
      <div className="absolute top-[800px] right-[8%] w-4 h-4 rounded-full bg-brand-light border border-brand/20 pointer-events-none" />

      {/* Hero Banner Cover */}
      <div className="relative h-[420px] md:h-[520px] w-full overflow-hidden shadow-lg">
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover object-center scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/35" />

        {/* Title Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-12 mx-auto max-w-7xl w-full z-10">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand bg-brand-light px-3 py-1 rounded-full w-max mb-3">
            <MapPin className="h-3.5 w-3.5" />
            {item.location}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {item.name}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-white text-sm font-semibold">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {item.rating.toFixed(2)}
            </span>
            <span className="flex items-center gap-1">
              <Ship className="h-4 w-4 text-brand" /> Speedboat PP
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Details Columns */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Overview */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                {item.duration} {language === "id" ? "Nikmati pesona pantai pasir putih yang jernih, terumbu karang tropis yang eksotis, dan angin laut Kepulauan Seribu yang menenangkan jiwa. Sangat cocok untuk liburan akhir pekan keluarga, honeymoon, maupun kumpul rekan kantor." : "Enjoy the pristine white sand beaches, exotic tropical coral reefs, and the soothing ocean breeze of Thousand Islands. Perfectly designed for weekend escapes, honeymoon trips, or corporate gatherings."}
              </p>
            </section>

            {/* Itinerary */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{language === "id" ? "Rencana Perjalanan (Itinerary)" : "Trip Itinerary"}</h2>
              <div className="flex flex-col gap-6">
                {itinerary.map((step, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {/* timeline line */}
                    {idx !== itinerary.length - 1 && (
                      <div className="absolute top-10 bottom-0 left-[20px] w-0.5 bg-brand-light" />
                    )}
                    {/* Timeline Day badge */}
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white font-bold text-xs shadow-md shadow-brand/15">
                      {step.day}
                    </div>
                    {/* Timeline text */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/50 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{language === "id" ? "Sudah Termasuk" : "What is Included"}</h3>
                <ul className="flex flex-col gap-3">
                  {inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{language === "id" ? "Belum Termasuk" : "Excluded"}</h3>
                <ul className="flex flex-col gap-3">
                  {exclusions.map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                      <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right Sidebar Booking Column */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 sticky top-28">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                {language === "id" ? "Harga Spesial" : "Special Rate"}
              </span>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-brand">Rp {formattedPrice}</span>
                <span className="text-xs font-bold text-gray-400">/ pax</span>
              </div>

              {/* Security Seal */}
              <div className="flex items-center gap-2 rounded-2xl bg-gray-50 border border-gray-100 p-3 mb-6">
                <ShieldCheck className="h-5 w-5 text-brand flex-shrink-0" />
                <span className="text-xs text-gray-500 font-bold leading-tight">
                  {language === "id" ? "Speedboat berlisensi & Asuransi Jasa Raharja terlindungi." : "Licensed speedboats & travel insurance secured."}
                </span>
              </div>

              {/* Departure Date Selection */}
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-brand" /> {language === "id" ? "Pilih Tanggal Perjalanan" : "Select Travel Date"}
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden cursor-pointer"
                />
              </div>

              {/* Guest Count Selection */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-brand" /> {language === "id" ? "Jumlah Tamu" : "Number of Guests"}
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-3 pr-10 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden appearance-none cursor-pointer"
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {language === "id" ? "Orang" : "Guests"}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                    <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Dynamic Estimated Total */}
              <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">{language === "id" ? "Total Harga" : "Total Price"}</span>
                <span className="text-2xl font-extrabold text-brand">Rp {(item.price * guests).toLocaleString("id-ID")}</span>
              </div>

              {/* Confirm Booking CTA */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/10 hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                <MessageSquare className="h-4 w-4" />
                {language === "id" ? "Pesan via WhatsApp" : "Book via WhatsApp"}
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
