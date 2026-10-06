"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Ruler, Layers, Weight, ArrowRight } from "lucide-react"
import { categories } from "@/lib/data"
import { products } from "@/lib/products"

const NAVY = "#0b2a5b"
const AMBER = "#f5a623"

const TAB = "cursor-pointer rounded-pill border-2 border-solid border-ink px-5 py-2.5 font-semibold leading-[inherit] transition-[background] duration-200 [font-family:inherit] [font-size:inherit]"
const TAB_ON = "bg-ink text-bg"
const TAB_OFF = "bg-transparent text-inherit hover:bg-steel"

function getSpecs(p) {
  const s = p.specs || {}
  return [
    { icon: Ruler, value: s.height, label: "Height" },
    { icon: Layers, value: s.layersPerRack, label: "Layers" },
    { icon: Weight, value: s.capacity ?? s.load ?? s.loadCapacity, label: "Capacity" },
  ].filter((x) => x.value !== undefined && x.value !== null && x.value !== "")
}

const WA_NUMBER = "+917629827285" 

const openWhatsApp = (e, message) => {
  e.preventDefault()
  e.stopPropagation()
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  )
}

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

        <motion.div
          className="grid grid-cols-[repeat(4,1fr)] gap-6 max-[1280px]:grid-cols-[repeat(3,1fr)] max-[960px]:grid-cols-[1fr_1fr] max-[600px]:grid-cols-[1fr]"
          layout
        >
          <AnimatePresence mode="popLayout">
            {shown.map((p) => {
              const specs = getSpecs(p)
              const desc = p.text || p.description || ""
              const price = "View more"

              return (
                <motion.article
                  className="group/card h-full"
                  key={p.id ?? p.slug ?? p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_10px_30px_rgba(15,40,90,0.10)] transition-shadow duration-200 group-hover/card:shadow-[0_18px_40px_rgba(15,40,90,0.18)]"
                  >
                    {/* Image + floating spec pill */}
                    <div className="relative flex-none">
                      <div className="h-[300px] overflow-hidden bg-slate-100 max-[720px]:h-[240px]">
                        <img
                          className="block h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover/card:scale-[1.05]"
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                        />
                      </div>

                      {specs.length > 0 && (
                        <div
                          className="absolute -bottom-9 left-3.5 right-3.5 grid items-center rounded-2xl bg-white px-2 py-3 shadow-[0_6px_20px_rgba(15,40,90,0.12)]"
                          style={{ gridTemplateColumns: `repeat(${specs.length}, 1fr)` }}
                        >
                          {specs.map(({ icon: Icon, value, label }, i) => (
                            <div
                              key={label}
                              className={`flex items-center justify-center gap-2 px-1 ${i > 0 ? "border-l border-solid border-slate-200" : ""}`}
                            >
                              <Icon className="h-[22px] w-[22px] shrink-0" style={{ color: NAVY }} />
                              <div className="min-w-0 leading-tight">
                                <p className="truncate text-[0.82rem] font-bold" style={{ color: NAVY }}>{value}</p>
                                <p className="truncate text-[0.68rem] text-slate-500">{label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col px-[22px] pb-[22px] pt-[50px]">
                      <span className="h-[3px] w-[28%] rounded-full" style={{ background: AMBER }} />

                      <h3
                        className="mt-4 text-[1.15rem] font-extrabold leading-[1.3]"
                        style={{ color: NAVY }}
                      >
                        {p.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 min-h-[3.9em] text-[0.9rem] leading-[1.45] text-slate-500">
                        {desc}
                      </p>

                      <div className="mt-auto flex items-center gap-3 pt-5">
                        <span
                          className="flex h-[54px] flex-1 items-center justify-center rounded-full bg-slate-100 px-4 text-[0.95rem] font-bold"
                          style={{ color: NAVY }}
                        >
                          {price}
                        </span>
                        <span
  role="link"
  tabIndex={0}
  aria-label={`Chat on WhatsApp about ${p.name}`}
  title="Chat on WhatsApp"
  onClick={(e) => openWhatsApp(e, `Hi, I'm interested in ${p.name}. Can you share more details?`)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") openWhatsApp(e, `Hi, I'm interested in ${p.name}. Can you share more details?`)
  }}
  className="grid h-[54px] w-[54px] shrink-0 cursor-pointer place-items-center rounded-full bg-[#25D366] text-white shadow-[0_6px_14px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-110"
>
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.23 8.21z" />
  </svg>
</span>
                        <span
                          className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full text-[#0b2a5b] shadow-[0_6px_14px_rgba(245,166,35,0.45)] transition-transform duration-200 group-hover/card:translate-x-[3px]"
                          style={{ background: AMBER }}
                          aria-hidden
                        >
                          <ArrowRight className="h-5 w-5" />
                        </span>
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