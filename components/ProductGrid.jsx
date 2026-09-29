"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { categories, products } from "@/lib/data"
import LottieIcon from "./LottieIcon"

export default function ProductGrid() {
  const [cat, setCat] = useState("all")
  const shown = cat === "all" ? products : products.filter((p) => p.cat === cat)

  return (
    <section className="section">
      <div className="wrap">
        <div className="tabs">
          <button className={`tab ${cat === "all" ? "on" : ""}`} onClick={() => setCat("all")}>All products</button>
          {categories.map((c) => (
            <button key={c.id} className={`tab ${cat === c.id ? "on" : ""}`} onClick={() => setCat(c.id)}>{c.name}</button>
          ))}
        </div>
        <motion.div className="grid" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => {
              const c = categories.find((x) => x.id === p.cat)
              return (
                <motion.article
                  className="card"
                  key={p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  <div className="card-top"><LottieIcon className="card-lottie" colors={c.colors} /></div>
                  <h3>{p.name}</h3>
                  <p>{p.spec}</p>
                  <p className="price">{p.price}</p>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
