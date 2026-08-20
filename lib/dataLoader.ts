import tripData from "./data.json";

export interface NavigationItem {
  name: string;
  href: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  bgImage: string;
  locations: string[];
  labels: {
    yourLocation: string;
    destination: string;
    checkIn: string;
    checkOut: string;
    guest: string;
    search: string;
    privacy: string;
  };
}

export interface PopularPackage {
  id: string;
  title: string;
  duration: string;
  image: string;
}

export interface PopularPackagesData {
  title: string;
  subtitle: string;
  exploreMore: string;
  clickDetail: string;
  items: PopularPackage[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesData {
  title: string;
  subtitle: string;
  readMore: string;
  items: FeatureItem[];
}

export interface PriceTier {
  participants: string;
  traditionalBoat?: number;
  speedBoat?: number;
  days2n1?: number;
  days3n2?: number;
}

export interface RoomTypeOption {
  name: string;
  pricePerPax?: number;
  weekdayPrice?: number;
  weekendPrice?: number;
  roomCount?: number;
  capacity?: string;
}

export interface RundownStep {
  time: string;
  activity: string;
}

export interface RecommendationItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  duration: string;
  price: number;
  image: string;
  category?: string;
  priceTiers?: {
    days2n1?: PriceTier[];
    days3n2?: PriceTier[];
    speedboatTiers?: PriceTier[];
  };
  roomTypes?: RoomTypeOption[];
  inclusions?: string[];
  exclusions?: string[];
  notes?: string[];
  rundown?: RundownStep[];
}

export interface RecommendationsData {
  title: string;
  subtitle: string;
  startFrom: string;
  bookNow: string;
  filterAll: string;
  items: RecommendationItem[];
}

export interface ArticleItem {
  id: string;
  title: string;
  location: string;
  image: string;
}

export interface ArticlesData {
  title: string;
  subtitle: string;
  readArticle: string;
  exploreMore: string;
  items: ArticleItem[];
}

export interface SubscribeData {
  title: string;
  subtitle: string;
  placeholder: string;
  button: string;
  subscribing: string;
  successAlert: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterData {
  intro: string;
  aboutTitle: string;
  featuresTitle: string;
  companyTitle: string;
  contactTitle: string;
  getApp: string;
  download: string;
  rights: string;
  privacy: string;
  terms: string;
  about: FooterLink[];
  features: FooterLink[];
  company: FooterLink[];
  contact: {
    email: string;
  };
}

export interface TripDataSchema {
  brandName: string;
  navigation: NavigationItem[];
  hero: HeroData;
  popularPackages: PopularPackagesData;
  features: FeaturesData;
  recommendations: RecommendationsData;
  articles: ArticlesData;
  subscribe: SubscribeData;
  footer: FooterData;
}

export function getTripData(lang: "id" | "en" = "en"): TripDataSchema {
  return (tripData[lang] || tripData["en"]) as TripDataSchema;
}
export type Language = "id" | "en";
export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: TripDataSchema;
};
