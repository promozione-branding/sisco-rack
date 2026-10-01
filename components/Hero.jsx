"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SplitButton from "./SplitButton"

const crates = [
  { w: 74, h: 58 },
  { w: 96, h: 80 },
  { w: 62, h: 46 },
  { w: 110, h: 70 },
  { w: 80, h: 92 },
  { w: 66, h: 52 },
  { w: 100, h: 64 },
  { w: 72, h: 84 },
  { w: 90, h: 56 }
]

const line = (i) => ({
  initial: { opacity: 0, y: 46 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15 + i * 0.15 }
})

export default function Hero() {
  return (
    <section className="hero-frame">
     
      <h1>
        <motion.span {...line(0)}>Build storage faster</motion.span>
        <motion.span {...line(1)}>
          Load with <em>confidence</em>
        </motion.span>
      </h1>
      <motion.div className="cta-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <SplitButton href="/contact" dark>Get a quote</SplitButton>
        <Link href="/products" className="btn ghost">Browse products</Link>
      </motion.div>
      <div className="hero-shelf" aria-hidden="true">
        {crates.map((c, i) => (
          <motion.div
            key={i}
            className="crate"
            style={{ width: c.w, height: c.h }}
            initial={{ y: -420, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 110, damping: 13, delay: 1.2 + i * 0.12 }}
          />
        ))}
      </div>
      <motion.div className="hero-beam" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ duration: 0.7, delay: 0.9 }} />
    </section>
  )
}