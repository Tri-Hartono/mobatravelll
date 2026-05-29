'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, MapPin, Calendar, Search, X, ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { RecommendationItem } from '@/lib/dataLoader';

export default function DestinationsPage() {
    const { language, data } = useLanguage();
    const recs = data.recommendations;

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('ALL');
    const [bookingItem, setBookingItem] = useState<RecommendationItem | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [guests, setGuests] = useState<number>(1);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const searchVal = params.get('search') || '';
            const filterVal = params.get('filter') || 'ALL';
            if (searchVal) setSearchQuery(searchVal);
            if (filterVal) setFilter(filterVal);
        }
    }, []);

    const locations = [
        'ALL',
        'Pulau Macan',
        'Pulau Pari',
        'Pulau Harapan',
        'Pulau Pramuka',
    ];

    // Filter based on search query & categories
    const filteredItems = recs.items.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            filter === 'ALL' ||
            item.name.toLowerCase().includes(filter.toLowerCase());
        return matchesSearch && matchesFilter;
    });

    const handleConfirmBooking = () => {
        if (!bookingItem || !selectedDate) return;

        const formattedPrice = bookingItem.price.toLocaleString('id-ID');
        const totalCost = bookingItem.price * guests;
        const formattedTotalCost = totalCost.toLocaleString('id-ID');
        const waNumber = '6281917285865';

        const message =
            language === 'id'
                ? `Halo Mobatravelll, saya ingin memesan paket *${bookingItem.name}* untuk keberangkatan tanggal *${selectedDate}* sejumlah *${guests} orang* dengan total harga *Rp ${formattedTotalCost}* (Rp ${formattedPrice} per pax). Mohon info ketersediaan slotnya ya!`
                : `Hello Mobatravelll, I would like to book the *${bookingItem.name}* package departing on *${selectedDate}* for *${guests} guests* with a total cost of *Rp ${formattedTotalCost}* (Rp ${formattedPrice} per pax). Please let me know the availability!`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
        setBookingItem(null);
        setSelectedDate('');
        setGuests(1);
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#fcfcfd] relative overflow-x-hidden'>
            {/* Navbar overlay */}
            <Navbar />

            {/* Decorative dots in background */}
            <div className='absolute top-[300px] left-[5%] w-3 h-3 rounded-full bg-brand/30 pointer-events-none' />
            <div className='absolute top-[600px] right-[8%] w-4 h-4 rounded-full bg-brand-hover/20 pointer-events-none' />
            <div className='absolute top-[1000px] left-[10%] w-3 h-3 rounded-full bg-purple-500/25 pointer-events-none' />

            {/* Header Banner Spacer with Beautiful Background Image */}
            <div className='relative h-[340px] md:h-[420px] w-full overflow-hidden flex items-center justify-center text-center'>
                <img
                    src='https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1600'
                    alt='Kepulauan Seribu'
                    className='absolute inset-0 h-full w-full object-cover object-center scale-[1.01]'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/45' />

                <div className="relative z-10 text-white px-4 pt-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                        {language === "id" ? "Semua Paket Destinasi" : "All Destination Packages"}
                    </h1>
                    <p className="text-sm text-gray-200 mt-2 max-w-md mx-auto font-medium drop-shadow-xs">
                        {language === "id" 
                        ? "Temukan paket liburan akhir pekan terbaik Anda di Kepulauan Seribu." 
                        : "Discover your perfect weekend gateway package in Thousand Islands."}
                    </p>
                </div>
            </div>

            <main className='flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12'>
                {/* Search & Filter Bar */}
                <div className='bg-white rounded-3xl p-6 shadow-xs border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between'>
                    {/* Search Input */}
                    <div className='relative w-full md:max-w-md'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400'>
                            <Search className='h-5 w-5' />
                        </div>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={
                                language === 'id'
                                    ? 'Cari nama pulau atau destinasi...'
                                    : 'Search island name...'
                            }
                            className='w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3.5 pl-12 pr-4 text-sm font-semibold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden transition-all shadow-xs'
                        />
                    </div>

                    {/* Location Category Filters */}
                    <div className='flex flex-wrap gap-2 justify-center'>
                        {locations.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => setFilter(loc)}
                                className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
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

                {/* Dynamic Grid Results */}
                {filteredItems.length > 0 ? (
                    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className='flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fadeIn'
                            >
                                {/* Image Container */}
                                <Link href={`/destinations/${item.id}`} className="block relative h-64 w-full overflow-hidden cursor-pointer">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                    />
                                    <div className='absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-xs'>
                                        <Star className='h-3.5 w-3.5 fill-amber-400 text-amber-400' />
                                        {item.rating.toFixed(2)}
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className='flex flex-1 flex-col p-6'>
                                    <Link href={`/destinations/${item.id}`} className="block cursor-pointer flex-1">
                                        <div className='flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-1'>
                                            <MapPin className='h-3.5 w-3.5 text-gray-400' />
                                            {item.location}
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900 group-hover:text-brand transition-colors mb-2'>
                                            {item.name}
                                        </h3>
                                        <p className='text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6'>
                                            {item.duration}
                                        </p>
                                    </Link>

                                    {/* Pricing and Whatsapp Booking */}
                                    <div className='mt-auto flex items-center justify-between pt-4 border-t border-gray-50'>
                                        <div>
                                            <span className='text-xs font-semibold text-gray-400 block'>
                                                {recs.startFrom}
                                            </span>
                                            <span className='text-xl font-extrabold text-gray-900'>
                                                Rp{' '}
                                                {item.price.toLocaleString(
                                                    'id-ID',
                                                )}
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
                ) : (
                    <div className='text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-xs'>
                        <p className='text-lg font-bold text-gray-500'>
                            {language === 'id'
                                ? 'Tidak ada paket yang sesuai pencarian Anda.'
                                : 'No packages found matching your criteria.'}
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setFilter('ALL');
                            }}
                            className='mt-4 rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-hover cursor-pointer'
                        >
                            {language === 'id'
                                ? 'Reset Filter'
                                : 'Reset Filters'}
                        </button>
                    </div>
                )}
            </main>

            {/* Date Booking Modal */}
            {bookingItem && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs'>
                    <div className='relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100'>
                        <button
                            onClick={() => {
                                setBookingItem(null);
                                setSelectedDate('');
                            }}
                            className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
                        >
                            <X className='h-5 w-5' />
                        </button>

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

                        <div className='flex flex-col gap-2 mb-4'>
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

                        {/* Guest Selector Dropdown */}
                        <div className='flex flex-col gap-2 mb-6'>
                            <label className='text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1'>
                                <Users className='h-3.5 w-3.5 text-brand' />{' '}
                                {language === 'id'
                                    ? 'Jumlah Tamu'
                                    : 'Number of Guests'}
                            </label>
                            <div className='relative'>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    className='w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-3 pr-10 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden appearance-none cursor-pointer'
                                >
                                    {[...Array(20)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1} {language === 'id' ? 'Orang' : 'Guests'}
                                        </option>
                                    ))}
                                </select>
                                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                                    <svg className='h-4 w-4 fill-none stroke-current' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Total Price Box */}
                        <div className='border-t border-gray-100 pt-4 mb-6 flex justify-between items-center'>
                            <span className='text-xs font-bold text-gray-500'>
                                {language === 'id' ? 'Total Harga' : 'Total Price'}
                            </span>
                            <span className='text-2xl font-extrabold text-brand'>
                                Rp {(bookingItem.price * guests).toLocaleString('id-ID')}
                            </span>
                        </div>

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

            {/* Footer */}
            <Footer />
        </div>
    );
}
