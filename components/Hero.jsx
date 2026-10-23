"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import SplitButton from "./SplitButton"
import QuoteModal from "./QuoteModal"
import { useState, useEffect, useRef } from "react"

const slides = [
  { src: "/hero_1400.webp", srcSet: "/hero_800_mob.webp 800w, /hero_1400.webp 1400w" },
  { src: "/industrial_store_rack_1400.webp", srcSet: "/industrial_store_rack_800.webp 800w, /industrial_store_rack_1400.webp 1400w" },
  { src: "/slotted_angle_section_panel_raw_1400.webp", srcSet: "/slotted_angle_section_panel_raw_800.webp 800w, /slotted_angle_section_panel_raw_1400.webp 1400w" },
]

export default function Hero() {
  const [quote, setQuote] = useState(false)
  const [slide, setSlide] = useState(0)
  const [ready, setReady] = useState(false)
  const intervalRef = useRef(null)

  // Faster + more reliable ready trigger for mobile
  useEffect(() => {
    let cancelled = false

    const go = () => {
      if (cancelled) return
      // start preloading the other two images
      slides.slice(1).forEach(({ src, srcSet }) => {
        const img = new Image()
        img.sizes = "100vw"
        img.srcset = srcSet
        img.src = src
      })
      setReady(true)
    }

    // Always fall back quickly (critical on mobile)
    const t = setTimeout(go, 1200)

    if (document.readyState === "complete") {
      // already loaded → start even sooner
      setTimeout(go, 400)
    } else {
      window.addEventListener("load", () => setTimeout(go, 300), { once: true })
    }

    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [])

  // Auto play
  useEffect(() => {
    if (!ready) return

    intervalRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length)
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [ready])

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const resume = () => {
    if (!ready || intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length)
    }, 3000)
  }

  const openQuote = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setQuote(true)
  }

  const current = slides[slide]

  return (
    <section
      className="relative isolate flex h-[80svh] max-h-[860px] min-h-[560px] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(165deg,#c9eaf2_0%,#dbe3fa_32%,#f3f6fb_62%,#ffffff_82%)] px-6 pb-[124px] pt-[104px] text-center text-white before:absolute before:inset-0 before:-z-[1] before:content-[''] before:bg-[repeating-linear-gradient(0deg,rgba(62,92,118,0.16)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(62,92,118,0.12)_0_1px,transparent_1px_7px)] before:[mask-image:linear-gradient(170deg,#000_0%,rgba(0,0,0,0.5)_35%,transparent_70%)] max-[720px]:h-[68svh] max-[720px]:max-h-[600px] max-[720px]:min-h-[480px] max-[720px]:px-[18px] max-[720px]:pb-[10px] max-[720px]:pt-[84px]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <img
        src={slides[0].src}
        srcSet={slides[0].srcSet}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        width={1400}
        height={800}
        className="absolute inset-0 -z-[2] h-full w-full object-cover object-center"
      />

      {ready && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={slide}
            src={current.src}
            srcSet={current.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-[2] h-full w-full object-cover object-center will-change-[opacity]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          />
        </AnimatePresence>
      )}

      <h2 className="text-[length:clamp(2.4rem,7.2vw,6rem)] leading-[0.92] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
        <span className="hero-rise block">Build storage faster</span>
        <span className="hero-rise block [animation-delay:.15s]">
          Load with <em className="font-normal tracking-normal text-[#f0b429]">confidence</em>
        </span>
      </h2>

      <div className="hero-rise mt-7 flex flex-wrap justify-center gap-3.5 [animation-delay:.4s] max-[720px]:mt-[20px] max-[720px]:gap-2.5">
        <SplitButton href="/" dark onClick={openQuote}>
          Get a quote
        </SplitButton>
        <Link
          href="/products"
          className="inline-block cursor-pointer rounded-[14px] border-2 border-solid border-white/70 bg-white px-7 py-3.5 text-[1rem] font-semibold text-black transition-[background,color,border-color] duration-[250ms] [font-family:inherit] hover:border-gray-800 hover:bg-gray-800 hover:text-white"
        >
          Browse products
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-[88px] left-1/2 z-10 flex -translate-x-1/2 gap-2 max-[720px]:bottom-[64px]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === slide ? "w-6 bg-white" : "w-2 bg-white/50 active:bg-white/80"
            }`}
          />
        ))}
      </div>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </section>
  )
}