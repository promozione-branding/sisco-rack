"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SplitButton from "./SplitButton"

const line = (i) => ({
  initial: { opacity: 0, y: 46 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15 + i * 0.15 }
})

export default function Hero() {
  return (
    <section className="hero-frame">
      {/* Background image + dark overlay */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <h1>
        <motion.span {...line(0)}>Build storage faster</motion.span>
        <motion.span {...line(1)}>
          Load with <em>confidence</em>
        </motion.span>
      </h1>

      <motion.div
        className="cta-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <SplitButton href="/contact" dark>
          Get a quote
        </SplitButton>
        <Link href="/products" className="btn ghost">
          Browse products
        </Link>
      </motion.div>
    </section>
  )
}