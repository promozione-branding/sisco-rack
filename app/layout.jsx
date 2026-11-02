import { Barlow_Condensed, Public_Sans, Instrument_Serif } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingContact from "@/components/FloatingContact"
import TopBar from "@/components/TopBar"
import HideOnAdmin from "@/components/HideOnAdmin"

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
  title: "Sisco Steel | Industrial storage racks",
  description:
    "Pallet racks, slotted angle, boltless shelving, cantilever racks and mezzanine floors built to your floor plan.",

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
  <link
    rel="preload"
    as="image"
    href="/hero_1400.webp"
    imageSrcSet="/hero_800_mob.webp 800w, /hero_1400.webp 1400w"
    imageSizes="100vw"
    fetchPriority="high"
  />

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
    <FloatingContact />
  </HideOnAdmin>
</SmoothScroll>
      </body>
    </html>
  )
}