"use client"

import { motion } from "framer-motion"
import ShelfCrew from "./ShelfCrew"

export default function ProductHead({ title, text }) {
  return (
    <section className="pd-head">
        <ShelfCrew/>
      <div className="wrap">
        <motion.h1 style={{ fontSize: "clamp(3rem, 7vw, 5.4rem)" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {title}
        </motion.h1>
        <p className="lead">{text}</p>
      </div>
    </section>
  )
}
