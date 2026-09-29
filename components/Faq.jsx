"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { faqs } from "@/lib/data"

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section">
      <div className="wrap faq-grid">
        <div>
          <h2>Questions before you order</h2>
          <p className="lead" style={{ marginTop: 20 }}>Cannot find your answer? Our team replies within one working day.</p>
        </div>
        <div>
          {faqs.map((f, i) => (
            <div className="faq-item" key={f.q}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {f.q}
                <motion.span className="faq-plus" animate={{ rotate: open === i ? 45 : 0 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
