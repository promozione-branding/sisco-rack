"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import QuoteModal from "@/components/QuoteModal"
import { handleWhatsappClick } from "@/lib/tracking"

const WHATSAPP_NUMBER = "+917629827285"
const PHONE_NUMBER = "+917629827285" // TODO: replace with your calling number if different
const WHATSAPP_MSG = encodeURIComponent("Hi, I'd like to know more about your products.")
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const btn =
  "flex min-h-[48px] items-center justify-center gap-2 rounded-pill px-3 py-2 text-[12px] font-bold [font-family:inherit] cursor-pointer border-0 no-underline"

export default function StickyContactBar() {
  const path = usePathname()
  const [quote, setQuote] = useState(false)

  if (path !== "/inquiry") return null

  return (
    <>
      <div aria-hidden="true" className="h-[72px] min-[768px]:hidden" />

      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t-2 border-solid border-ink bg-white px-2.5 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] min-[768px]:hidden"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} bg-[#25D366] text-white`}
          onClick={() => handleWhatsappClick({ source: "Inquiry Sticky Bar" })}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.42-8.46z" />
          </svg>
          WhatsApp
        </a>

        <a href={`tel:${PHONE_NUMBER}`} className={`${btn} bg-[#253970] text-white`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
          </svg>
          Call
        </a>

        <button type="button" className={`${btn} bg-safety text-ink`} onClick={() => setQuote(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M8 13h8" />
            <path d="M8 17h8" />
          </svg>
          Get a Quote
        </button>
      </nav>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </>
  )
}