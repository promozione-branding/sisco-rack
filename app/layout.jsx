import { Barlow_Condensed, Public_Sans, Instrument_Serif } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" })
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-serif" })
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body" })

export const metadata = {
  title: "Rackwell Steel | Industrial storage racks",
  description: "Pallet racks, slotted angle, boltless shelving, cantilever racks and mezzanine floors built to your floor plan."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}