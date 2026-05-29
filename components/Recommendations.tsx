'use client';

import { useState } from 'react';
import { Star, MapPin, Calendar, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { RecommendationItem } from '@/lib/dataLoader';

export default function Recommendations() {
    const { language, data } = useLanguage();
    const recs = data.recommendations;

    const [filter, setFilter] = useState('ALL');
    const [bookingItem, setBookingItem] = useState<RecommendationItem | null>(
        null,
    );
    const [selectedDate, setSelectedDate] = useState('');

    // Pulau Seribu filtering options
    const locations = [
        'ALL',
        'Pulau Macan',
        'Pulau Pari',
        'Pulau Harapan',
        'Pulau Pramuka',
    ];

    const filteredItems =
        filter === 'ALL'
            ? recs.items
            : recs.items.filter((item) =>
                  item.name.toLowerCase().includes(filter.toLowerCase()),
              );

    // Trigger WhatsApp redirection
    const handleConfirmBooking = () => {
        if (!bookingItem || !selectedDate) return;

        const formattedPrice = bookingItem.price.toLocaleString('id-ID');
        const waNumber = '6281917285865';

        const message =
            language === 'id'
                ? `Halo Mobatravelll, saya ingin memesan paket *${bookingItem.name}* untuk keberangkatan tanggal *${selectedDate}* dengan harga *Rp ${formattedPrice}* per pax. Mohon info ketersediaan slotnya ya!`
                : `Hello Mobatravelll, I would like to book the *${bookingItem.name}* package departing on *${selectedDate}* at *Rp ${formattedPrice}* per pax. Please let me know the availability!`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
        setBookingItem(null);
        setSelectedDate('');
    };

    return (
        <section
            id='destinations'
            className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative'
        >
            {/* Header Area */}
            <div className='flex flex-wrap items-end justify-between gap-6 mb-12'>
                <div>
                    <h2 className='text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
                        {recs.title}
                    </h2>
                    <p className='mt-3 text-base text-gray-500 max-w-md'>
                        {recs.subtitle}
                    </p>
                </div>

                {/* Explore All Button & Filters */}
                <div className='flex flex-wrap items-center gap-4'>
                    <Link
                        href='/destinations'
                        className='group text-sm font-bold text-brand hover:text-brand-hover inline-flex items-center gap-1.5 transition-colors cursor-pointer mr-2'
                    >
                        {language === 'id' ? 'Lihat Semua' : 'See All'}
                        <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </Link>
                    <div className='flex flex-wrap gap-2'>
                        {locations.slice(0, 3).map((loc) => (
                            <button
                                key={loc}
                                onClick={() => setFilter(loc)}
                                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                    filter === loc
                                        ? 'bg-brand text-white shadow-md shadow-brand/10'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {loc === 'ALL' ? recs.filterAll : loc}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid of Recommendations */}
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                {filteredItems.slice(0, 6).map((item) => (
                    <div
                        key={item.id}
                        className='flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'
                    >
            {/* Card Image Container */}
            <Link href={`/destinations/${item.id}`} className="block relative h-64 w-full overflow-hidden cursor-pointer">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Rating overlay badge */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-xs">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {item.rating.toFixed(2)}
              </div>
            </Link>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-6">
              <Link href={`/destinations/${item.id}`} className="block cursor-pointer flex-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-1">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  {item.location}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6">
                  {item.duration}
                </p>
              </Link>

                            {/* Price & Book CTA */}
                            <div className='mt-auto flex items-center justify-between pt-4 border-t border-gray-50'>
                                <div>
                                    <span className='text-xs font-semibold text-gray-400 block'>
                                        {recs.startFrom}
                                    </span>
                                    <span className='text-xl font-extrabold text-gray-900'>
                                        Rp {item.price.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setBookingItem(item)}
                                    className='rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer'
                                >
                                    {recs.bookNow}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modern Date Selection Modal */}
            {bookingItem && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs'>
                    <div className='relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100'>
                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setBookingItem(null);
                                setSelectedDate('');
                            }}
                            className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
                        >
                            <X className='h-5 w-5' />
                        </button>

                        {/* Modal Heading */}
                        <h3 className='text-xl font-bold text-gray-900 mb-2'>
                            {language === 'id'
                                ? 'Pilih Tanggal Keberangkatan'
                                : 'Select Departure Date'}
                        </h3>
                        <p className='text-sm text-gray-500 mb-6'>
                            {language === 'id'
                                ? 'Silakan tentukan tanggal trip Anda untuk melanjutkan pemesanan langsung ke WhatsApp kami.'
                                : 'Please specify your trip date to proceed directly with booking to our WhatsApp.'}
                        </p>

                        {/* Package Summary Card */}
                        <div className='rounded-2xl bg-brand-light border border-brand/10 p-4 mb-6'>
                            <span className='text-xs font-bold uppercase tracking-wider text-brand block mb-1'>
                                {language === 'id'
                                    ? 'Paket Pilihan'
                                    : 'Selected Package'}
                            </span>
                            <h4 className='text-lg font-bold text-gray-800 mb-1'>
                                {bookingItem.name}
                            </h4>
                            <div className='flex justify-between items-center text-sm font-semibold text-gray-600'>
                                <span>
                                    {language === 'id'
                                        ? 'Mulai dari'
                                        : 'Price from'}
                                </span>
                                <span className='text-base font-bold text-brand'>
                                    Rp{' '}
                                    {bookingItem.price.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {/* Date Input */}
                        <div className='flex flex-col gap-2 mb-6'>
                            <label className='text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1'>
                                <Calendar className='h-3.5 w-3.5 text-brand' />{' '}
                                {language === 'id'
                                    ? 'Tanggal Perjalanan'
                                    : 'Trip Date'}
                            </label>
                            <input
                                type='date'
                                required
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                min={new Date().toISOString().split('T')[0]}
                                className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden cursor-pointer'
                            />
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col gap-2'>
                            <button
                                onClick={handleConfirmBooking}
                                disabled={!selectedDate}
                                className='w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/10 hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50'
                            >
                                {language === 'id'
                                    ? 'Pesan via WhatsApp'
                                    : 'Book via WhatsApp'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
