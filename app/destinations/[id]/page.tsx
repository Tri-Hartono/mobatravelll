"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Calendar, CheckCircle2, XCircle, ArrowLeft, ArrowRight, MessageSquare, Ship, ShieldCheck, Users, Info, Sparkles, BedDouble, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { RecommendationItem, PriceTier, RoomTypeOption } from "@/lib/dataLoader";

export default function DestinationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language, data } = useLanguage();
  const recs = data.recommendations;

  const [item, setItem] = useState<RecommendationItem | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState<number>(2);
  const [activeDurationTab, setActiveDurationTab] = useState<"2D1N" | "3D2N">("2D1N");
  const [selectedBoatType, setSelectedBoatType] = useState<"traditional" | "speedboat">("traditional");
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const [dayType, setDayType] = useState<"weekday" | "weekend">("weekday");

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

  // Calculate dynamic unit price based on user selection
  const calculateUnitPrice = (): number => {
    if (item.priceTiers?.days2n1 || item.priceTiers?.days3n2) {
      const tierList = activeDurationTab === "2D1N" ? item.priceTiers.days2n1 : item.priceTiers.days3n2;
      if (tierList && tierList.length > 0) {
        // Find suitable tier based on guests
        let matchedTier = tierList[0];
        if (guests <= 5) matchedTier = tierList[0];
        else if (guests <= 9) matchedTier = tierList[1] || tierList[0];
        else if (guests <= 25) matchedTier = tierList[2] || tierList[0];
        else matchedTier = tierList[3] || tierList[2] || tierList[0];

        return selectedBoatType === "speedboat" 
          ? (matchedTier.speedBoat || item.price)
          : (matchedTier.traditionalBoat || item.price);
      }
    }

    if (item.priceTiers?.speedboatTiers) {
      const tiers = item.priceTiers.speedboatTiers;
      let matchedTier = tiers[0];
      if (guests <= 15) matchedTier = tiers[0];
      else if (guests <= 25) matchedTier = tiers[1] || tiers[0];
      else if (guests <= 50) matchedTier = tiers[2] || tiers[0];
      else matchedTier = tiers[3] || tiers[2] || tiers[0];

      return activeDurationTab === "2D1N" 
        ? (matchedTier.days2n1 || item.price) 
        : (matchedTier.days3n2 || item.price);
    }

    if (item.roomTypes && item.roomTypes.length > 0) {
      const selectedRoom = item.roomTypes[selectedRoomIndex] || item.roomTypes[0];
      if (selectedRoom.weekdayPrice && selectedRoom.weekendPrice) {
        return dayType === "weekend" ? selectedRoom.weekendPrice : selectedRoom.weekdayPrice;
      }
      if (selectedRoom.pricePerPax) {
        return selectedRoom.pricePerPax;
      }
    }

    return item.price;
  };

  const currentUnitPrice = calculateUnitPrice();
  const formattedUnitPrice = currentUnitPrice.toLocaleString("id-ID");
  const totalCost = currentUnitPrice * guests;
  const formattedTotalCost = totalCost.toLocaleString("id-ID");
  const waNumber = "6281917285865";

  const handleBooking = () => {
    if (!selectedDate) return;
    
    let packageDetail = "";
    if (item.priceTiers?.days2n1 || item.priceTiers?.days3n2) {
      packageDetail = ` (Paket ${activeDurationTab} - Kapal ${selectedBoatType === "speedboat" ? "Speedboat AC" : "Tradisional"})`;
    } else if (item.priceTiers?.speedboatTiers) {
      packageDetail = ` (Paket Speedboat ${activeDurationTab})`;
    } else if (item.roomTypes && item.roomTypes.length > 0) {
      const rName = item.roomTypes[selectedRoomIndex]?.name || "";
      packageDetail = ` (Room: ${rName} - ${dayType.toUpperCase()})`;
    }

    const message = language === "id"
      ? `Halo Mobatravelll, saya ingin memesan paket *${item.name}*${packageDetail} untuk keberangkatan tanggal *${selectedDate}* sejumlah *${guests} orang* dengan estimasi harga *Rp ${formattedTotalCost}* (Rp ${formattedUnitPrice}/pax). Mohon info ketersediaan slotnya ya!`
      : `Hello Mobatravelll, I would like to book the *${item.name}*${packageDetail} package departing on *${selectedDate}* for *${guests} guests* with estimated cost *Rp ${formattedTotalCost}* (Rp ${formattedUnitPrice}/pax). Please let me know the availability!`;
      
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  // Dynamic inclusions / exclusions fallback
  const inclusions = item.inclusions && item.inclusions.length > 0
    ? item.inclusions
    : (language === "id" 
        ? ["Tiket Speedboat PP Marina Ancol", "Welcome Drink & Kelapa Muda", "Makan Prasmanan 3x Sehari", "Alat Snorkeling Lengkap & Kamera Undersea", "Penginapan AC Privat Tepi Pantai", "Pemandu Lokal Berpengalaman"]
        : ["Speedboat Ticket Round Trip Marina Ancol", "Welcome Drink & Fresh Coconut", "Buffet Meals 3x Daily", "Full Snorkeling Gear & Underwater Camera", "Private Air-Conditioned Beachfront Villa", "Experienced Local Expert Guide"]);

  const exclusions = item.exclusions && item.exclusions.length > 0
    ? item.exclusions
    : (language === "id"
        ? ["Belanja Pribadi & Cinderamata", "Tips Guide & Crew (Sukarela)", "Wahana Water Sports Ekstra"]
        : ["Personal Expenses & Souvenirs", "Tips for Guide & Crew (Optional)", "Extra Water Sports Rides"]);

  const itinerary = language === "id"
    ? [
        { day: "Hari 1", title: "Keberangkatan & Eksplorasi Bawah Laut", desc: "Berkumpul di Dermaga Keberangkatan (Marina Ancol / Muara Angke). Perjalanan laut menuju pulau. Tiba di penginapan disambut welcome drink segar. Siang hari, naik kapal snorkeling untuk menjelajah spot terumbu karang indah dengan ikan warna-warni. Sore hari menikmati sepeda santai dan berburu sunset emas." },
        { day: "Hari 2", title: "Island Hopping, Water Sport & Sunset BBQ", desc: "Sarapan pagi hangat. Jelajah pulau sekitar, berfoto di pantai pasir putih, bermain banana boat/kano, serta santap siang hidangan laut khas pulau. Sore hari menikmati BBQ lezat di tepi pantai sembari menikmati suasana malam kepulauan." },
        { day: "Hari 3", title: "Sunrise Emas & Kembali ke Jakarta", desc: "Menikmati sunrise emas di dermaga utama pulau. Sarapan pagi, berbelanja oleh-oleh khas pulau, lalu persiapan check-out untuk kembali ke Jakarta dengan pengalaman liburan tak terlupakan." }
      ]
    : [
        { day: "Day 1", title: "Departure & Underwater Snorkeling", desc: "Gather at departure pier. Scenic boat ride to the island. Check-in and enjoy fresh welcome drink. Afternoon boat trip to pristine coral spots for snorkeling with exotic marine life. Evening sunset beach tour." },
        { day: "Day 2", title: "Island Hopping & Beachside BBQ", desc: "Delicious breakfast. Visit surrounding sandy beaches, optional water sports, and fresh seafood lunch. Evening delicious BBQ gathering by the seaside." },
        { day: "Day 3", title: "Golden Sunrise & Return Journey", desc: "Catch the morning sunrise at the island pier. Breakfast, free photo time, check-out and boat journey back to Jakarta with great memories." }
      ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd] relative overflow-x-hidden">
      <Navbar />

      {/* Hero Banner Cover */}
      <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden shadow-lg">
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover object-center scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/35" />

        {/* Title Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-12 mx-auto max-w-7xl w-full z-10">
          <Link href="/destinations" className="inline-flex items-center gap-1 text-xs font-bold text-white/90 hover:text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-max mb-3 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            {language === "id" ? "Kembali ke Semua Destinasi" : "Back to All Destinations"}
          </Link>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand bg-brand-light px-3 py-1 rounded-full w-max mb-2">
            <MapPin className="h-3.5 w-3.5" />
            {item.location}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {item.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-white text-sm font-semibold">
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {item.rating.toFixed(2)}
            </span>
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
              <Ship className="h-4 w-4 text-brand" /> {language === "id" ? "Transportasi PP Terjamin" : "Boat Transfers Included"}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{language === "id" ? "Deskripsi Paket" : "Package Overview"}</h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                {item.duration} {language === "id" ? "Nikmati pesona pantai pasir putih yang jernih, keindahan terumbu karang tropis yang eksotis, dan kesegaran angin laut Kepulauan Seribu bersama Mobatravelll." : "Enjoy the pristine beaches, exotic coral reefs, and the soothing ocean breeze of Thousand Islands with Mobatravelll."}
              </p>

              {/* Notes alert */}
              {item.notes && item.notes.length > 0 && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 p-4 text-sm text-amber-900 font-semibold">
                  <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    {item.notes.map((note, idx) => (
                      <p key={idx}>{note}</p>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Official Price List Tables Section */}
            {(item.priceTiers || item.roomTypes) && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/50">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-brand" />
                      {language === "id" ? "Daftar Harga Resmi (Pricelist)" : "Official Price List"}
                    </h2>
                    <p className="text-xs font-semibold text-gray-400 mt-1">
                      {language === "id" ? "Harga per pax / peserta berdasarkan jumlah peserta & tipe paket" : "Rates per person based on group size and package selection"}
                    </p>
                  </div>

                  {/* Duration Toggle for Harapan / Payung */}
                  {(item.priceTiers?.days2n1 || item.priceTiers?.speedboatTiers) && (
                    <div className="flex rounded-xl bg-gray-100 p-1">
                      <button
                        onClick={() => setActiveDurationTab("2D1N")}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                          activeDurationTab === "2D1N"
                            ? "bg-brand text-white shadow-xs"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        2 Days 1 Night
                      </button>
                      <button
                        onClick={() => setActiveDurationTab("3D2N")}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                          activeDurationTab === "3D2N"
                            ? "bg-brand text-white shadow-xs"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        3 Days 2 Night
                      </button>
                    </div>
                  )}
                </div>

                {/* Table for Pulau Harapan Style (Traditional vs Speedboat) */}
                {(item.priceTiers?.days2n1 && item.priceTiers?.days3n2) && (
                  <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gradient-to-r from-orange-50 to-amber-50 text-gray-800 font-bold border-b border-gray-200">
                        <tr>
                          <th className="px-5 py-4">{language === "id" ? "Jumlah Peserta" : "Group Size"}</th>
                          <th className="px-5 py-4">{language === "id" ? "Kapal Tradisional" : "Traditional Boat"}</th>
                          <th className="px-5 py-4 text-brand">{language === "id" ? "Speedboat AC" : "Speedboat AC"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {(activeDurationTab === "2D1N" ? item.priceTiers.days2n1 : item.priceTiers.days3n2).map((tier, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-5 py-4 font-bold text-gray-900">{tier.participants}</td>
                            <td className="px-5 py-4 text-gray-700">Rp {tier.traditionalBoat?.toLocaleString("id-ID")}</td>
                            <td className="px-5 py-4 font-bold text-brand">Rp {tier.speedBoat?.toLocaleString("id-ID")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Table for Pulau Payung Style (Speedboat Tiers) */}
                {item.priceTiers?.speedboatTiers && (
                  <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gradient-to-r from-orange-50 to-amber-50 text-gray-800 font-bold border-b border-gray-200">
                        <tr>
                          <th className="px-5 py-4">{language === "id" ? "Jumlah Peserta" : "Group Size"}</th>
                          <th className="px-5 py-4">{language === "id" ? "2 Hari 1 Malam (2D1N)" : "2 Days 1 Night"}</th>
                          <th className="px-5 py-4 text-brand">{language === "id" ? "3 Hari 2 Malam (3D2N)" : "3 Days 2 Night"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {item.priceTiers.speedboatTiers.map((tier, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-5 py-4 font-bold text-gray-900">{tier.participants}</td>
                            <td className="px-5 py-4 text-gray-700">Rp {tier.days2n1?.toLocaleString("id-ID")}</td>
                            <td className="px-5 py-4 font-bold text-brand">Rp {tier.days3n2?.toLocaleString("id-ID")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Table for Room Types (Pulau Sepa / Pulau Pelangi) */}
                {item.roomTypes && item.roomTypes.length > 0 && (
                  <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gradient-to-r from-orange-50 to-amber-50 text-gray-800 font-bold border-b border-gray-200">
                        <tr>
                          <th className="px-5 py-4">{language === "id" ? "Tipe Kamar / Villa" : "Room / Villa Type"}</th>
                          {item.roomTypes[0].weekdayPrice !== undefined ? (
                            <>
                              <th className="px-5 py-4">Weekday</th>
                              <th className="px-5 py-4 text-brand">Weekend</th>
                            </>
                          ) : (
                            <>
                              <th className="px-5 py-4">{language === "id" ? "Harga / Orang" : "Rate / Person"}</th>
                              <th className="px-5 py-4 text-brand">{language === "id" ? "Ketersediaan" : "Available Rooms"}</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {item.roomTypes.map((room, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-5 py-4 font-bold text-gray-900 flex items-center gap-2">
                              <BedDouble className="h-4 w-4 text-brand" />
                              {room.name}
                            </td>
                            {room.weekdayPrice !== undefined ? (
                              <>
                                <td className="px-5 py-4 text-gray-700">Rp {room.weekdayPrice?.toLocaleString("id-ID")}</td>
                                <td className="px-5 py-4 font-bold text-brand">Rp {room.weekendPrice?.toLocaleString("id-ID")}</td>
                              </>
                            ) : (
                              <>
                                <td className="px-5 py-4 font-bold text-brand">Rp {room.pricePerPax?.toLocaleString("id-ID")}</td>
                                <td className="px-5 py-4 text-gray-700">{room.roomCount ? `${room.roomCount} Room` : room.capacity}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {/* Inclusions & Exclusions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/50 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  {language === "id" ? "Sudah Termasuk (Include)" : "What is Included"}
                </h3>
                <ul className="flex flex-col gap-3">
                  {inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-rose-500" />
                  {language === "id" ? "Di Luar Include (Exclude)" : "Excluded"}
                </h3>
                <ul className="flex flex-col gap-3">
                  {exclusions.map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Rundown Jadwal / Itinerary */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brand" />
                {item.rundown ? (language === "id" ? `Rundown Kegiatan ${item.name}` : `Trip Schedule for ${item.name}`) : (language === "id" ? "Rencana Perjalanan (Itinerary)" : "Trip Itinerary")}
              </h2>

              {item.rundown && item.rundown.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 text-gray-900 font-bold border-b border-gray-200">
                      <tr>
                        <th className="px-5 py-3.5 w-36 sm:w-44 text-brand font-extrabold">{language === "id" ? "Jam" : "Time"}</th>
                        <th className="px-5 py-3.5">{language === "id" ? "Kegiatan" : "Activity / Agenda"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {item.rundown.map((step, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-amber-50/20 hover:bg-orange-50/40 transition-colors" : "bg-white hover:bg-orange-50/40 transition-colors"}>
                          <td className="px-5 py-3.5 font-bold text-brand whitespace-nowrap">{step.time}</td>
                          <td className="px-5 py-3.5 text-gray-800 font-semibold">{step.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {itinerary.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      {idx !== itinerary.length - 1 && (
                        <div className="absolute top-10 bottom-0 left-[20px] w-0.5 bg-brand-light" />
                      )}
                      <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white font-bold text-xs shadow-md shadow-brand/15">
                        {step.day}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar Interactive Booking Calculator */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 sticky top-28">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                {language === "id" ? "Estimasi Harga Per Pax" : "Calculated Rate / Pax"}
              </span>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-brand">Rp {formattedUnitPrice}</span>
                <span className="text-xs font-bold text-gray-400">/ pax</span>
              </div>

              {/* Security Seal */}
              <div className="flex items-center gap-2 rounded-2xl bg-gray-50 border border-gray-100 p-3 mb-6">
                <ShieldCheck className="h-5 w-5 text-brand flex-shrink-0" />
                <span className="text-xs text-gray-500 font-bold leading-tight">
                  {language === "id" ? "Pricelist resmi Mobatravelll & Asuransi Perjalanan terlindungi." : "Official Mobatravelll pricelist & travel insurance secured."}
                </span>
              </div>

              {/* Boat Type Selector if Available */}
              {(item.priceTiers?.days2n1) && (
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <Ship className="h-3.5 w-3.5 text-brand" /> {language === "id" ? "Pilihan Kapal" : "Boat Type"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedBoatType("traditional")}
                      className={`rounded-xl py-2.5 px-3 text-xs font-bold border transition-all cursor-pointer ${
                        selectedBoatType === "traditional"
                          ? "bg-brand text-white border-brand shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {language === "id" ? "Tradisional" : "Traditional"}
                    </button>
                    <button
                      onClick={() => setSelectedBoatType("speedboat")}
                      className={`rounded-xl py-2.5 px-3 text-xs font-bold border transition-all cursor-pointer ${
                        selectedBoatType === "speedboat"
                          ? "bg-brand text-white border-brand shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      Speedboat AC
                    </button>
                  </div>
                </div>
              )}

              {/* Room Type Selector if Available */}
              {item.roomTypes && item.roomTypes.length > 0 && (
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5 text-brand" /> {language === "id" ? "Tipe Kamar" : "Room Option"}
                  </label>
                  <select
                    value={selectedRoomIndex}
                    onChange={(e) => setSelectedRoomIndex(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-3 pr-10 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden appearance-none cursor-pointer"
                  >
                    {item.roomTypes.map((r, i) => (
                      <option key={i} value={i}>
                        {r.name}
                      </option>
                    ))}
                  </select>

                  {/* Day Type Selector for Weekday/Weekend */}
                  {item.roomTypes[0].weekdayPrice !== undefined && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => setDayType("weekday")}
                        className={`rounded-xl py-2 px-3 text-xs font-bold border transition-all cursor-pointer ${
                          dayType === "weekday"
                            ? "bg-brand text-white border-brand shadow-xs"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        Weekday
                      </button>
                      <button
                        onClick={() => setDayType("weekend")}
                        className={`rounded-xl py-2 px-3 text-xs font-bold border transition-all cursor-pointer ${
                          dayType === "weekend"
                            ? "bg-brand text-white border-brand shadow-xs"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        Weekend
                      </button>
                    </div>
                  )}
                </div>
              )}

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
                  <Users className="h-3.5 w-3.5 text-brand" /> {language === "id" ? "Jumlah Peserta" : "Number of Guests"}
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-3 pr-10 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden appearance-none cursor-pointer"
                  >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60].map((num) => (
                      <option key={num} value={num}>
                        {num} {language === "id" ? "Orang / Peserta" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Estimated Total */}
              <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">{language === "id" ? "Estimasi Total" : "Estimated Total"}</span>
                <span className="text-2xl font-extrabold text-brand">Rp {formattedTotalCost}</span>
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

