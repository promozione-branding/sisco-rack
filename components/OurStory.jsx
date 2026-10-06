"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, MotionConfig, useScroll, useTransform, useSpring, useInView, useReducedMotion, animate } from "framer-motion"
import SplitButton from "./SplitButton"
import LottieIcon from "./LottieIcon"
import { story, aboutStats, milestones, values } from "@/lib/about"

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } })
}

const valueImages = ["/welding.png", "/steel.png" , "finishing.png" , "mezzanine.png"]

const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" className="h-11 w-11 max-[720px]:h-9 max-[720px]:w-9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const icons = {
  weld: () => (
    <Svg>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </Svg>
  ),
  rack: () => (
    <Svg>
      <path d="M3 3v18M21 3v18" />
      <path d="M3 9h18M3 15h18M3 21h18" />
      <rect x="5" y="5" width="5" height="4" />
      <rect x="13" y="11" width="6" height="4" />
      <rect x="6" y="17" width="5" height="4" />
    </Svg>
  ),
  coat: () => (
    <Svg>
      <rect x="6" y="10" width="8" height="12" rx="1.5" />
      <path d="M8 10V7h4v3" />
      <path d="M10 7V4" />
      <path d="M17 6h.01M19.5 4h.01M19.5 8h.01M22 6h.01M17 10h.01" strokeWidth="2.6" />
    </Svg>
  ),
  mezz: () => (
    <Svg>
      <path d="M3 21h18" />
      <path d="M3 12h11" />
      <path d="M4 12v9M13 12v9" />
      <path d="M14 21h2v-2h2v-2h2v-2h1" />
      <rect x="5.5" y="8" width="4" height="4" />
    </Svg>
  ),
  flag: () => (
    <Svg>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </Svg>
  ),
}

const pickIcon = (title = "") => {
  const t = title.toLowerCase()
  if (/weld/.test(t)) return icons.weld
  if (/mezzanine|platform|floor/.test(t)) return icons.mezz
  if (/coat|paint|finish/.test(t)) return icons.coat
  if (/rack|pallet|shelv/.test(t)) return icons.rack
  return icons.flag
}

