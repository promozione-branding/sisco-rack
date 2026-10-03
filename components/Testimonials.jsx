"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion"
import { testimonials } from "@/lib/testimonials"

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const n = testimonials.length
const at = (v) => clamp(v / 0.88, 0, 1) * (n - 1)

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z" fill="currentColor" />
  </svg>
)

function Body({ data }) {
  const dark = data.tone === "dark"
  const initials = data.name.split(" ").map((w) => w[0]).join("").slice(0, 2)
  return (
    <>
      <div className="flex items-center justify-between text-safety">
        <svg width="42" height="34" viewBox="0 0 42 34" aria-hidden="true">
          <path d="M0 34V19C0 8 6 1.5 16 0v6.5C11 8 9 11 9 15h8v19H0zm24 0V19C24 8 30 1.5 40 0v6.5C35 8 33 11 33 15h8v19H24z" fill="currentColor" />
        </svg>
        <span className="flex gap-[3px]">
          <Star /><Star /><Star /><Star /><Star />
        </span>
      </div>
      <p className="text-[length:clamp(1.05rem,1.6vw,1.45rem)] font-medium leading-[1.45]">{data.quote}</p>
      <div className="flex items-center gap-3.5">
        <span className="grid h-[52px] w-[52px] shrink-0 place-items-center overflow-hidden rounded-circle bg-safety font-display text-[1.4rem] font-bold text-ink">
          {data.image ? <img className="h-full w-full object-cover" src={data.image} alt={data.name} /> : initials}
        </span>
        <span>
          <b className="block leading-[1.3]">{data.name}</b>
          <small className={`block text-[0.82rem] ${dark ? "text-mist" : "text-muted-2"}`}>{data.role}, {data.company}</small>
        </span>
        <span className={`ml-auto whitespace-nowrap rounded-pill border border-solid px-3.5 py-1.5 text-[0.76rem] font-semibold max-[540px]:hidden ${dark ? "border-white/35" : "border-line"}`}>{data.project}</span>
      </div>
    </>
  )
}

function Card({ data, i, progress }) {
  const enter = useTransform(progress, (v) => {
    if (i === 0) return 0
    return (1 - clamp(at(v) - (i - 1), 0, 1)) * 118
  })
  const slotY = useTransform(enter, (v) => `${v}%`)
  const tilt = useTransform(enter, (v) => (v / 118) * 4)
  const depth = useTransform(progress, (v) => Math.max(0, at(v) - i))
  const y = useTransform(depth, (d) => -d * 24)
  const scale = useTransform(depth, (d) => 1 - d * 0.05)
  const opacity = useTransform(depth, (d) => 1 - clamp(d - 2.2, 0, 1))

  return (
    <motion.div className="absolute inset-0 will-change-transform" style={{ y: slotY, rotate: tilt, zIndex: i }}>
      <motion.article className={`h-full flex flex-col justify-between gap-5 rounded-[28px] border-2 border-solid border-ink px-[34px] py-8 shadow-[0_18px_40px_rgba(31,42,51,0.14)] max-[960px]:p-[22px] ${data.tone === "dark" ? "bg-navy text-white" : "bg-white"}`} style={{ y, scale, opacity, transformOrigin: "50% 0%" }}>
        <Body data={data} />
      </motion.article>
    </motion.div>
  )
}

export default function Testimonials() {
  const box = useRef(null)
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end end"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const beam = useTransform(progress, (v) => clamp(v / 0.88, 0, 1))

  useMotionValueEvent(progress, "change", (v) => {
    setIdx(clamp(Math.round(at(v)), 0, n - 1))
  })

  if (reduce) {
    return (
      <section className="py-12 max-[720px]:py-10">
        <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
          <div className="mb-11 text-center min-[961px]:mb-[18px]">
            <span className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']">Client stories</span>
            <h2 className="mt-3.5 min-[961px]:mt-2 min-[961px]:text-[length:clamp(1.8rem,3.4vw,2.8rem)]">Trusted by teams that store heavy</h2>
          </div>
          <div className="grid grid-cols-[repeat(2,1fr)] gap-6 max-[960px]:grid-cols-[1fr]">
            {testimonials.map((t) => (
              <article key={t.name} className={`h-auto min-h-[320px] flex flex-col justify-between gap-5 rounded-[28px] border-2 border-solid border-ink px-[34px] py-8 shadow-[0_18px_40px_rgba(31,42,51,0.14)] max-[960px]:p-[22px] ${t.tone === "dark" ? "bg-navy text-white" : "bg-white"}`}>
                <Body data={t} />
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative" ref={box} style={{ height: `${n * 95}vh` }}>
      <div className="sticky top-0 h-[100svh] min-h-[560px] px-11 py-3.5 max-[960px]:px-3 max-[960px]:py-2.5">
        <div className="relative isolate grid h-full grid-cols-[0.9fr_1.1fr] items-center gap-14 overflow-hidden rounded-[36px] border-y-2 border-solid border-ink bg-[linear-gradient(160deg,#d6e2ea_0%,var(--panel)_55%,#ffffff_100%)] px-16 before:absolute before:inset-0 before:-z-[1] before:content-[''] before:bg-[repeating-linear-gradient(0deg,rgba(62,92,118,0.12)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(62,92,118,0.09)_0_1px,transparent_1px_7px)] before:[mask-image:linear-gradient(200deg,#000_0%,transparent_60%)] max-[960px]:grid-cols-[1fr] max-[960px]:content-center max-[960px]:gap-1 max-[960px]:rounded-[28px] max-[960px]:px-[22px]">
          <div>
            <span className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']">Client stories</span>
            <h2 className="mt-4 text-[length:clamp(2rem,3.6vw,3.2rem)]">Trusted by teams that store heavy</h2>
            <p className="mt-[18px] max-w-[46ch] text-[1rem] text-muted max-[960px]:hidden">Warehouses, workshops and shops across the country rely on our racking every day. Here is what they say.</p>
            <div className="mt-[22px] flex items-baseline gap-2.5">
              <b className="font-display text-[4rem] leading-none text-blue">{String(idx + 1).padStart(2, "0")}</b>
              <span className="font-semibold text-muted-2">/ {String(n).padStart(2, "0")}</span>
            </div>
            <div className="mt-3.5 h-3.5 max-w-[360px] overflow-hidden rounded-lg border-2 border-solid border-ink bg-steel max-[960px]:hidden" aria-hidden="true">
              <motion.i className="block h-full w-full origin-left bg-safety" style={{ scaleX: beam }} />
            </div>
            <div className="mt-4 flex gap-2 max-[960px]:mt-2.5" aria-hidden="true">
              {testimonials.map((t, i) => (
                <span key={t.name} className={`h-2.5 w-2.5 rounded-circle transition-[background,transform] duration-200 ${i === idx ? "scale-[1.3] bg-safety" : "bg-steel"}`} />
              ))}
            </div>
          </div>
          <div className="relative mt-10 h-[min(440px,62svh)] max-[960px]:mt-[34px] max-[960px]:h-[min(400px,52svh)]">
            {testimonials.map((t, i) => (
              <Card key={t.name} data={t} i={i} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}