"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import QuoteModal from "@/components/QuoteModal"

const DELAY_MS = 5000 

export default function InquiryPopup() {
  const path = usePathname()
  const [quote, setQuote] = useState(false)

  useEffect(() => {
    if (path !== "/inquiry") return
    const t = setTimeout(() => setQuote(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [path])

  if (path !== "/inquiry") return null

  return <QuoteModal open={quote} onClose={() => setQuote(false)} />
}