function Milestone({ m, side, index = 0 }) {
  const row = useRef(null)
  const reduce = useReducedMotion()
  const dir = side === "l" ? -1 : 1
  const Icon = pickIcon(m.title)
  const { scrollYProgress } = useScroll({ target: row, offset: ["start end", "end start"] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  const x = useTransform(p, [0, 0.35, 0.65, 1], [dir * 110, 0, 0, dir * -30])
  const y = useTransform(p, [0, 0.35, 0.65, 1], [60, 0, 0, -30])
  const scale = useTransform(p, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.95])
  const opacity = useTransform(p, [0, 0.25, 0.7, 1], [0, 1, 1, 0.3])
  const yearX = useTransform(p, [0, 0.35, 0.65, 1], [dir * -70, 0, 0, dir * 30])
  const yearOpacity = useTransform(p, [0, 0.3, 0.7, 1], [0, 1, 1, 0.2])
  const nodeScale = useTransform(p, [0.1, 0.32, 0.68, 0.92], [0, 1, 1, 0])

  return (
    <div className="relative mb-[30px] grid grid-cols-[1fr_64px_1fr] items-center max-[720px]:mb-6 max-[720px]:grid-cols-[44px_1fr] max-[720px]:grid-rows-[auto_auto]" ref={row}>
      <motion.span className={`font-display text-[length:clamp(2.8rem,6vw,5rem)] font-bold leading-none text-steel-deep max-[720px]:col-start-2 max-[720px]:row-start-1 max-[720px]:p-0 max-[720px]:text-left max-[720px]:text-[2.4rem] ${side === "l" ? "col-start-3 row-start-1 pl-7 text-left" : "col-start-1 row-start-1 pr-7 text-right"}`} style={reduce ? undefined : { x: yearX, opacity: yearOpacity }}>
        {m.year}
      </motion.span>
      <motion.span className="z-[2] col-start-2 row-start-1 h-[26px] w-[26px] justify-self-center rounded-circle border-[3px] border-solid border-ink bg-safety max-[720px]:col-start-1 max-[720px]:row-[1/span_2] max-[720px]:ml-px max-[720px]:justify-self-start" style={reduce ? undefined : { scale: nodeScale }} />
      <motion.div
        className={`relative w-[clamp(240px,22vw,290px)] will-change-[transform,opacity] max-[720px]:col-start-2 max-[720px]:row-start-2 max-[720px]:w-[min(100%,280px)] max-[720px]:justify-self-start ${
          side === "l"
            ? "col-start-1 row-start-1 justify-self-end after:absolute after:left-full after:top-1/2 after:h-0.5 after:w-8 after:-translate-y-1/2 after:bg-ink after:content-[''] max-[720px]:after:hidden"
            : "col-start-3 row-start-1 justify-self-start before:absolute before:right-full before:top-1/2 before:h-0.5 before:w-8 before:-translate-y-1/2 before:bg-ink before:content-[''] max-[720px]:before:hidden"
        }`}
        style={reduce ? undefined : { x, y, scale, opacity }}
      >
        <div className="group relative flex aspect-square flex-col overflow-hidden rounded-[24px] border-2 border-solid border-ink bg-white p-6 shadow-[0_10px_24px_rgba(31,42,51,0.08)] transition-[transform,box-shadow] duration-[180ms] ease-out hover:-translate-y-[5px] hover:shadow-soft max-[720px]:p-5">
          <span className="absolute inset-x-0 top-0 h-1.5 bg-safety" aria-hidden="true" />
          <span className="pointer-events-none absolute right-5 top-4 select-none font-display text-[4.5rem] font-bold leading-none text-ink opacity-[0.07]" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="relative mt-2 flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] border-2 border-solid border-ink bg-safety text-ink transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105 max-[720px]:h-16 max-[720px]:w-16">
            <Icon />
          </span>
          <div className="relative mt-auto">
            <h3 className="font-body text-[1.1rem] font-bold leading-[1.3] tracking-normal">{m.title}</h3>
            <p className="mt-2 text-[0.92rem] leading-[1.5] text-muted">{m.text}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Reveal({ children, className, i = 0 }) {
  return (
    <motion.div className={className} variants={rise} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  )
}

function Word({ word, i, n, progress }) {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.16, 1])
  return (
    <motion.span style={{ opacity }}>
      {word}
      {" "}
    </motion.span>
  )
}

function Statement({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] })
  const words = text.split(" ")
  return (
    <p className="mt-4 font-display text-[length:clamp(1.9rem,3.6vw,3.2rem)] font-bold leading-[1.12] text-[#253970]" ref={ref}>
      {words.map((w, i) => (
        <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}

function Count({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  )
}

export default function OurStory() {
  const collage = useRef(null)
  const stats = useRef(null)
  const line = useRef(null)
  const statsIn = useInView(stats, { once: true, amount: 0.4 })

  const { scrollYProgress: cp } = useScroll({ target: collage, offset: ["start end", "end start"] })
  const driftA = useTransform(cp, [0, 1], [30, -30])
  const driftB = useTransform(cp, [0, 1], [-50, 50])

  const { scrollYProgress: lp } = useScroll({ target: line, offset: ["start 70%", "end 60%"] })
  const fill = useSpring(lp, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto grid max-w-full grid-cols-[1.1fr_0.9fr] items-center gap-14 px-14 pt-14 max-[960px]:grid-cols-[1fr] max-[960px]:gap-9 max-[960px]:px-10 max-[720px]:px-5">
        <div>
          <span className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']">Our story</span>
          <Statement text={story} />
          <Reveal i={1}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <SplitButton href="/contact" dark>Talk to our team</SplitButton>
              <Link href="/products" className="inline-block cursor-pointer rounded-[14px] border-2 border-solid border-ink bg-transparent px-7 py-3.5 text-[1rem] font-semibold text-ink transition-[background,color] duration-[250ms] [font-family:inherit] hover:bg-ink hover:text-bg">See our racks</Link>
            </div>
          </Reveal>
        </div>

        <div className="relative h-[clamp(380px,60svh,560px)]" ref={collage}>
          <motion.div className="absolute left-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[28px] border-2 border-solid border-ink bg-[linear-gradient(135deg,#c5ced5,#e9edf0)]" style={{ y: driftA }} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img className="block h-full w-full object-fill" src="/slotted.jpeg" alt="Our plant floor" loading="lazy" />
          </motion.div>
          <motion.div className="absolute bottom-0 right-0 h-1/2 w-[52%] overflow-hidden rounded-[28px] border-2 border-solid border-ink bg-[linear-gradient(135deg,#c5ced5,#e9edf0)] shadow-[0_16px_32px_rgba(31,42,51,0.2)]" style={{ y: driftB }} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <img className="block h-full w-full object-fill" src="/mezzanine.webp" alt="An installation crew at work" loading="lazy" />
          </motion.div>
        </div>
      </div>

      <section className="mx-auto max-w-full px-14 pt-16 max-[960px]:px-10 max-[720px]:px-5">
        <Reveal className="mb-[26px] flex items-end justify-between gap-6">
          <h2 className="text-[length:clamp(1.9rem,3.6vw,3rem)]">Built level by level</h2>
        </Reveal>
        <div className="relative py-2" ref={line}>
          <div className="absolute bottom-0 left-1/2 top-0 w-[18px] -translate-x-1/2 overflow-hidden rounded-[9px] bg-blue bg-[radial-gradient(circle,var(--panel)_2.5px,transparent_3.5px)] bg-[length:18px_26px] bg-[position:center_6px] max-[720px]:left-3.5" aria-hidden="true">
            <motion.i className="absolute bottom-0 left-1/2 top-0 -ml-[3px] w-1.5 origin-top bg-safety" style={{ scaleY: fill }} />
          </div>
          {milestones.map((m, i) => (
            <Milestone key={m.year} m={m} side={i % 2 ? "r" : "l"} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-full px-14 pt-16 max-[960px]:px-10 max-[720px]:px-5">
        <Reveal className="mb-[26px] flex items-end justify-between gap-6">
          <h2 className="text-[length:clamp(1.9rem,3.6vw,3rem)]">What Sets Us Apart</h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(4,1fr)] gap-[18px] max-[720px]:grid-cols-[1fr] max-[960px]:grid-cols-[1fr_1fr]">
          {values.map((v, i) => (
            <Reveal key={v.no} i={i} className="flex">
              <div className="group relative flex-1 overflow-hidden rounded-[22px] border-2 border-solid border-ink bg-[#253970] px-[30px] pb-[34px] pt-11 transition-[transform,box-shadow] duration-[180ms] ease-out hover:-translate-y-2 hover:-rotate-1 hover:shadow-lift-hover">
                <div className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" style={{ backgroundImage: `url(${v.image || valueImages[i % valueImages.length]})` }} aria-hidden="true" />
                <div className="absolute inset-0 bg-[#253970]/70 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_16px_16px,#7a8b99_0_4px,transparent_5px),radial-gradient(circle_at_calc(100%_-_16px)_16px,#7a8b99_0_4px,transparent_5px),radial-gradient(circle_at_16px_calc(100%_-_16px),#7a8b99_0_4px,transparent_5px),radial-gradient(circle_at_calc(100%_-_16px)_calc(100%_-_16px),#7a8b99_0_4px,transparent_5px)]" aria-hidden="true" />
                <div className="relative z-[3]">
                  <em className="block font-display text-[2.6rem] font-bold not-italic leading-none text-safety">{v.no}</em>
                  <h3 className="mt-2.5 font-body text-[1.1rem] font-bold leading-[1.3] tracking-normal text-white">{v.title}</h3>
                  <p className="mt-2 text-[0.92rem] text-white/80">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </MotionConfig>
  )
}