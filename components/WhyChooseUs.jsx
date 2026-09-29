"use client"

import { motion } from "framer-motion"
import { reasons } from "@/lib/data"
import LottieIcon from "./LottieIcon"

export default function WhyChooseUs() {
  return (
    <section className="section why">
      <div className="wrap">
        <div className="sec-head">
          <h2>Why teams choose Rackwell</h2>
          <p className="lead">We make the steel, test it, ship it and fit it. Fewer hand-offs mean fewer surprises on install day.</p>
        </div>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <motion.div
              className="why-card"
              key={r.title}
              whileHover={{ y: -8, backgroundColor: "#f6f8f9" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <LottieIcon className="why-lottie" colors={i % 2 ? ["#E8A317", "#3E5C76"] : ["#3E5C76", "#E8A317"]} />
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
