"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { brand, links, categories } from "@/lib/data"
import LottieIcon from "./LottieIcon"
import SplitButton from "./SplitButton"

export default function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)

  const closeAll = () => {
    setOpen(false)
    setDrop(false)
  }

  return (
    <header className="nav">
      <div className="nav-bar">
        <Link href="/" className="logo" onClick={closeAll}>
          <LottieIcon className="logo-mark" colors={["#FFFFFF", "#E8A317"]} />
          {brand}
        </Link>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) =>
            l.href === "/products" ? (
              <li
                key={l.href}
                className="drop"
                onMouseEnter={() => setDrop(true)}
                onMouseLeave={() => setDrop(false)}
                onFocus={() => setDrop(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setDrop(false)
                }}
              >
                <Link href={l.href} className={path === l.href ? "on" : ""} onClick={closeAll}>
                  {l.label}
                  <svg className="chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </Link>
                <AnimatePresence>
                  {drop && (
                    <motion.ul
                      className="drop-menu"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {categories.map((c) => (
                        <li key={c.id}>
                          <Link href="/products" onClick={closeAll}>{c.name}</Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={l.href}>
                <Link href={l.href} className={path === l.href ? "on" : ""} onClick={closeAll}>{l.label}</Link>
              </li>
            )
          )}
          <li className="mobile-cta">
            <SplitButton href="/contact">Get a quote</SplitButton>
          </li>
        </ul>
        <div className="nav-right">
          <a href="tel:+15550142290" className="call">Call sales</a>
          <div className="nav-cta">
            <SplitButton href="/contact">Get a quote</SplitButton>
          </div>
          <button className="burger" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  )
}