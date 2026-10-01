"use client"

import { useRef, useState, useEffect } from "react"
import { motion, MotionConfig, useInView, animate } from "framer-motion"
import SplitButton from "./SplitButton"

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } })
}
const drop = (delay) => ({
  hidden: { y: -28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 160, damping: 13, delay } },
})
const round = (v) => Number(v.toFixed(2))


function Upright({ x, delay }) {
  return (
    <motion.g
      style={{ originX: 0.5, originY: 1 }}
      variants={{
        hidden: { scaleY: 0 },
        show: { scaleY: 1, transition: { type: "spring", stiffness: 90, damping: 15, delay } },
      }}
    >
      <rect x={x} y="24" width="10" height="166" className="wx-upright" />
      <line x1={x + 5} y1="34" x2={x + 5} y2="178" className="wx-holes" />
    </motion.g>
  )
}

function Install() {
  return (
    <svg viewBox="0 0 360 236" className="wx-svg" role="img" aria-label="A storage rack being assembled, levelled and anchored, with a load plate fitted">
      <defs>
        <pattern id="wx-haz" width="14" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="7" height="8" fill="#e8a317" />
          <rect x="7" width="7" height="8" fill="#1f2a33" />
        </pattern>
      </defs>

      <motion.rect
        x="20" y="190" width="320" height="8" className="wx-floor"
        style={{ originX: 0 }}
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, delay: 0.15, ease: "easeOut" } } }}
      />

      <Upright x={120} delay={0.4} />
      <Upright x={240} delay={0.55} />

      <rect x="110" y="186" width="30" height="4" className="wx-anc-head" />
      <rect x="230" y="186" width="30" height="4" className="wx-anc-head" />

      {[64, 110, 156].map((y, i) => (
        <motion.rect key={y} x="122" y={y} width="126" height="10" rx="2" className="wx-beam" variants={drop(0.9 + i * 0.15)} />
      ))}

      <Crate x={140} y={122} w={64} h={34} delay={2.9} />
      <Crate x={172} y={28} w={44} h={36} delay={3.05} />

      <Anchor x={117} delay={1.6} />
      <Anchor x={133} delay={1.7} />
      <Anchor x={237} delay={1.8} />
      <Anchor x={253} delay={1.9} />

      <motion.g variants={fade(2.0)}>
        <rect x="182" y="98" width="50" height="12" rx="6" className="wx-level" />
        <line x1="200" y1="100" x2="200" y2="108" className="wx-level-mark" />
        <line x1="214" y1="100" x2="214" y2="108" className="wx-level-mark" />
        <motion.circle
          cx="207" cy="104" r="3.6" className="wx-bubble"
          variants={{
            hidden: { x: -16 },
            show: { x: [-16, 12, -8, 4, 0], transition: { delay: 2.2, duration: 1.6, ease: "easeInOut" } },
          }}
        />
      </motion.g>

      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          hidden: { scale: 0, rotate: -20, opacity: 0 },
          show: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 240, damping: 12, delay: 2.5 } },
        }}
      >
        <rect x="108" y="76" width="34" height="22" rx="3" className="wx-plate-rect" />
        <line x1="114" y1="84" x2="136" y2="84" className="wx-plate-line" />
        <line x1="114" y1="90" x2="128" y2="90" className="wx-plate-line" />
      </motion.g>

      <Callout d="M245 40 H280" dot={[245, 40]} x={280} y={30} w={68} label="Assemble" delay={1.4} />
      <Callout d="M232 104 H280" dot={[232, 104]} x={280} y={94} w={48} label="Level" delay={2.4} />
      <Callout d="M78 87 H110" dot={[110, 87]} x={6} y={77} w={72} label="Load plate" delay={2.7} />
      <Callout d="M70 218 H117 V206" dot={[117, 206]} x={10} y={208} w={60} label="Anchor" delay={1.95} />
    </svg>
  )
}

export default function Cta() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        className="pd-band"
        variants={rise}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pd-band-l">
          <Install />
          <div>
            <h2>Let us rack your next floor</h2>
            <p>Send us your bay sizes and loads. You get drawings in two working days and a fixed price.</p>
          </div>
        </div>
        <div className="pd-band-r">
          <SplitButton href="/contact">Get a quote</SplitButton>
        </div>
      </motion.section>
    </MotionConfig>
  )
}