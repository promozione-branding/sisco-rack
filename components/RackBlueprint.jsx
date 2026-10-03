"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const grow = {
  hidden: { scaleY: 0 },
  show: (d = 0) => ({ scaleY: 1, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } })
}
const draw = {
  hidden: { scaleX: 0 },
  show: (d = 0) => ({ scaleX: 1, transition: { duration: 0.5, delay: d, ease: "easeOut" } })
}
const dropIn = {
  hidden: { y: -170, opacity: 0 },
  show: (d = 0) => ({ y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 13, delay: d } })
}
const fade = {
  hidden: { opacity: 0 },
  show: (d = 0) => ({ opacity: 1, transition: { duration: 0.4, delay: d } })
}

export default function RackBlueprint({ height, layers, load }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const state = inView ? "show" : "hidden"
  const ft = parseInt(height) || 6
  const count = layers || Math.max(3, Math.min(6, ft - 1))
  const h = 120 + ft * 27
  const floor = 372
  const top = floor - h
  const step = (h - 22) / count
  const levels = Array.from({ length: count }, (_, k) => k)

  return (
    <svg ref={ref} className="h-auto max-h-[62svh] w-full max-w-[340px]" viewBox="0 0 340 390" role="img" aria-label={`Rack drawing, ${height || "standard"} height, ${count} layers`}>
      <rect x="34" y={floor} width="276" height="10" rx="5" fill="#c5ced5" />

      <motion.rect x="78" y={top} width="14" height={h} rx="3" fill="#3e5c76" stroke="#1f2a33" strokeWidth="2" style={{ originY: 1 }} variants={grow} custom={0} initial="hidden" animate={state} />
      <motion.rect x="232" y={top} width="14" height={h} rx="3" fill="#3e5c76" stroke="#1f2a33" strokeWidth="2" style={{ originY: 1 }} variants={grow} custom={0.1} initial="hidden" animate={state} />
      <motion.line x1="85" x2="85" y1={top + 8} y2={floor - 6} stroke="#f6f8f9" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 14" variants={fade} custom={0.7} initial="hidden" animate={state} />
      <motion.line x1="239" x2="239" y1={top + 8} y2={floor - 6} stroke="#f6f8f9" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 14" variants={fade} custom={0.7} initial="hidden" animate={state} />

      {levels.map((k) => {
        const by = floor - 12 - k * step
        const ch = Math.max(14, step - 26)
        const d = 0.6 + k * 0.16
        return (
          <g key={k}>
            <motion.rect x="78" y={by} width="168" height="8" rx="3" fill="#e8a317" stroke="#1f2a33" strokeWidth="2" style={{ originX: 0 }} variants={draw} custom={d} initial="hidden" animate={state} />
            <motion.rect x="98" y={by - ch} width={58 + (k % 3) * 8} height={ch} rx="4" fill="#cbd5dc" stroke="#1f2a33" strokeWidth="2" variants={dropIn} custom={d + 0.35} initial="hidden" animate={state} />
            <motion.rect x={172 + (k % 2) * 6} y={by - ch + 4} width={54 - (k % 3) * 4} height={ch - 4} rx="4" fill="#a9b6c0" stroke="#1f2a33" strokeWidth="2" variants={dropIn} custom={d + 0.5} initial="hidden" animate={state} />
            {load ? (
              <motion.g variants={fade} custom={d + 0.9} initial="hidden" animate={state}>
                <rect x="260" y={by - 6} width="62" height="20" rx="10" fill="#1f2a33" />
                <text x="291" y={by + 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">{load}</text>
              </motion.g>
            ) : null}
          </g>
        )
      })}

      <motion.g variants={fade} custom={1.2} initial="hidden" animate={state}>
        <line x1="46" x2="46" y1={top} y2={floor} stroke="#1f2a33" strokeWidth="1.5" />
        <line x1="38" x2="54" y1={top} y2={top} stroke="#1f2a33" strokeWidth="1.5" />
        <line x1="38" x2="54" y1={floor} y2={floor} stroke="#1f2a33" strokeWidth="1.5" />
        <g transform={`translate(30 ${(top + floor) / 2}) rotate(-90)`}>
          <rect x="-34" y="-11" width="68" height="22" rx="11" fill="#1f2a33" />
          <text y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{height || "Custom"}</text>
        </g>
      </motion.g>
    </svg>
  )
}