import type { Metadata } from "next";
import dataJson from "@/lib/data.json";

// Map image URLs per destination ID from data.json (EN section)
const destinationMap: Record<string, { name: string; image: string; duration: string; price: number }> = {};
const enItems = dataJson.en.recommendations.items as Array<{
  id: string;
  name: string;
  image: string;
  duration: string;
  price: number;
}>;
enItems.forEach((item) => {
  destinationMap[item.id] = item;
});

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const dest = destinationMap[id];

  if (!dest) {
    return {
      title: "Destination | Mobatravelll",
      description: "Explore our amazing Pulau Seribu packages.",
    };
  }

  const formattedPrice = dest.price.toLocaleString("id-ID");
  const title = `${dest.name} - Paket Wisata Pulau Seribu | Mobatravelll`;
  const description = `${dest.duration} Mulai dari Rp ${formattedPrice}/pax. Speedboat PP Marina Ancol, penginapan premium, snorkeling & pemandu lokal. Pesan sekarang via WhatsApp!`;

  // Use a higher resolution version of the image for OG
  const ogImage = dest.image.replace("w=600", "w=1200");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mobatravelll.vercel.app/destinations/${id}`,
      siteName: "Mobatravelll",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${dest.name} - Mobatravelll`,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function DestinationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
