'use client';

import { useState, useEffect } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ShareButton() {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, [isOpen]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link', err);
        }
    };

    const shareWhatsApp = () => {
        const text = language === 'id'
            ? `Yuk lihat paket liburan Pulau Seribu terbaik dari Mobatravelll ini: ${currentUrl}`
            : `Check out this amazing Thousand Islands holiday package from Mobatravelll: ${currentUrl}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    };

    return (
        <>
            {/* Floating Share Button */}
            <div className="fixed bottom-6 left-6 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/25 hover:bg-brand-hover hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    aria-label="Share page"
                >
                    <Share2 className="h-5 w-5" />
                </button>
            </div>

            {/* Premium Share Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-gray-100/50">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Share2 className="h-5 w-5 text-brand" />
                            {language === 'id' ? 'Bagikan Halaman Ini' : 'Share This Page'}
                        </h3>
                        <p className="text-xs text-gray-500 mb-6 font-semibold">
                            {language === 'id'
                                ? 'Bagikan keseruan rencana liburan Pulau Seribu Anda bersama teman dan keluarga!'
                                : 'Share the excitement of your Thousand Islands holiday plans with friends and family!'}
                        </p>

                        {/* Copy Link Row */}
                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                readOnly
                                value={currentUrl}
                                className="flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-xs font-bold text-gray-500 overflow-ellipsis"
                            />
                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center justify-center gap-1 rounded-xl bg-brand-light px-4 text-xs font-bold text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5" />
                                        {language === 'id' ? 'Tersalin' : 'Copied'}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        {language === 'id' ? 'Salin' : 'Copy'}
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Social Buttons Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={shareWhatsApp}
                                className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 text-sm font-bold shadow-md shadow-[#25d366]/15 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.883-6.963C16.59 1.93 14.116.907 11.487.907c-5.441 0-9.866 4.42-9.87 9.852-.001 1.748.47 3.453 1.365 4.962l-.993 3.623 3.717-.974-.052-.086zm11.758-6.85c-.328-.163-1.935-.953-2.235-1.062-.298-.11-.516-.163-.734.163-.217.327-.84.163-1.03.327-.19.164-.38.164-.707.001-.328-.163-1.383-.509-2.635-1.627-.975-.87-1.633-1.946-1.824-2.273-.192-.328-.021-.505.143-.668.147-.146.328-.382.492-.573.164-.191.218-.328.328-.546.11-.218.055-.409-.028-.573-.082-.164-.734-1.767-1.006-2.421-.264-.637-.532-.55-.734-.56l-.63-.008c-.218 0-.573.082-.873.409-.3.327-1.144 1.118-1.144 2.727 0 1.61 1.173 3.164 1.336 3.382.164.218 2.308 3.525 5.59 4.951.78.339 1.39.541 1.865.692.784.249 1.497.214 2.061.129.629-.094 1.935-.79 2.207-1.527.273-.737.273-1.366.191-1.529-.08-.162-.298-.271-.628-.434z"/>
                                </svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={shareFacebook}
                                className="flex items-center justify-center gap-2 rounded-2xl bg-[#1877F2] hover:bg-[#166fe3] text-white py-3 text-sm font-bold shadow-md shadow-[#1877f2]/15 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
