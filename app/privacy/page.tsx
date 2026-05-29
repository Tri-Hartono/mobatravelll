'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Eye, Lock, FileText, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function PrivacyPolicyPage() {
    const { language } = useLanguage();

    return (
        <div className='flex flex-col min-h-screen bg-[#fcfcfd] relative overflow-x-hidden'>
            {/* Branded Header navigation */}
            <Navbar />

            {/* Header Banner */}
            <div className='relative h-[260px] md:h-[320px] w-full overflow-hidden flex items-center justify-center text-center'>
                <img
                    src='https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1600'
                    alt='Privacy Policy'
                    className='absolute inset-0 h-full w-full object-cover object-center scale-[1.01]'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/45' />

                <div className="relative z-10 text-white px-4 pt-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md flex items-center justify-center gap-3">
                        <Shield className="h-8 w-8 md:h-12 md:w-12 text-brand" />
                        {language === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
                    </h1>
                    <p className="text-sm text-gray-200 mt-2 max-w-md mx-auto font-medium drop-shadow-xs">
                        {language === "id" 
                        ? "Terakhir diperbarui: 29 Mei 2026. Keamanan privasi informasi Anda adalah komitmen utama kami." 
                        : "Last updated: May 29, 2026. Securing your privacy is our primary commitment."}
                    </p>
                </div>
            </div>

            {/* Content Container */}
            <main className='flex-grow mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-16'>
                <div className='bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100/50 flex flex-col gap-10'>
                    
                    {/* Intro */}
                    <div className='border-b border-gray-100 pb-8'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                            <FileText className='h-6 w-6 text-brand' />
                            {language === 'id' ? 'Komitmen Privasi Mobatravelll' : 'Mobatravelll Privacy Commitment'}
                        </h2>
                        <p className='text-sm text-gray-500 leading-relaxed font-semibold'>
                            {language === 'id'
                                ? 'Selamat datang di Mobatravelll. Kami sangat menghargai kepercayaan Anda dan berkomitmen untuk melindungi informasi pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi yang Anda berikan saat memesan tiket speedboat atau paket resort Pulau Seribu melalui situs kami.'
                                : 'Welcome to Mobatravelll. We highly value your trust and are committed to protecting your personal information. This policy explains how we collect, use, and protect the personal data you provide when booking speedboat tickets or Thousand Islands resort packages through our website.'}
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div>
                        <h3 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                            <Eye className='h-5 w-5 text-brand' />
                            {language === 'id' ? '1. Informasi yang Kami Kumpulkan' : '1. Information We Collect'}
                        </h3>
                        <p className='text-sm text-gray-500 leading-relaxed font-semibold mb-3'>
                            {language === 'id'
                                ? 'Untuk memproses pemesanan liburan Anda secara instan dan efisien, kami dapat meminta informasi berikut:'
                                : 'To process your holiday booking instantly and efficiently, we may request the following information:'}
                        </p>
                        <ul className='list-none flex flex-col gap-2 pl-2'>
                            <li className='flex items-center gap-2 text-xs font-bold text-gray-600'>
                                <CheckCircle className='h-4 w-4 text-emerald-500 flex-shrink-0' />
                                {language === 'id' ? 'Nama lengkap sesuai kartu identitas (KTP / Passport)' : 'Full name according to identity card (KTP / Passport)'}
                            </li>
                            <li className='flex items-center gap-2 text-xs font-bold text-gray-600'>
                                <CheckCircle className='h-4 w-4 text-emerald-500 flex-shrink-0' />
                                {language === 'id' ? 'Alamat email aktif untuk pengiriman voucher tiket' : 'Active email address for ticket voucher delivery'}
                            </li>
                            <li className='flex items-center gap-2 text-xs font-bold text-gray-600'>
                                <CheckCircle className='h-4 w-4 text-emerald-500 flex-shrink-0' />
                                {language === 'id' ? 'Nomor telepon / WhatsApp untuk koordinasi penjemputan di Marina' : 'Telephone / WhatsApp number for Marina pickup coordination'}
                            </li>
                            <li className='flex items-center gap-2 text-xs font-bold text-gray-600'>
                                <CheckCircle className='h-4 w-4 text-emerald-500 flex-shrink-0' />
                                {language === 'id' ? 'Tanggal keberangkatan dan jumlah peserta trip' : 'Departure date and number of trip participants'}
                            </li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                            <Lock className='h-5 w-5 text-brand' />
                            {language === 'id' ? '2. Penggunaan Informasi Anda' : '2. How We Use Your Information'}
                        </h3>
                        <p className='text-sm text-gray-500 leading-relaxed font-semibold'>
                            {language === 'id'
                                ? 'Kami hanya menggunakan informasi pribadi Anda untuk keperluan operasional reservasi Anda, seperti menerbitkan tiket speedboat PP Marina Ancol, koordinasi dengan resort tujuan Anda di Pulau Seribu, mengirimkan konfirmasi reservasi via email/WhatsApp, serta mempermudah komunikasi darurat jika terjadi perubahan jadwal kapal akibat cuaca.'
                                : 'We only use your personal information for your operational reservation purposes, such as issuing Marina Ancol round trip speedboat tickets, coordinating with your destination resort in Thousand Islands, sending reservation confirmations via email/WhatsApp, and facilitating emergency communications in the event of vessel schedule changes due to weather.'}
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h3 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                            <Shield className='h-5 w-5 text-brand' />
                            {language === 'id' ? '3. Perlindungan Keamanan Data' : '3. Data Security Protection'}
                        </h3>
                        <p className='text-sm text-gray-500 leading-relaxed font-semibold'>
                            {language === 'id'
                                ? 'Seluruh database informasi pribadi tersimpan dengan teknologi enkripsi modern dan dilindungi oleh protokol keamanan SSL. Kami berkomitmen penuh untuk TIDAK PERNAH menjual, menyewakan, membagikan, atau menyebarluaskan informasi kontak Anda kepada pihak ketiga mana pun tanpa persetujuan tertulis Anda.'
                                : 'The entire personal database is stored using modern encryption technologies and is protected by SSL security protocols. We are fully committed to NEVER sell, rent, share, or disseminate your contact information to any third party without your prior written consent.'}
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h3 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                            <CheckCircle className='h-5 w-5 text-brand' />
                            {language === 'id' ? '4. Hak Pengguna' : '4. Your Legal Rights'}
                        </h3>
                        <p className='text-sm text-gray-500 leading-relaxed font-semibold'>
                            {language === 'id'
                                ? 'Anda memiliki hak penuh untuk meminta penghapusan database data diri Anda, memperbarui nomor WhatsApp yang terdaftar, atau membatalkan pengiriman email newsletter promo mingguan kami kapan saja dengan menghubungi Customer Service kami melalui halaman Hubungi Kami.'
                                : 'You have full rights to request the erasure of your personal data from our database, update your registered WhatsApp number, or unsubscribe from our weekly promo newsletters at any time by contacting our Customer Service through the Contact Us page.'}
                        </p>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
