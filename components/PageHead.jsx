"use client"

import { motion } from "framer-motion"

export default function PageHead({ title, text , backgroundImage}) {
  return (
    <section
      className="ph-header"
      style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="ph-wrap">
        <motion.h1
          style={{ fontSize: "clamp(3rem, 7vw, 5.4rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <p className="ph-lead">{text}</p>
      </div>
    </section>
  )
}