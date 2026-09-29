"use client"

import { motion } from "framer-motion"
import { marqueeItems } from "@/lib/data"

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        className="marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <i />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
