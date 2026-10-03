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
                    <div className={`h-[360px] rounded-[20px] border border-solid px-2 pb-3.5 pt-2 shadow-lift transition-[transform,box-shadow,background,color,border-color] duration-[180ms] ease-out group-hover/card:-translate-y-1.5 group-hover/card:shadow-lift-hover ${active === p.id ? "border-navy bg-navy text-white" : "border-line bg-[linear-gradient(to_bottom,#e3e8ec_0,#e3e8ec_258px,#e3e8ec_258px,#e3e8ec_100%)]"}`}>
                      <Link href={`/products/${p.slug || p.id}`} className="block" tabIndex={settled ? 0 : -1}>
                        <div className="h-[250px] overflow-hidden rounded-[14px] border-b-[3px] border-solid border-safety bg-bg">
                          <img className="block h-full w-full object-fill transition-transform duration-[250ms] ease-out group-hover/card:scale-[1.07]" src={p.image} alt={p.name} loading="lazy" />
                        </div>
                        <div className="grid grid-cols-[1fr_34px] items-end gap-2.5 px-2 pt-[22px]">
                          <div>
                            <h3 className="font-body text-[1rem] font-bold leading-[1.3] tracking-normal">{p.name}</h3>
                            <p className={`mt-1 text-[0.82rem] leading-[1.45] ${active === p.id ? "text-mist" : "text-muted-2"}`}>
                              {short}
                              {needsMore && (
                                <span> Read more</span>
                              )}
                            </p>
                          </div>
                          <span className={`grid h-[34px] w-[34px] place-items-center rounded-circle border border-solid bg-white text-ink transition-[background,transform] duration-[180ms] ease-out group-hover/card:translate-x-[3px] ${active === p.id ? "border-white" : "border-line"}`} aria-hidden="true">
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