'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactPage() {
    const { language } = useLanguage();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const waNumber = '6281916028221';
        const formattedMessage = language === 'id'
            ? `Halo Mobatravelll!\n\nNama: *${name}*\nEmail: *${email}*\nNo. WhatsApp: *${phone}*\n\nPesan:\n_${message}_`
            : `Hello Mobatravelll!\n\nName: *${name}*\nEmail: *${email}*\nWhatsApp No: *${phone}*\n\nMessage:\n_${message}_`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(formattedMessage)}`;
        
        setSubmitted(true);
        window.open(waUrl, '_blank');

        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#fcfcfd] relative overflow-x-hidden'>
            {/* Branded Header navigation */}
            <Navbar />

            {/* Background design elements */}
            <div className='absolute top-[250px] left-[4%] w-3 h-3 rounded-full bg-brand/20 pointer-events-none' />
            <div className='absolute top-[500px] right-[6%] w-4 h-4 rounded-full bg-brand-hover/15 pointer-events-none' />

            {/* Premium Header Banner with Image background */}
            <div className='relative h-[300px] md:h-[380px] w-full overflow-hidden flex items-center justify-center text-center'>
                <img
                    src='https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600'
                    alt='Contact Mobatravelll'
                    className='absolute inset-0 h-full w-full object-cover object-center scale-[1.01]'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/45' />

                <div className="relative z-10 text-white px-4 pt-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                        {language === "id" ? "Hubungi Kami" : "Contact Us"}
                    </h1>
                    <p className="text-sm text-gray-200 mt-2 max-w-md mx-auto font-medium drop-shadow-xs">
                        {language === "id" 
                        ? "Ada pertanyaan mengenai paket wisata Pulau Seribu? Tim support kami siap melayani Anda 24/7." 
                        : "Have any questions about Thousand Islands tour packages? Our support team is ready to serve you 24/7."}
                    </p>
                </div>
            </div>

            {/* Main Interactive Contact Panel */}
            <main className='flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
                    
                    {/* Left side: Branded Info card */}
                    <div className='lg:col-span-5 flex flex-col gap-8'>
                        <div className='bg-white rounded-3xl p-8 shadow-xs border border-gray-100/50'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                                {language === 'id' ? 'Informasi Kontak' : 'Contact Information'}
                            </h2>

                            <div className='flex flex-col gap-6'>
                                {/* Phone Number */}
                                <div className='flex gap-4 items-start'>
                                    <div className='flex-shrink-0 h-10 w-10 rounded-full bg-brand-light flex items-center justify-center text-brand shadow-xs'>
                                        <Phone className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <span className='text-xs font-bold text-gray-400 block uppercase tracking-wider'>WhatsApp</span>
                                        <span className='text-base font-bold text-gray-800 block mt-0.5'>+62 819-1602-8221</span>
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className='flex gap-4 items-start'>
                                    <div className='flex-shrink-0 h-10 w-10 rounded-full bg-brand-light flex items-center justify-center text-brand shadow-xs'>
                                        <Mail className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <span className='text-xs font-bold text-gray-400 block uppercase tracking-wider'>Email</span>
                                        <span className='text-base font-bold text-gray-800 block mt-0.5'>support@mobatravelll.com</span>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className='flex gap-4 items-start'>
                                    <div className='flex-shrink-0 h-10 w-10 rounded-full bg-brand-light flex items-center justify-center text-brand shadow-xs'>
                                        <Clock className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <span className='text-xs font-bold text-gray-400 block uppercase tracking-wider'>
                                            {language === 'id' ? 'Jam Operasional' : 'Working Hours'}
                                        </span>
                                        <span className='text-base font-bold text-gray-800 block mt-0.5'>
                                            {language === 'id' ? 'Senin - Minggu: 24 Jam' : 'Monday - Sunday: 24 Hours'}
                                        </span>
                                    </div>
                                </div>

                                {/* Head Office */}
                                <div className='flex gap-4 items-start'>
                                    <div className='flex-shrink-0 h-10 w-10 rounded-full bg-brand-light flex items-center justify-center text-brand shadow-xs'>
                                        <MapPin className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <span className='text-xs font-bold text-gray-400 block uppercase tracking-wider'>
                                            {language === 'id' ? 'Kantor Utama' : 'Head Office'}
                                        </span>
                                        <span className='text-base font-bold text-gray-800 block mt-0.5 leading-relaxed'>
                                            Marina Ancol Dermaga 16, Pademangan, Jakarta Utara, DKI Jakarta, Indonesia
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Note */}
                        <div className='rounded-3xl bg-brand/5 border border-brand/10 p-6 flex items-start gap-4'>
                            <MessageSquare className='h-6 w-6 text-brand flex-shrink-0 mt-0.5' />
                            <div>
                                <h4 className='text-sm font-bold text-brand mb-1'>
                                    {language === 'id' ? 'Direct Respon WhatsApp' : 'Direct WhatsApp Response'}
                                </h4>
                                <p className='text-xs text-gray-500 font-semibold leading-relaxed'>
                                    {language === 'id'
                                        ? 'Formulir kontak ini terhubung langsung ke WhatsApp bisnis kami. Pesan Anda akan langsung dibalas oleh Customer Service kami dalam waktu kurang dari 5 menit!'
                                        : 'This contact form links directly to our business WhatsApp. Your message will be replied to by our Customer Service in less than 5 minutes!'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Contact Inquiry Form */}
                    <div className='lg:col-span-7 bg-white rounded-3xl p-8 shadow-xl border border-gray-100'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                            {language === 'id' ? 'Kirim Pesan Langsung' : 'Send a Direct Message'}
                        </h2>

                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            {/* Full Name */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-xs font-bold uppercase tracking-wider text-gray-400'>
                                    {language === 'id' ? 'Nama Lengkap' : 'Full Name'}
                                </label>
                                <input
                                    type='text'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={language === 'id' ? 'Masukkan nama lengkap Anda' : 'Enter your full name'}
                                    className='w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden transition-all'
                                />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {/* Email Address */}
                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-bold uppercase tracking-wider text-gray-400'>
                                        {language === 'id' ? 'Alamat Email' : 'Email Address'}
                                    </label>
                                    <input
                                        type='email'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='name@example.com'
                                        className='w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden transition-all'
                                    />
                                </div>

                                {/* Phone number */}
                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-bold uppercase tracking-wider text-gray-400'>
                                        {language === 'id' ? 'Nomor WhatsApp' : 'WhatsApp Number'}
                                    </label>
                                    <input
                                        type='tel'
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder='e.g. 08123456789'
                                        className='w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden transition-all'
                                    />
                                </div>
                            </div>

                            {/* Inquiry Message */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-xs font-bold uppercase tracking-wider text-gray-400'>
                                    {language === 'id' ? 'Pesan / Pertanyaan' : 'Message / Inquiry'}
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={language === 'id' ? 'Tuliskan pesan atau pertanyaan Anda mengenai paket kami...' : 'Write your message or inquiry about our packages...'}
                                    className='w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-bold text-gray-800 focus:border-brand focus:bg-white focus:outline-hidden transition-all resize-none'
                                />
                            </div>

                            {/* Success Notification */}
                            {submitted && (
                                <div className='flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-emerald-800 animate-fadeIn'>
                                    <CheckCircle2 className='h-5 w-5 text-emerald-500 flex-shrink-0' />
                                    <span className='text-xs font-bold'>
                                        {language === 'id' 
                                        ? 'Pesan berhasil diformat! Sedang mengalihkan Anda ke WhatsApp kami...'
                                        : 'Message formatted successfully! Redirecting you to our WhatsApp...'}
                                    </span>
                                </div>
                            )}

                            {/* Submit CTA Button */}
                            <button
                                type='submit'
                                className='mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand/10 hover:bg-brand-hover hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer'
                            >
                                <Send className='h-4 w-4' />
                                {language === 'id' ? 'Kirim via WhatsApp' : 'Send via WhatsApp'}
                            </button>
                        </form>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
