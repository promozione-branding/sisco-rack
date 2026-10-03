"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { brand, links, categories } from "@/lib/data"
import LottieIcon from "./LottieIcon"
import SplitButton from "./SplitButton"

const linkBase = "flex items-center gap-2 rounded-pill px-4 py-2.5 font-semibold transition-[background,color] duration-200"
const linkOn = "bg-white/[0.16] text-white"
const linkOff = "text-white/85 hover:bg-white/[0.12] hover:text-white"

export default function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)

  const closeAll = () => {
    setOpen(false)
    setDrop(false)
  }

  return (
    <header className="sticky top-0 z-30 h-0">
      <div className="relative mx-auto flex h-[92px] max-w-[1100px] items-center justify-between gap-6 rounded-b-[44px] bg-[#253970] pl-8 pr-6 text-white before:absolute before:-left-11 before:top-0 before:h-11 before:w-11 before:bg-[radial-gradient(circle_at_0_100%,transparent_43px,#253970_44px)] before:content-[''] after:absolute after:-right-11 after:top-0 after:h-11 after:w-11 after:bg-[radial-gradient(circle_at_100%_100%,transparent_43px,#253970_44px)] after:content-[''] max-[960px]:mx-3 max-[960px]:h-[76px] max-[960px]:rounded-b-[32px] max-[960px]:pl-5 max-[960px]:pr-4 max-[960px]:before:hidden max-[960px]:after:hidden">
<Link href="/" className="flex items-center gap-2 font-display text-[1.7rem] font-bold text-white" onClick={closeAll}>
  <img
    src="https://static.wixstatic.com/media/70a687_e0785cfd276744b6b939427b963b2746~mv2.png/v1/fill/w_810,h_224,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.png"
    alt="Logo"
    width={100}
  />
</Link>
        <ul className={`flex list-none items-center gap-1 max-[960px]:absolute max-[960px]:left-0 max-[960px]:right-0 max-[960px]:top-[calc(100%+10px)] max-[960px]:flex-col max-[960px]:items-stretch max-[960px]:gap-1 max-[960px]:rounded-[28px] max-[960px]:bg-[#253970] max-[960px]:p-3.5 ${open ? "max-[960px]:flex" : "max-[960px]:hidden"}`}>
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
                  <svg className="max-[960px]:hidden" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </Link>
                <AnimatePresence>
                  {drop && (
                    <motion.ul
                      className="absolute left-0 top-[calc(100%+16px)] min-w-[300px] list-none rounded-[22px] border-2 border-solid border-ink bg-panel p-2.5 max-[960px]:hidden"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {categories.map((c) => (
                        <li key={c.id}>
                          <Link href="/products" className="block rounded-[14px] px-4 py-3 font-semibold text-ink hover:bg-steel" onClick={closeAll}>{c.name}</Link>
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
          <li className="hidden max-[960px]:block max-[960px]:pt-2 [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:rounded-pill [&>a]:px-4 [&>a]:py-2.5 [&>a]:text-white/85 [&>a]:transition-[background,color] [&>a]:duration-200 [&>a:hover]:bg-white/[0.12] [&>a:hover]:text-white">
            <SplitButton href="/contact">Get a quote</SplitButton>
          </li>
        </ul>
        <div className="flex items-center gap-[18px]">
          <a href="tel:+15550142290" className="font-semibold text-white/85 hover:text-safety max-[960px]:hidden">Call sales</a>
          <div className="max-[960px]:hidden">
            <SplitButton href="/contact">Get a quote</SplitButton>
          </div>
          <button className="hidden rounded-pill border-2 border-solid border-white/50 bg-transparent px-4 py-2 font-semibold text-white [font-family:inherit] cursor-pointer max-[960px]:block" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  )
}