"use client"

import Link from "next/link"
import SplitButton from "./SplitButton"
import QuoteModal from "./QuoteModal"
import { useState, useEffect, useRef, useCallback } from "react"

const slides = [
  { src: "/hero_1400.webp", srcSet: "/hero_800_mob.webp 800w, /hero_1400.webp 1400w" },
  { src: "/industrial_store_rack_1400.webp", srcSet: "/industrial_store_rack_800.webp 800w, /industrial_store_rack_1400.webp 1400w" },
  { src: "/slotted_angle_section_panel_raw_1400.webp", srcSet: "/slotted_angle_section_panel_raw_800.webp 800w, /slotted_angle_section_panel_raw_1400.webp 1400w" },
]

const INTERVAL = 3000 
const FADE = 600

export default function Hero() {
  const [quote, setQuote] = useState(false)
  const [state, setState] = useState({ cur: 0, prev: 0 })
  const [ready, setReady] = useState(false)
  const timer = useRef(null)
  const paused = useRef(false)
  const resumeTimeout = useRef(null)

  const { cur, prev } = state

  const changeTo = useCallback((next) => {
    setState((s) => (s.cur === next ? s : { cur: next, prev: s.cur }))
  }, [])

  useEffect(() => {
    let cancelled = false

    const start = () => {
      if (cancelled) return
      slides.slice(1).forEach(({ src, srcSet }) => {
        const img = new Image()
        img.sizes = "100vw"
        img.srcset = srcSet
        img.src = src
      })
      setReady(true)
    }

    const fallback = setTimeout(start, 1000)
    let afterLoad
    const onLoad = () => {
      clearTimeout(fallback)
      afterLoad = setTimeout(start, 200)
    }

    if (document.readyState === "complete") {
      onLoad()
    } else {
      window.addEventListener("load", onLoad, { once: true })
    }

    return () => {
      cancelled = true
      clearTimeout(fallback)
      clearTimeout(afterLoad)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  const startTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => {
      if (!paused.current) {
        setState((s) => ({ cur: (s.cur + 1) % slides.length, prev: s.cur }))
      }
    }, INTERVAL)
  }, [])

  useEffect(() => {
    if (!ready) return
    startTimer()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [ready, startTimer])

  useEffect(() => () => clearTimeout(resumeTimeout.current), [])

  // Mouse hover pause (desktop only). Touch taps fire emulated mouseenter without a
  // mouseleave, which used to leave the slider paused forever on mobile.
  const onPointerEnter = (e) => {
    if (e.pointerType === "mouse") paused.current = true
  }
  const onPointerLeave = (e) => {
    if (e.pointerType === "mouse") paused.current = false
  }

  // Pause only while finger is down
  const onTouchStart = () => {
    clearTimeout(resumeTimeout.current)
    paused.current = true
  }
  const onTouchEnd = () => {
    clearTimeout(resumeTimeout.current)
    resumeTimeout.current = setTimeout(() => {
      paused.current = false
    }, 1800)
  }

  const goTo = (i) => {
    changeTo(i)
    startTimer() // restart so the next auto change feels natural
  }

  const openQuote = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setQuote(true)
  }

  return (
    <section
      className="relative isolate flex h-[80svh] max-h-[860px] min-h-[560px] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(165deg,#c9eaf2_0%,#dbe3fa_32%,#f3f6fb_62%,#ffffff_82%)] px-6 pb-[124px] pt-[104px] text-center text-white before:absolute before:inset-0 before:-z-[1] before:content-[''] before:bg-[repeating-linear-gradient(0deg,rgba(62,92,118,0.16)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(62,92,118,0.12)_0_1px,transparent_1px_7px)] before:[mask-image:linear-gradient(170deg,#000_0%,rgba(0,0,0,0.5)_35%,transparent_70%)] max-[720px]:h-[68svh] max-[720px]:max-h-[600px] max-[720px]:min-h-[480px] max-[720px]:px-[18px] max-[720px]:pb-[10px] max-[720px]:pt-[84px]"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide 0: LCP image, always mounted as the base layer */}
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
        className="absolute inset-0 -z-[4] h-full w-full object-cover object-center"
      />

      {/* Slides 1+: all stacked; the current one fades in on top of the previous one,
          so the base image never flashes through and the image always matches the dots */}
      {ready &&
        slides.map((s, i) => {
          if (i === 0) return null
          const isCur = i === cur
          const isPrev = i === prev
          return (
            <img
              key={s.src}
              src={s.src}
              srcSet={s.srcSet}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out"
              style={{
                opacity: isCur || isPrev ? 1 : 0,
                zIndex: isCur ? -2 : isPrev ? -3 : -4,
                // keep the outgoing image fully visible until the new one has covered it
                transitionDuration: isCur ? `${FADE}ms` : "0ms",
              }}
            />
          )
        })}

      {/* When slide 0 is current, cover the others by fading them out above it */}
      {ready && cur === 0 && prev !== 0 && (
        <img
          key={`reveal-${prev}`}
          src={slides[0].src}
          srcSet={slides[0].srcSet}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="hero-reveal pointer-events-none absolute inset-0 -z-[2] h-full w-full object-cover object-center"
          style={{ animation: `heroReveal ${FADE}ms ease-in-out both` }}
        />
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
      <div className="absolute bottom-[80px] left-1/2 z-10 flex -translate-x-1/2 items-center max-[720px]:bottom-[56px]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === cur}
            className="group grid h-6 min-w-6 place-items-center px-0.5"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                i === cur ? "w-6 bg-white" : "w-2 bg-white/50 group-active:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes heroReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </section>
  )
}