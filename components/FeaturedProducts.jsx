"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { products } from "@/lib/products"

const WORD_LIMIT = 10

function truncateWords(text = "", limit = WORD_LIMIT) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length <= limit) {
    return { short: text.trim(), needsMore: false }
  }
  return {
    short: words.slice(0, limit).join(" ") + "…",
    needsMore: true,
  }
}

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

export default function FeaturedProducts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(products[0]?.id ?? "")
  const [settled, setSettled] = useState(false)
  const variants = reduce ? flat : drop
  const state = inView || reduce ? "show" : "hidden"
  const rows = [products.slice(0, 4), products.slice(4)].filter((row) => row.length > 0)
  const last = products.length - 1

  useEffect(() => {
    if (reduce) setSettled(true)
  }, [reduce])

  const pick = (id) => {
    if (settled) setActive(id)
  }

  return (
    <section className="section cat">
      <div className="wrap">
        <div className="cat-head">
          <span className="cat-eyebrow">Featured products</span>
          <h2>
            Our <span>Best Sellers</span>
          </h2>
          <p className="lead">
            Hand-picked steel racks trusted by warehouses, factories and retail stores. Built for strength. Made for your space.
          </p>
        </div>

        <div className={`cat-board ${settled ? "ready" : ""}`} ref={ref}>
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
              {row.map((p, k) => {
                const i = r * 4 + k
                const fullText = p.text || p.description || ""
                const { short, needsMore } = truncateWords(fullText)

                return (
                  <motion.article
                    key={p.id}
                    className={`cat-card ${active === p.id ? "on" : ""}`}
                    variants={variants}
                    custom={{ col: k, row: r, i }}
                    initial="hidden"
                    animate={state}
                    onMouseEnter={() => pick(p.id)}
                    onFocus={() => pick(p.id)}
                    onAnimationComplete={(def) => {
                      if (i === last && def === "show") setSettled(true)
                    }}
                  >
                    <div className="cat-lift">
                      <Link href={`/products/${p.slug || p.id}`} tabIndex={settled ? 0 : -1}>
                        <div className="cat-art">
                          <img src={p.image} alt={p.name} loading="lazy" />
                        </div>
                        <div className="cat-info">
                          <div>
                            <h3>{p.name}</h3>
                            <p>
                              {short}
                              {needsMore && (
                                <span className="cat-more"> Read more</span>
                              )}
                            </p>
                          </div>
                          <span className="cat-go" aria-hidden="true">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path
                                d="M2 7h10M8 3l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </div>
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