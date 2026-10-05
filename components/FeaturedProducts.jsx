"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Ruler, Layers, Weight, ArrowRight } from "lucide-react"
import { products } from "@/lib/products"

const WORD_LIMIT = 12
const NAVY = "#0b2a5b"
const AMBER = "#f5a623"

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

function getSpecs(p) {
  const s = p.specs || {}
  return [
    { icon: Ruler, value: s.height, label: "Height" },
    { icon: Layers, value: s.layersPerRack, label: "Layers" },
    { icon: Weight, value: s.capacity ?? s.load ?? s.loadCapacity, label: "Capacity" },
  ].filter((x) => x.value !== undefined && x.value !== null && x.value !== "")
}

const UP = "absolute bottom-0 top-0 w-5 origin-bottom bg-blue bg-[radial-gradient(circle,var(--panel)_3px,transparent_4px)] bg-[length:20px_28px] bg-[position:center_8px] max-[540px]:w-3.5 max-[540px]:bg-[length:14px_24px]"

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
    <section className="py-12 max-[720px]:py-10 min-[961px]:py-7">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="mb-11 text-center min-[961px]:mb-[18px]">
          <span className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']">Featured products</span>
          <h2 className="mt-3.5 min-[961px]:mt-2 min-[961px]:text-[length:clamp(1.8rem,3.4vw,2.8rem)]">
            Our <span className="text-blue">Best Sellers</span>
          </h2>
          <p className="mx-auto mt-[18px] max-w-[60ch] text-[1rem] text-muted min-[961px]:mt-2 min-[961px]:text-[0.92rem]">
            Hand-picked steel racks trusted by warehouses, factories and retail stores. Built for strength. Made for your space.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[32px] bg-white/55 px-[60px] pb-1 pt-[22px] max-[540px]:px-9 max-[540px]:pb-2.5 max-[540px]:pt-7 max-[960px]:px-12 max-[960px]:pb-3 max-[960px]:pt-8" ref={ref}>
          <motion.span
            className={`${UP} left-4 max-[540px]:left-2.5`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: state === "show" ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.span
            className={`${UP} right-4 max-[540px]:right-2.5`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: state === "show" ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />

          {rows.map((row, r) => (
            <div className="relative mb-[30px] grid grid-cols-[repeat(4,1fr)] gap-[22px] pb-3.5 min-[1024px]:max-[1350px]:grid-cols-[repeat(3,1fr)] max-[960px]:grid-cols-[1fr_1fr] max-[540px]:grid-cols-[1fr]" key={r}>
              <motion.i
                className="absolute -left-2.5 -right-2.5 bottom-0 h-3.5 rounded-lg border-2 border-solid border-ink bg-safety"
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: state === "show" ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.15 + r * 0.1 }}
              />
              {row.map((p, k) => {
                const i = r * 4 + k
                const fullText = p.text || p.description || ""
                const { short, needsMore } = truncateWords(fullText)
                const specs = getSpecs(p)
                const price = p.price || "On request"
                const isActive = active === p.id

                return (
                  <motion.article
                    key={p.id}
                    className={`group/card relative z-[1] ${settled ? "" : "pointer-events-none"}`}
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
                    <Link
                      href={`/products/${p.slug || p.id}`}
                      tabIndex={settled ? 0 : -1}
                      className={`flex h-full flex-col overflow-hidden rounded-[28px] bg-white transition-[transform,box-shadow] duration-200 ease-out group-hover/card:-translate-y-1.5 ${
                        isActive
                          ? "shadow-[0_18px_40px_rgba(15,40,90,0.20)] ring-2 ring-[#f5a623]"
                          : "shadow-[0_10px_30px_rgba(15,40,90,0.10)]"
                      }`}
                    >
                      {/* Image + floating spec pill */}
                      <div className="relative flex-none">
                        <div className="h-[250px] overflow-hidden bg-slate-100">
                          <img
                            className="block h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover/card:scale-[1.06]"
                            src={p.image}
                            alt={p.name}
                            loading="lazy"
                          />
                        </div>

                        {specs.length > 0 && (
                          <div
                            className="absolute -bottom-8 left-3 right-3 grid items-center rounded-2xl bg-white px-1.5 py-2.5 shadow-[0_6px_20px_rgba(15,40,90,0.12)]"
                            style={{ gridTemplateColumns: `repeat(${specs.length}, 1fr)` }}
                          >
                            {specs.map(({ icon: Icon, value, label }, n) => (
                              <div
                                key={label}
                                className={`flex items-center justify-center gap-1.5 px-1 ${n > 0 ? "border-l border-solid border-slate-200" : ""}`}
                              >
                                <Icon className="h-5 w-5 shrink-0" style={{ color: NAVY }} />
                                <div className="min-w-0 leading-tight">
                                  <p className="truncate text-[0.78rem] font-bold" style={{ color: NAVY }}>{value}</p>
                                  <p className="truncate text-[0.64rem] text-slate-500">{label}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col px-[18px] pb-[18px] pt-[44px]">
                        <span className="h-[3px] w-[28%] rounded-full" style={{ background: AMBER }} />

                        <h3
                          className="mt-3.5 font-body text-[1.05rem] font-extrabold leading-[1.3] tracking-normal"
                          style={{ color: NAVY }}
                        >
                          {p.name}
                        </h3>
                        <p className="mt-1 min-h-[4.2em] text-[0.84rem] leading-[1.45] text-slate-500">
                          {short}
                          {needsMore && (
                            <span className="font-semibold" style={{ color: NAVY }}> Read more</span>
                          )}
                        </p>

                        <div className="mt-auto flex items-center gap-3 pt-4">
                          <span
                            className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-slate-100 px-4 text-[0.9rem] font-bold"
                            style={{ color: NAVY }}
                          >
                            {price}
                          </span>
                          <span
                            className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-full shadow-[0_6px_14px_rgba(245,166,35,0.45)] transition-transform duration-200 group-hover/card:translate-x-[3px]"
                            style={{ background: AMBER, color: NAVY }}
                            aria-hidden="true"
                          >
                            <ArrowRight className="h-[18px] w-[18px]" />
                          </span>
                        </div>
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