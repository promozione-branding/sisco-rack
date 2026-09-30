"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { categories, products } from "@/lib/data"

export default function ProductGrid() {
  const [cat, setCat] = useState("all")
  const shown = cat === "all" ? products : products.filter((p) => p.cat === cat)

  return (
    <section className="section">
      <div className="wrap">
        <div className="tabs">
          <button
            className={`tab ${cat === "all" ? "on" : ""}`}
            onClick={() => setCat("all")}
          >
            All products
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`tab ${cat === c.id ? "on" : ""}`}
              onClick={() => setCat(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <motion.div className="grid" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => {
              const subtitle =
                p.specs?.height
                  ? `${p.specs.height}${p.specs.layersPerRack ? ` · ${p.specs.layersPerRack} layers` : ""}`
                  : p.category ?? p.cat

              return (
                <motion.article
                  className="card"
                  key={p.id ?? p.slug ?? p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
              <Link href={`/products/${p.slug}`} className="card-link">
  <div className="card-top">
    <img src={p.image} alt={p.name} loading="lazy" />
  </div>

  <div className="card-body">
    <h3>{p.name}</h3>
    <p>{subtitle}</p>

    <div className="card-foot">
      <p className="price">{p.price}</p>
      <span className="card-go" aria-hidden>→</span>
    </div>
  </div>
</Link>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}