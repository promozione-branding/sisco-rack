"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { industries } from "@/lib/industries"
import RackArt from "./RackArt"

const drop = {
  hidden: ({ col, row }) => ({
    opacity: 0,
    x: `${-(col * 108 + 70)}%`,
    y: `${-(row * 108 + 140)}%`,
    rotate: -16,
    scale: 0.55
  }),
  show: ({ i }) => ({
    opacity: [null, 1, 1, 1, 1],
    x: [null, "0%", "0%", "0%", "0%"],
    y: [null, "-14%", "0%", "-2.5%", "0%"],
    rotate: [null, -3, 0, 0, 0],
    scale: [null, 1, 1, 1.02, 1],
    transition: { duration: 1.15, times: [0, 0.55, 0.75, 0.88, 1], ease: "easeInOut", delay: 0.55 + i * 0.17 }
  })
}

const flat = {
  hidden: { opacity: 1 },
  show: { opacity: 1 }
}

export default function Categories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const [active, setActive] = useState("pallet")
  const variants = reduce ? flat : drop
  const state = inView || reduce ? "show" : "hidden"
  const rows = [industries.slice(0, 4), industries.slice(4)]

  return (
    <section className="section cat">
      <div className="wrap">
        <div className="cat-head">
          <span className="cat-eyebrow">Our categories</span>
          <h2>
            Steel Racks for <span>Every Industry</span>
          </h2>
          <p className="lead">
            Explore our range of steel racks, designed for warehouses, factories, retail stores and more. Built for strength. Made for your space.
          </p>
        </div>
        <div className="cat-board" ref={ref}>
          <motion.span
            className="cat-up l"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: state === "show" ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.span
            className="cat-up r"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: state === "show" ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          {rows.map((row, r) => (
            <div className="cat-row" key={r}>
              <motion.i
                className="cat-beam"
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: state === "show" ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.15 + r * 0.1 }}
              />
              {row.map((c, k) => {
                const i = r * 4 + k
                return (
                  <motion.article
                    key={c.id}
                    className={`cat-card ${active === c.id ? "on" : ""}`}
                    variants={variants}
                    custom={{ col: k, row: r, i }}
                    initial="hidden"
                    animate={state}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setActive(c.id)}
                    onFocus={() => setActive(c.id)}
                  >
                    <Link href="/products">
                      <div className="cat-art">
                        {c.image ? <img src={c.image} alt={c.name} /> : <RackArt type={c.art} />}
                      </div>
                      <div className="cat-info">
                        <div>
                          <h3>{c.name}</h3>
                          <p>{c.text}</p>
                        </div>
                        <span className="cat-go" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}