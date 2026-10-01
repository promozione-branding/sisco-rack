"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, MotionConfig, useScroll, useTransform, useSpring, useInView, animate } from "framer-motion"
import SplitButton from "./SplitButton"
import LottieIcon from "./LottieIcon"
import { story, aboutStats, milestones, values } from "@/lib/about"

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } })
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
    <p className="ab-statement" ref={ref}>
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

export default function AboutUsSection() {
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
     

      <div className="wrap ab-intro">
        <div>
          <span className="cat-eyebrow">Our story</span>
          <Statement text={story} />
          <Reveal i={1}>
            <div className="ab-sub-row">
              <SplitButton href="/contact" dark>Talk to our team</SplitButton>
              <Link href="/products" className="btn ghost">See our racks</Link>
            </div>
          </Reveal>
        </div>

        <div className="ab-collage" ref={collage}>
          <motion.div className="ab-photo ab-p1" style={{ y: driftA }} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img src="/slotted.jpeg" alt="Our plant floor" loading="lazy" />
          </motion.div>
          <motion.div className="ab-photo ab-p2" style={{ y: driftB }} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <img src="/mezzanine.webp" alt="An installation crew at work" loading="lazy" />
          </motion.div>
          {/* <motion.div className="ab-seal" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <LottieIcon className="ab-seal-lottie" colors={["#1F2A33", "#FFFFFF"]} />
          </motion.div> */}
        </div>
      </div>

      <div className="wrap pd-sec">
        <div className="ab-stats" ref={stats}>
          {aboutStats.map((s, i) => (
            <motion.div
              key={s.label}
              className={s.dark ? "ab-crate dark" : "ab-crate"}
              style={{ minHeight: s.h }}
              initial={{ y: -360, opacity: 0 }}
              animate={statsIn ? { y: 0, opacity: 1 } : { y: -360, opacity: 0 }}
              transition={{ type: "spring", stiffness: 110, damping: 13, delay: 0.5 + i * 0.15 }}
            >
              <b><Count to={s.to} suffix={s.suffix} /></b>
              <span>{s.label}</span>
            </motion.div>
          ))}
          <motion.i className="ab-stats-beam" style={{ originX: 0 }} initial={{ scaleX: 0 }} animate={{ scaleX: statsIn ? 1 : 0 }} transition={{ duration: 0.7, delay: 0.2 }} />
        </div>
      </div>

      <section className="wrap pd-sec">
        <Reveal className="pd-title">
          <h2>Built level by level</h2>
        </Reveal>
        <div className="ab-tl" ref={line}>
          <div className="ab-rail" aria-hidden="true">
            <motion.i style={{ scaleY: fill }} />
          </div>
          {milestones.map((m, i) => {
            const side = i % 2 ? "r" : "l"
            return (
              <div className={`ab-ms ${side}`} key={m.year}>
                <motion.span className="ab-year" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6 }}>
                  {m.year}
                </motion.span>
                <motion.span className="ab-node" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} />
                <motion.div
                  className="ab-ms-card"
                  initial={{ opacity: 0, x: side === "l" ? -70 : 70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="wrap pd-sec">
        <Reveal className="pd-title">
          <h2>What is stamped on every job</h2>
        </Reveal>
        <div className="ab-plates">
          {values.map((v, i) => (
            <Reveal key={v.no} i={i}>
              <div className="ab-plate">
                <em>{v.no}</em>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="pd-band">
          <div className="pd-band-l">
            <LottieIcon className="pd-band-lottie" colors={["#FFFFFF", "#E8A317"]} />
            <div>
              <h2>Let us rack your next floor</h2>
              <p>Send us your bay sizes and loads. You get drawings in two working days and a fixed price.</p>
            </div>
          </div>
          <div className="pd-band-r">
            <SplitButton href="/contact">Get a quote</SplitButton>
          </div>
        </section>
      </Reveal>
    </MotionConfig>
  )
}