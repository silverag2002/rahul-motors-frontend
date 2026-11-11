import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SHOP } from "@/lib/shop";

const head = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-head",
  axes: ["opsz"],
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Car electrical and engine parts in Mullick Bazar, Kolkata: power window switches, fuel pumps, ignition coils, radiator fans, sensors and wiper parts for Hyundai, Maruti, Mahindra, Honda, Tata and more. Ask on WhatsApp, sent across India.";

export const metadata: Metadata = {
  metadataBase: new URL(SHOP.siteUrl),
  title: {
    default: "Rahul Motors | Car Electrical & Engine Parts, Mullick Bazar, Kolkata",
    template: "%s · Rahul Motors",
  },
  description,
  keywords: [
    "Rahul Motors",
    "Mullick Bazar car parts",
    "car spare parts Kolkata",
    "power window switch",
    "fuel pump assembly",
    "ignition coil",
    "radiator fan",
    "oxygen sensor",
    "car parts delivery India",
  ],
  openGraph: {
    title: "Rahul Motors: car electrical and engine parts, Mullick Bazar, Kolkata",
    description,
    url: SHOP.siteUrl,
    siteName: SHOP.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f4f1",
};

// Light unless the visitor picked dark with the toggle; set before anything paints.
const themeBoot = `try{var t=localStorage.getItem('rm-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light')}catch(e){document.documentElement.setAttribute('data-theme','light')}`;

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": `${SHOP.siteUrl}/#shop`,
  name: SHOP.name,
  url: SHOP.siteUrl,
  image: `${SHOP.siteUrl}/og.jpg`,
  logo: `${SHOP.siteUrl}/icon.png`,
  telephone: SHOP.phones[0].tel,
  email: SHOP.email,
  description,
  areaServed: [
    { "@type": "City", name: "Kolkata" },
    { "@type": "Country", name: "India" },
  ],
  hasMap: SHOP.mapsLink,
  geo: { "@type": "GeoCoordinates", latitude: SHOP.geo.lat, longitude: SHOP.geo.lng },
  address: {
    "@type": "PostalAddress",
    streetAddress: SHOP.address.street,
    addressLocality: SHOP.address.city,
    addressRegion: SHOP.address.region,
    postalCode: SHOP.address.postcode,
    addressCountry: "IN",
  },
  contactPoint: SHOP.phones.map((p) => ({ "@type": "ContactPoint", telephone: p.tel, contactType: p.label.toLowerCase(), areaServed: "IN" })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${head.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
