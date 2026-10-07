"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { featuredproducts } from "@/lib/data"
import { Tag, Weight, Ruler, Layers, Paintbrush, List, Info, Palette, ArrowRight } from "lucide-react"
const WORD_LIMIT = 12
const NAVY = "#0b2a5b"
const AMBER = "#f5a623"

const WA_NUMBER = "+917629827285"

// Featured products: 6 cards (2 rows of 3), picked round-robin across categories
const FEATURED_CATS = ["slotted", "mezzanine", "supermarket", "heavy"]
const byCat = FEATURED_CATS.map((c) => featuredproducts.filter((p) => p.cat === c))
const featured = [...byCat.map((list) => list[0]), ...byCat.map((list) => list[1])].filter(Boolean).slice(0, 8)

const openWhatsApp = (e, message) => {
  e.preventDefault()
  e.stopPropagation()
  window.open(
    `https://wa.me/${WA_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  )
}

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

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

// Priority order: the first two that exist for a product are shown
const SPEC_CANDIDATES = [
  { icon: Tag, label: "Type", keys: ["rack type", "floor type", "product type", "type", "structural type", "shelf type", "design", "mount type"] },
  { icon: Weight, label: "Load Capacity", keys: ["load capacity per layer", "load per layer", "load capacity per level", "load capacity per shelf", "max load per shelf", "load capacity", "storage capacity", "bearing capacity", "frame load capacity", "weight tolerance capacity"] },
  { icon: Ruler, label: "Height", keys: ["height", "height feet", "height in feet", "system height", "platform height"] },
  { icon: Layers, label: "Material", keys: ["material", "material grade"] },
  { icon: Paintbrush, label: "Finish", keys: ["surface treatment", "surface finish", "finish", "finishing", "finish type", "finishing type", "coating", "coated"] },
  { icon: List, label: "Shelves", keys: ["number of shelves", "no of shelves", "number of levels", "layers per rack", "number of tiers", "shelves"] },
  { icon: Info, label: "Usage", keys: ["usage application", "usage", "application", "applications", "uses", "usage area"] },
  { icon: Palette, label: "Color", keys: ["color", "rack color", "color theme"] },
]

function getSpecs(p) {
  const map = {}
  for (const [k, v] of Object.entries(p.specs || {})) map[norm(k)] = v

  const found = []
  for (const { icon, label, keys } of SPEC_CANDIDATES) {
    const key = keys.find((k) => map[k] !== undefined && map[k] !== null && String(map[k]).trim() !== "")
    if (key) found.push({ icon, label, value: String(map[key]).trim() })
    if (found.length === 2) break
  }
  return found
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
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(featured[0]?.id ?? "")
  const [settled, setSettled] = useState(false)
  const variants = reduce ? flat : drop
  const state = inView || reduce ? "show" : "hidden"
  const rows = [featured.slice(0, 4), featured.slice(4, 8)].filter((row) => row.length > 0)
  const last = featured.length - 1

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
            <div className="relative mb-[30px] grid grid-cols-[repeat(4,1fr)] gap-[22px] pb-3.5 max-[960px]:grid-cols-[1fr_1fr] max-[540px]:grid-cols-[1fr]" key={r}>
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
                const price = "View more"
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
  <div className="absolute -bottom-9 left-3.5 right-3.5 grid grid-cols-[repeat(2,minmax(0,1fr))] items-center overflow-hidden rounded-2xl bg-white px-2 py-3 shadow-[0_6px_20px_rgba(15,40,90,0.12)]">
    {specs.map(({ icon: Icon, value, label }, i) => (
      <div
        key={label}
        title={`${label}: ${value}`}
        className={`flex min-w-0 items-center justify-center gap-2 px-1 ${i > 0 ? "border-l border-solid border-slate-200" : ""}`}
      >
        <Icon className="h-[22px] w-[22px] shrink-0" style={{ color: NAVY }} />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[0.82rem] font-bold" style={{ color: NAVY }}>{value}</p>
          <p className="truncate text-[0.68rem] text-slate-500">{label}</p>
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

                        <div className="mt-auto flex items-center gap-2.5 pt-4">
                          <span
                            className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-slate-100 px-4 text-[0.9rem] font-bold"
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
                            className="grid h-[48px] w-[48px] shrink-0 cursor-pointer place-items-center rounded-full bg-[#25D366] text-white shadow-[0_6px_14px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-110"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.23 8.21z" />
                            </svg>
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