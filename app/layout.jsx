import { Barlow_Condensed, Public_Sans, Instrument_Serif } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingContact from "@/components/FloatingContact"
import TopBar from "@/components/TopBar"

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
    icon: "/favicon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${serif.variable}`}
    >
      <body className="bg-bg font-body leading-[1.6] text-ink overflow-x-hidden">
        <SmoothScroll>
  <TopBar/>
  <Navbar />
  <main className="relative z-[1]">{children}</main>
  <Footer />
  <FloatingContact />
</SmoothScroll>
      </body>
    </html>
  )
}