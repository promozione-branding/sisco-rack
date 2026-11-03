import { Barlow_Condensed, Public_Sans, Instrument_Serif } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingContact from "@/components/FloatingContact"
import TopBar from "@/components/TopBar"
import HideOnAdmin from "@/components/HideOnAdmin"
import Script from "next/script"
import HideOnInquiry from "@/landing components/HideonInqury"
import StickyContactBar from "@/landing components/StickyContactBar"
import InquiryPopup from "@/landing components/InquiryPopup"

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
})

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
})

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata = {
  title: "Storage Racks Manufacturer in India | Sisco Steel Products",
  description:
    "Sisco Steel Products is a storage rack manufacturer in India. Slotted angle, supermarket and heavy-duty racks, plus mezzanine floors. Get a quote.",
  openGraph: {
    type: "website",
    siteName: "Sisco Steel Products",
    locale: "en_IN",
    url: "https://siscosteelproducts.com/",
    title: "Storage Racks Manufacturer in India | Sisco Steel Products",
    description:
      "Sisco Steel Products is a storage racks manufacturer in India. Slotted angle, supermarket and heavy-duty racks, plus mezzanine floors. Get a quote.",
    images: [
      {
        url: "https://siscosteelproducts.com/hero_1400.webp",
        alt: "Storage racks and mezzanine floors manufactured by Sisco Steel Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Storage Racks Manufacturer in India | Sisco Steel Products",
    description:
      "Sisco Steel Products is a storage racks manufacturer in India. Slotted angle, supermarket and heavy-duty racks, plus mezzanine floors. Get a quote.",
    images: [
      {
        url: "https://siscosteelproducts.com/hero_1400.webp",
        alt: "Storage racks and mezzanine floors manufactured by Sisco Steel Products",
      },
    ],
  },

  icons: {
    icon: "/favicon_original.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${serif.variable}`}
    >
      
<head>
  {/* <link
    rel="preload"
    as="image"
    href="/hero_1400.webp"
    imageSrcSet="/hero_800_mob.webp 800w, /hero_1400.webp 1400w"
    imageSizes="100vw"
    fetchPriority="high"
  /> */}


  {/* Google Tag Manager */}
  <Script
    src="https://www.googletagmanager.com/gtm.js?id=GTM-TGHWB6HL"
    strategy="beforeInteractive"
  />

  <Script id="gtm-init" strategy="beforeInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
    `}
  </Script>

  {/* Google Ads */}
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=AW-18521489858"
    strategy="beforeInteractive"
  />

  <Script id="google-ads-init" strategy="beforeInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-18521489858');
    `}
  </Script>
</head>

      <body className="bg-bg font-body leading-[1.6] text-ink overflow-x-hidden">
  <SmoothScroll>
  <HideOnAdmin>
    <TopBar />
    <Navbar />
  </HideOnAdmin>

  <main className="relative z-[1] overflow-x-clip">{children}</main>

  <HideOnAdmin>
    <Footer />
    <HideOnInquiry>
      <FloatingContact />
    </HideOnInquiry>
    <StickyContactBar />
    <InquiryPopup />
  </HideOnAdmin>
</SmoothScroll>
      </body>
    </html>
  )
}