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
  const initials = data.name.split(" ").map((w) => w[0]).join("").slice(0, 2)
  return (
    <>
      <div className="tst-top">
        <svg width="42" height="34" viewBox="0 0 42 34" aria-hidden="true">
          <path d="M0 34V19C0 8 6 1.5 16 0v6.5C11 8 9 11 9 15h8v19H0zm24 0V19C24 8 30 1.5 40 0v6.5C35 8 33 11 33 15h8v19H24z" fill="currentColor" />
        </svg>
        <span className="tst-stars">
          <Star /><Star /><Star /><Star /><Star />
        </span>
      </div>
      <p className="tst-quote">{data.quote}</p>
      <div className="tst-who">
        <span className="tst-avatar">
          {data.image ? <img src={data.image} alt={data.name} /> : initials}
        </span>
        <span>
          <b>{data.name}</b>
          <small>{data.role}, {data.company}</small>
        </span>
        <span className="tst-chip">{data.project}</span>
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
    <motion.div className="tst-slot" style={{ y: slotY, rotate: tilt, zIndex: i }}>
      <motion.article className={`tst-card ${data.tone}`} style={{ y, scale, opacity, transformOrigin: "50% 0%" }}>
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
      <section className="section tst-static">
        <div className="wrap">
          <div className="cat-head">
            <span className="cat-eyebrow">Client stories</span>
            <h2>Trusted by teams that store heavy</h2>
          </div>
          <div className="tst-grid">
            {testimonials.map((t) => (
              <article key={t.name} className={`tst-card ${t.tone}`}>
                <Body data={t} />
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="tst" ref={box} style={{ height: `${n * 95}vh` }}>
      <div className="tst-stick">
        <div className="tst-frame">
          <div className="tst-left">
            <span className="cat-eyebrow">Client stories</span>
            <h2>Trusted by teams that store heavy</h2>
            <p className="lead tst-lead">Warehouses, workshops and shops across the country rely on our racking every day. Here is what they say.</p>
            <div className="tst-count">
              <b>{String(idx + 1).padStart(2, "0")}</b>
              <span>/ {String(n).padStart(2, "0")}</span>
            </div>
            <div className="tst-rail" aria-hidden="true">
              <motion.i style={{ scaleX: beam }} />
            </div>
            <div className="tst-dots" aria-hidden="true">
              {testimonials.map((t, i) => (
                <span key={t.name} className={i === idx ? "tst-dot on" : "tst-dot"} />
              ))}
            </div>
          </div>
          <div className="tst-stage">
            {testimonials.map((t, i) => (
              <Card key={t.name} data={t} i={i} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}