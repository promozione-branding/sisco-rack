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

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
	{
  	"@type": ["Organization", "LocalBusiness"],
  	"@id": "https://siscosteelproducts.com/#organization",
  	"name": "Sisco Steel Products",
  	"alternateName": "Sisco Steel",
  	"url": "https://siscosteelproducts.com/",
  	"logo": {
    	"@type": "ImageObject",
    	"@id": "https://siscosteelproducts.com/#logo",
    	"url": "https://siscosteelproducts.com/sisco_logo_transparent.webp",
    	"contentUrl": "https://siscosteelproducts.com/sisco_logo_transparent.webp",
    	"caption": "Sisco Steel Products"
  	},
  	"image": "https://siscosteelproducts.com/hero_1400.webp",
  	"description": "Sisco Steel Products is a storage racks manufacturer in India, offering slotted angle racks, supermarket racks, heavy-duty racks and mezzanine floors, along with installation and dismantling services.",
  	"foundingDate": "2015",
  	"telephone": "+91-7629827285",
  	"email": "info.siscosteel@gmail.com",
  	"address": {
    	"@type": "PostalAddress",
    	"streetAddress": "Gali No-1, 41-B, Bhagat Vihar, Karawal Nagar",
    	"addressLocality": "New Delhi",
    	"addressRegion": "Delhi",
    	"postalCode": "110094",
    	"addressCountry": "IN"
  	},
  	"areaServed": {
    	"@type": "Country",
    	"name": "India"
  	},
  	"openingHoursSpecification": {
    	"@type": "OpeningHoursSpecification",
    	"dayOfWeek": [
      	"Monday",
      	"Tuesday",
      	"Wednesday",
      	"Thursday",
      	"Friday",
      	"Saturday"
    	],
    	"opens": "08:00",
    	"closes": "18:00"
  	},
  	"contactPoint": [
    	{
      	"@type": "ContactPoint",
      	"telephone": "+91-7629827285",
      	"contactType": "sales",
      	"email": "info.siscosteel@gmail.com",
      	"areaServed": "IN",
      	"availableLanguage": ["English", "Hindi"]
    	}
  	],
  	"knowsAbout": [
    	"Slotted Angle Racks",
    	"Supermarket Racks",
    	"Heavy Duty Racks",
    	"Mezzanine Floors",
    	"Storage racks",
    	"Racking installation"
  	],
  	"hasOfferCatalog": {
    	"@type": "OfferCatalog",
    	"name": "Steel Storage Solutions",
    	"itemListElement": [
      	{
        	"@type": "OfferCatalog",
        	"name": "Slotted Angle Racks",
        	"url": "https://siscosteelproducts.com/products/slotted-angle-racks"
      	},
      	{
        	"@type": "OfferCatalog",
        	"name": "Mezzanine Floors",
        	"url": "https://siscosteelproducts.com/products/mezzanine-floors-racks"
      	},
      	{
        	"@type": "OfferCatalog",
        	"name": "Supermarket Racks",
        	"url": "https://siscosteelproducts.com/products/supermarket-racks"
      	},
      	{
        	"@type": "OfferCatalog",
        	"name": "Heavy Duty Racks",
        	"url": "https://siscosteelproducts.com/products/heavy-duty-racks"
      	}
    	]
  	},
  	"sameAs": [
        "https://youtube.com/@siscosteelproducts",
        "https://www.instagram.com/siscosteelproducts",
        "https://www.facebook.com/share/1MSMWsYpor/"
  	]
	},
	{
  	"@type": "WebSite",
  	"@id": "https://siscosteelproducts.com/#website",
  	"url": "https://siscosteelproducts.com/",
  	"name": "Sisco Steel Products",
  	"inLanguage": "en-IN",
  	"publisher": {
    	"@id": "https://siscosteelproducts.com/#organization"
  	}
	},
	{
  	"@type": "WebPage",
  	"@id": "https://siscosteelproducts.com/#webpage",
  	"url": "https://siscosteelproducts.com/",
  	"name": "Storage Racks Manufacturer in India | Sisco Steel Products",
  	"description": "Sisco Steel is a trusted Slotted Angle Rack Manufacturer offering durable storage racks, supermarket racks, mobile compactors, cable trays and mezzanine floors.",
  	"inLanguage": "en-IN",
  	"isPartOf": {
    	"@id": "https://siscosteelproducts.com/#website"
  	},
  	"about": {
    	"@id": "https://siscosteelproducts.com/#organization"
  	},
  	"primaryImageOfPage": {
    	"@type": "ImageObject",
    	"url": "https://siscosteelproducts.com/hero_1400.webp"
  	},
  	"breadcrumb": {
    	"@id": "https://siscosteelproducts.com/#breadcrumb"
  	}
	},
	{
  	"@type": "BreadcrumbList",
  	"@id": "https://siscosteelproducts.com/#breadcrumb",
  	"itemListElement": [
    	{
      	"@type": "ListItem",
      	"position": 1,
      	"name": "Home",
      	"item": "https://siscosteelproducts.com/"
    	}
  	]
	},
	{
  	"@type": "SiteNavigationElement",
  	"@id": "https://siscosteelproducts.com/#navigation",
  	"name": ["Home", "Products", "About", "Contact", "Blogs"],
  	"url": [
        "https://siscosteelproducts.com/",
        "https://siscosteelproducts.com/products",
        "https://siscosteelproducts.com/about",
        "https://siscosteelproducts.com/contact",
        "https://siscosteelproducts.com/blogs"
  	]
	},
	{
  	"@type": "ItemList",
  	"@id": "https://siscosteelproducts.com/#best-sellers",
  	"name": "Our Best Sellers",
  	"itemListElement": [
    	{
      	"@type": "ListItem",
      	"position": 1,
      	"name": "Industrial Store Rack",
      	"url": "https://siscosteelproducts.com/products/industrial-store-rack"
    	},
    	{
      	"@type": "ListItem",
      	"position": 2,
      	"name": "Catwalk Storage System",
      	"url": "https://siscosteelproducts.com/products/catwalk-storage-system"
    	},
    	{
      	"@type": "ListItem",
      	"position": 3,
      	"name": "End Display Rack",
      	"url": "https://siscosteelproducts.com/products/end-display-rack"
    	},
    	{
      	"@type": "ListItem",
      	"position": 4,
      	"name": "Industrial Heavy-Duty Rack",
      	"url": "https://siscosteelproducts.com/products/industrial-heavy-duty-rack"
    	},
    	{
      	"@type": "ListItem",
      	"position": 5,
      	"name": "Multi Duty Rack",
      	"url": "https://siscosteelproducts.com/products/multi-duty-rack"
    	},
    	{
      	"@type": "ListItem",
      	"position": 6,
      	"name": "Industrial Storage Mezzanine Floor",
      	"url": "https://siscosteelproducts.com/products/industrial-storage-mezzanine-floor"
    	},
    	{
      	"@type": "ListItem",
      	"position": 7,
      	"name": "Store Display Racks",
      	"url": "https://siscosteelproducts.com/products/store-display-racks"
    	},
    	{
      	"@type": "ListItem",
      	"position": 8,
      	"name": "Heavy Duty Warehouse Rack",
      	"url": "https://siscosteelproducts.com/products/heavy-duty-warehouse-rack"
    	}
  	]
	},
	{
  	"@type": "Service",
  	"@id": "https://siscosteelproducts.com/#installation-service",
  	"name": "Installation and Dismantling Services",
  	"serviceType": "Racking installation and dismantling",
  	"description": "Design, fabrication, installation and inspection of storage racks, with dismantling services for existing racking.",
  	"provider": {
    	"@id": "https://siscosteelproducts.com/#organization"
  	},
  	"areaServed": {
    	"@type": "Country",
    	"name": "India"
  	},
  	"url": "https://siscosteelproducts.com/products"
	},
	{
  	"@type": "FAQPage",
  	"@id": "https://siscosteelproducts.com/#faq",
  	"mainEntity": [
    	{
      	"@type": "Question",
      	"name": "What is the price of a Slotted Angle Rack?",
      	"acceptedAnswer": {
        	"@type": "Answer",
        	"text": "The Slotted Angle Rack price depends on the size, material, number of shelves, load capacity, and quantity required. Contact Sisco Steel Products for a suitable quotation."
      	}
    	}
  	]
	}
  ]
}

export const metadata = {
  title: "Storage Racks Manufacturer in India | Sisco Steel Products",
  description:"Sisco Steel Products is a storage rack manufacturer in India. Slotted angle, supermarket and heavy-duty racks, plus mezzanine floors. Get a quote.",
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
        <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c"),
    }}
  />
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