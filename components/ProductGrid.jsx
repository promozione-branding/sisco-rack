"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { categories, products } from "@/lib/data"

const TAB = "cursor-pointer rounded-pill border-2 border-solid border-ink px-5 py-2.5 font-semibold leading-[inherit] transition-[background] duration-200 [font-family:inherit] [font-size:inherit]"
const TAB_ON = "bg-ink text-bg"
const TAB_OFF = "bg-transparent text-inherit hover:bg-steel"

export default function ProductGrid() {
  const [cat, setCat] = useState("all")
  const shown = cat === "all" ? products : products.filter((p) => p.cat === cat)

  return (
    <section className="py-12 max-[720px]:py-10">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="mb-9 flex flex-wrap gap-2.5">
          <button
            className={`${TAB} ${cat === "all" ? TAB_ON : TAB_OFF}`}
            onClick={() => setCat("all")}
          >
            All products
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`${TAB} ${cat === c.id ? TAB_ON : TAB_OFF}`}
              onClick={() => setCat(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <motion.div className="grid grid-cols-[repeat(4,1fr)] gap-6 max-[720px]:grid-cols-[1fr] max-[960px]:grid-cols-[1fr_1fr]" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => {
              const subtitle =
                p.specs?.height
                  ? `${p.specs.height}${p.specs.layersPerRack ? ` · ${p.specs.layersPerRack} layers` : ""}`
                  : p.category ?? p.cat

              return (
                <motion.article
                  className="group/card relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-[24px] border-2 border-solid border-ink bg-cool"
                  key={p.id ?? p.slug ?? p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
              <Link href={`/products/${p.slug}`} className="flex h-full flex-col">
  <div className="grid h-[345px] flex-none place-items-center overflow-hidden border-b-[3px] border-solid border-safety bg-white max-[720px]:h-[220px]">
    <img className="block h-full w-full object-contain object-center transition-transform duration-[250ms] ease-out group-hover/card:scale-[1.05]" src={p.image} alt={p.name} loading="lazy" />
  </div>

  <div className="flex min-h-0 flex-1 flex-col bg-cool px-[18px] pb-[18px] pt-4">
    <h3 className="mb-1 text-[1.1rem] leading-[1.3] text-ink">{p.name}</h3>
    <p className="text-[0.88rem] leading-[1.4] text-muted">{subtitle}</p>

    <div className="mt-auto flex items-center justify-between gap-3 px-[22px] pb-0 pt-3.5">
      <p className="text-[0.88rem] font-bold leading-[1.4] text-blue">{p.price}</p>
      <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-circle border border-solid border-line bg-white text-ink transition-[background,border-color,transform] duration-[180ms] group-hover/card:translate-x-[3px] group-hover/card:border-safety group-hover/card:bg-safety" aria-hidden>→</span>
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