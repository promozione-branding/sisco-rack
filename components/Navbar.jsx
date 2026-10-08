"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { brand, links, categories } from "@/lib/data"
import LottieIcon from "./LottieIcon"
import SplitButton from "./SplitButton"
import InstallationServicesModal from "./InstallationServicesModal"
import QuoteModal from "./QuoteModal"
const linkBase = "flex items-center gap-2 rounded-pill px-4 py-2.5 font-semibold transition-[background,color] duration-200"
const linkOn = "bg-white/[0.16] text-white"
const linkOff = "text-white/85 hover:bg-white/[0.12] hover:text-white"
const WHATSAPP_NUMBER = "+917629827285"
const WHATSAPP_MSG = encodeURIComponent("Hi, I'd like to know more about your products.")
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

export default function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const [productquote, setProductquote] = useState(false)  
  const [quote, setQuote] = useState(false)
  const closeAll = () => {
    setOpen(false)
    setDrop(false)
  }
  const openQuote = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(false)
    setDrop(false)
    setQuote(true)
  }
const openProductQuote = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(false)
    setDrop(false)
    setProductquote(true)
  }

  return (
    <header className="sticky top-0 z-30 h-0 overflow-x-clip">
      <div className="relative mx-auto flex h-[92px] max-w-[1400px] items-center justify-between gap-6 rounded-b-[44px] bg-[#253970] pl-8 pr-6 text-white before:absolute before:-left-11 before:top-0 before:h-11 before:w-11 before:bg-[radial-gradient(circle_at_0_100%,transparent_43px,#253970_44px)] before:content-[''] after:absolute after:-right-11 after:top-0 after:h-11 after:w-11 after:bg-[radial-gradient(circle_at_100%_100%,transparent_43px,#253970_44px)] after:content-[''] max-[1180px]:mx-3 max-[1180px]:h-[76px] max-[1180px]:rounded-b-[32px] max-[1180px]:pl-5 max-[1180px]:pr-4 max-[1180px]:before:hidden max-[1180px]:after:hidden">
        <Link href="/" className="flex items-center gap-2 font-display text-[1.7rem] font-bold text-white" onClick={closeAll}>
          <img
            src="/sisco_logo_transparent.webp"
            alt="Logo"
            width={100}
          />
        </Link>
        <ul className={`flex list-none items-center gap-1 max-[1180px]:absolute max-[1180px]:left-0 max-[1180px]:right-0 max-[1180px]:top-[calc(100%+10px)] max-[1180px]:flex-col max-[1180px]:items-stretch max-[1180px]:gap-1 max-[1180px]:max-h-[calc(100svh-130px)] max-[1180px]:overflow-y-auto max-[1180px]:overscroll-contain max-[1180px]:rounded-[28px] max-[1180px]:bg-[#253970] max-[1180px]:p-3.5 ${open ? "max-[1180px]:flex" : "max-[1180px]:hidden"}`}>
          {links.map((l) =>
            l.href === "/products" ? (
              <li
                key={l.href}
                className="relative"
                onMouseEnter={() => setDrop(true)}
                onMouseLeave={() => setDrop(false)}
                onFocus={() => setDrop(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setDrop(false)
                }}
              >
                <Link href={l.href} className={`${linkBase} ${path === l.href ? linkOn : linkOff}`} onClick={closeAll}>
                  {l.label}
                  <svg className="max-[1180px]:hidden" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </Link>
                <AnimatePresence>
                  {drop && (
                    <motion.ul
                      className="absolute left-0 top-[calc(100%+16px)] min-w-[300px] list-none rounded-[22px] border-2 border-solid border-ink bg-panel p-2.5 max-[1180px]:hidden"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {categories.map((c) => (
                        <li key={c.id}>
                          {c.action === "quote" ? (
                           <button
  type="button"
  className="block w-full cursor-pointer appearance-none rounded-[14px] border-0 bg-transparent px-4 py-3 text-left text-[length:inherit] font-semibold leading-[inherit] text-ink [font-family:inherit] hover:bg-steel"
  onClick={openQuote}
>
  {c.name}
</button>
                          ) : (
                            <Link
  href={`/products?cat=${c.id}`}
  className="block rounded-[14px] px-4 py-3 font-semibold text-ink hover:bg-steel"
  onClick={closeAll}
>
  {c.name}
</Link>
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={l.href}>
                <Link href={l.href} className={`${linkBase} ${path === l.href ? linkOn : linkOff}`} onClick={closeAll}>{l.label}</Link>
              </li>
            )
          )}
          <li className="hidden max-[1180px]:block max-[1180px]:pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-pill bg-[#25D366] px-4 py-2.5 font-semibold text-white"
              onClick={closeAll}
            >
              Chat on WhatsApp
            </a>
          </li>
          <li className="hidden max-[1180px]:block max-[1180px]:pt-2 [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:rounded-pill [&>a]:px-4 [&>a]:py-2.5 [&>a]:text-white/85 [&>a]:transition-[background,color] [&>a]:duration-200 [&>a:hover]:bg-white/[0.12] [&>a:hover]:text-white">
            <div>
              <SplitButton  className="flash-btn" onClickCapture={openProductQuote}>Get a quote</SplitButton>
            </div>
          </li>
             <li className="hidden max-[1180px]:block max-[1180px]:pt-2 [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:rounded-pill [&>a]:px-4 [&>a]:py-2.5 [&>a]:text-white/85 [&>a]:transition-[background,color] [&>a]:duration-200 [&>a:hover]:bg-white/[0.12] [&>a:hover]:text-white">
            <div>
              <SplitButton  className="flash-btn" onClickCapture={openQuote}>Installation & Dismantling Services </SplitButton>
            </div>
          </li>
        </ul>
        <div className="flex items-center gap-[18px]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center gap-2 rounded-pill bg-[#25D366] px-4 py-2.5 font-semibold text-white transition-[filter] duration-200 hover:brightness-110 max-[1180px]:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.42-8.46z" />
            </svg>
            WhatsApp
          </a>
<div>
  <SplitButton className="flash-btn max-[1180px]:hidden" onClickCapture={openProductQuote}>Get a quote</SplitButton>
</div>
  <div className="max-[1180px]:hidden">
              <SplitButton  className="flash-btn" onClickCapture={openQuote} dark>Installation & Dismantling Services </SplitButton>
            </div>
          <button className="hidden min-h-[44px] rounded-pill border-2 border-solid border-white/50 bg-transparent px-4 py-2 font-semibold text-white [font-family:inherit] cursor-pointer max-[1180px]:block" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation menu">
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <InstallationServicesModal open={quote} onClose={() => setQuote(false)} />
<QuoteModal open={productquote} onClose={() => setProductquote(false)} />
    </header>
  )
}