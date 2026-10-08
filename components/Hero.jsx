"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import SplitButton from "./SplitButton"
import QuoteModal from "./QuoteModal"
import { useState, useEffect } from "react"

// Each slide has a phone-sized (800w) and a larger (1400w) file; the browser picks the right one.
const slides = [
  { src: "/hero_1400.webp", srcSet: "/hero_800.webp 800w, /hero_1400.webp 1400w" },
  { src: "/industrial_store_rack_1400.webp", srcSet: "/industrial_store_rack_800.webp 800w, /industrial_store_rack_1400.webp 1400w" },
  { src: "/slotted_angle_section_panel_raw_1400.webp", srcSet: "/slotted_angle_section_panel_raw_800.webp 800w, /slotted_angle_section_panel_raw_1400.webp 1400w" },
]

const line = (i) => ({
  initial: { opacity: 0, y: 46 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15 + i * 0.15 }
})

export default function Hero() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const [quote, setQuote] = useState(false)
  const [slide, setSlide] = useState(0)
  const [ready, setReady] = useState(false)

  // Only start preloading the other slides (and the rotation) AFTER the page has fully loaded,
  // so they never compete with the first image, which is the Largest Contentful Paint.
  useEffect(() => {
    let cancelled = false
    const start = () => {
      const run = () => {
        if (cancelled) return
        slides.slice(1).forEach(({ src, srcSet }) => {
          const img = new Image()
          img.sizes = "100vw"
          img.srcset = srcSet
          img.src = src
        })
        setReady(true)
      }
      if ("requestIdleCallback" in window) requestIdleCallback(run, { timeout: 4000 })
      else setTimeout(run, 2500)
    }
    if (document.readyState === "complete") start()
    else window.addEventListener("load", start, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener("load", start)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [ready])

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

  const current = slides[slide]

  return (
    <section className="relative isolate flex h-[80svh] max-h-[860px] min-h-[560px] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(165deg,#c9eaf2_0%,#dbe3fa_32%,#f3f6fb_62%,#ffffff_82%)] px-6 pb-[124px] pt-[104px] text-center text-white before:absolute before:inset-0 before:-z-[1] before:content-[''] before:bg-[repeating-linear-gradient(0deg,rgba(62,92,118,0.16)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(62,92,118,0.12)_0_1px,transparent_1px_7px)] before:[mask-image:linear-gradient(170deg,#000_0%,rgba(0,0,0,0.5)_35%,transparent_70%)] max-[720px]:mx-3 max-[720px]:mt-2.5 max-[720px]:h-auto max-[720px]:max-h-none max-[720px]:min-h-[100svh] max-[720px]:rounded-[32px] max-[720px]:px-[18px] max-[720px]:pb-[120px] max-[720px]:pt-24">
      <AnimatePresence initial={false}>
        <motion.img
          key={slide}
          src={current.src}
          srcSet={current.srcSet}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority={slide === 0 ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 -z-[2] h-full w-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div
        className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.22)_50%,rgba(0,0,0,0.38)_100%)]"
        aria-hidden="true"
      />

      <h2 className="text-[length:clamp(2.8rem,7.2vw,6rem)] leading-[0.92] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
        <motion.span className="block" {...line(0)}>Build storage faster</motion.span>
        <motion.span className="block" {...line(1)}>
          Load with <em className="font-normal tracking-normal text-[#f0b429]">confidence</em>
        </motion.span>
      </h2>

      <motion.div
        className="mt-7 flex flex-wrap justify-center gap-3.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClickCapture={openQuote}
      >
        <SplitButton href="/" dark>
          Get a quote
        </SplitButton>
        <Link href="/products" className="inline-block cursor-pointer rounded-[14px] border-2 border-solid border-white/70 bg-transparent px-7 py-3.5 text-[1rem] font-semibold text-white transition-[background,color] duration-[250ms] [font-family:inherit] hover:border-white hover:bg-white hover:text-ink">
          Browse products
        </Link>
      </motion.div>

      <div className="absolute bottom-[88px] left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === slide ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </section>
  )
}
