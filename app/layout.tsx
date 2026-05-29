import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import ShareButton from '@/components/ShareButton';

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
    title: 'Mobatravelll - Paket Wisata Pulau Seribu Terpercaya',
    description:
        'Nikmati liburan akhir pekan terbaik Anda di Kepulauan Seribu bersama Mobatravelll. Akomodasi premium, speedboat berlisensi, & pemandu lokal berpengalaman.',
    openGraph: {
        title: 'Mobatravelll - Paket Wisata Pulau Seribu Terpercaya',
        description: 'Liburan seru ke Pulau Seribu? Rencanakan trip Anda bersama Mobatravelll. Dapatkan konfirmasi instan paket resort & speedboat PP Marina Ancol sekarang!',
        url: 'https://mobatravelll.com',
        siteName: 'Mobatravelll',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200',
                width: 1200,
                height: 630,
                alt: 'Mobatravelll Pulau Seribu Trip Preview',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mobatravelll - Paket Wisata Pulau Seribu Terpercaya',
        description: 'Liburan seru ke Pulau Seribu? Rencanakan trip Anda bersama Mobatravelll. Dapatkan konfirmasi instan paket resort & speedboat PP Marina Ancol sekarang!',
        images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={`${outfit.variable} h-full antialiased`}>
            <body className='min-h-full flex flex-col font-sans bg-[#fcfcfd]'>
                <LanguageProvider>
                    {children}
                    <ShareButton />
                </LanguageProvider>
            </body>
        </html>
    );
}
