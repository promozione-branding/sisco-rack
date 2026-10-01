"use client"

import { motion, MotionConfig } from "framer-motion"
import SplitButton from "./SplitButton"

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function RackHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="rack-hero">
        <div className="rack-hero-bg" aria-hidden="true" />
        <div className="rack-hero-overlay" aria-hidden="true" />

        <div className="rack-hero-inner">
          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={0}
          >
            Build Stronger Floors
            <br />
            <span>with Industrial Racking Systems</span>
          </motion.h1>

          <motion.p
            className="rack-hero-lead"
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
          >
            Get expert guidance on the right pallet racking, cantilever and
            mezzanine solutions for your warehouse, factory or distribution centre.
          </motion.p>

          <motion.div
            className="rack-hero-ctas"
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
          >

            <a
              href="https://wa.me/919650167709"
              target="_blank"
              rel="noopener noreferrer"
              className="rack-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp Us
            </a>

            <a href="/contact">
             <SplitButton href="/contact" dark >Get a quote</SplitButton>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="rack-hero-bar"
          variants={rise}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <a href="tel:+919650167709">+91 96501 67709</a>
          <span className="sep">|</span>
          <a href="mailto:hello@yourracks.com">hello@yourracks.com</a>
          <span className="sep">|</span>
          <span>Industrial Racking Systems</span>
        </motion.div>
      </section>
    </MotionConfig>
  )
}