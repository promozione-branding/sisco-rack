"use client"

import { useState } from "react"
import Link from "next/link"

import {
  Tag,
  Weight,
  Ruler,
  Layers,
  Paintbrush,
  List,
  Info,
  Palette,
  ArrowRight,
} from "lucide-react"

import { cardImg } from "@/lib/smImages"
import { handleWhatsappClick } from "@/lib/tracking"
import QuoteModal from "./QuoteModal"

const NAVY = "#0b2a5b"
const AMBER = "#f5a623"
const WHATSAPP_LINK = "https://walink.me/fskx3z"

const ICONS = { Tag, Weight, Ruler, Layers, Paintbrush, List, Info, Palette }

const openWhatsApp = (e, product) => {
  e.preventDefault()
  e.stopPropagation()

  handleWhatsappClick({ obj: product, source: "Website" })

  window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer")
}

const UP =
  "absolute bottom-0 top-0 w-5 origin-bottom bg-blue bg-[radial-gradient(circle,var(--panel)_3px,transparent_4px)] bg-[length:20px_28px] bg-[position:center_8px] max-[540px]:w-3.5 max-[540px]:bg-[length:14px_24px]"

export default function FeaturedProductsGrid({ products: featured = [] }) {
  const [active, setActive] = useState(featured[0]?.id ?? "")
  const [productquote, setProductquote] = useState(false)

  const rows = [
    featured.slice(0, 3),
    featured.slice(3, 6),
    featured.slice(6, 9),
  ].filter((row) => row.length > 0)

  const openQuote = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setProductquote(true)
  }

  return (
    <>
      <div
        className="relative overflow-hidden rounded-[32px]
         bg-white/55 px-[30px] pb-1 pt-[22px] max-[540px]:rounded-2xl max-[540px]:px-4 max-[540px]:pb-3 
         max-[540px]:pt-5 max-[960px]:px-12 max-[960px]:pb-3 max-[960px]:pt-8"
      >
        {/* Side bars (static) */}
        <span className={`${UP} left-4 max-[540px]:left-2`} />
        <span className={`${UP} right-4 max-[540px]:right-2`} />

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-0 min-[541px]:block max-[540px]:grid max-[540px]:grid-cols-2 
        max-[540px]:gap-3 max-[540px]:px-2 max-[540px]:pt-2">

          {rows.map((row, r) => (
            <div
              key={r}
              className="relative mb-[30px] grid grid-cols-1 gap-[22px] pb-3.5 min-[541px]:grid-cols-2 md:grid-cols-3 md:[&>article:nth-of-type(4)]:hidden max-[540px]:contents"
            >
              {/* Bottom bar (static) */}
              <i className="absolute -left-2.5 -right-2.5 bottom-0 h-3.5 rounded-lg border-2 border-solid border-ink bg-safety max-[540px]:hidden" />

              {row.map((p) => {
                const isActive = active === p.id

                return (
                  <article
                    key={p.id}
                    className="group/card relative z-[1] flex min-w-0 flex-col overflow-hidden rounded-[28px] bg-white max-[540px]:rounded-xl"
                    onMouseEnter={() => setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                  >
                    {/* Product Details Link */}
                    <Link
                      href={`/products/${p.slug}`}
                      className={`flex flex-1 flex-col overflow-hidden rounded-[28px] bg-white max-[540px]:rounded-xl ${
                        isActive
                          ? "shadow-[0_18px_40px_rgba(15,40,90,0.20)] ring-2 ring-[#f5a623]"
                          : "shadow-[0_10px_30px_rgba(15,40,90,0.10)]"
                      }`}
                    >
                      {/* Product Image */}
                      <div className="relative flex-none">
                        <div className="h-[250px] overflow-hidden bg-slate-100 max-[540px]:h-[135px]">
                          <img
                            className="block h-full w-full object-cover object-center"
                            {...cardImg(p.image)}
                            width={330}
                            height={250}
                            alt={p.name}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        {/* Product Specifications */}
                        {p.specs?.length > 0 && (
                          <div className="absolute -bottom-9 left-3.5 right-3.5 grid grid-cols-[repeat(2,minmax(0,1fr))] items-center overflow-hidden rounded-2xl bg-white px-2 py-3 shadow-[0_6px_20px_rgba(15,40,90,0.12)] max-[540px]:-bottom-6 max-[540px]:left-1.5 max-[540px]:right-1.5 max-[540px]:rounded-lg max-[540px]:px-1 max-[540px]:py-2">
                            {p.specs.map(({ icon, value, label }, idx) => {
                              const Icon = ICONS[icon]

                              return (
                                <div
                                  key={label}
                                  title={`${label}: ${value}`}
                                  className={`flex min-w-0 items-center justify-center gap-2 px-1 max-[540px]:gap-1 ${
                                    idx > 0 ? "border-l border-solid border-slate-200" : ""
                                  }`}
                                >
                                  {Icon && (
                                    <Icon
                                      className="h-[22px] w-[22px] shrink-0 max-[540px]:h-3.5 max-[540px]:w-3.5"
                                      style={{ color: NAVY }}
                                    />
                                  )}

                                  <div className="min-w-0 flex-1 leading-tight">
                                    <p
                                      className="truncate text-[0.82rem] font-bold max-[540px]:text-[0.62rem]"
                                      style={{ color: NAVY }}
                                    >
                                      {value}
                                    </p>
                                    <p className="truncate text-[0.68rem] text-slate-500 max-[540px]:text-[0.52rem]">
                                      {label}
                                    </p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>

                      {/* Product Content */}
                      <div className="flex flex-1 flex-col px-[18px] pb-[18px] pt-[44px] max-[540px]:px-2.5 max-[540px]:pb-2.5 max-[540px]:pt-5">
                        <span className="h-[3px] w-[28%] rounded-full" style={{ background: AMBER }} />

                        <h3
                          className="mt-3.5 font-body text-[1.05rem] font-extrabold leading-[1.3] tracking-normal max-[540px]:mt-2 max-[540px]:text-[0.78rem] max-[540px]:leading-[1.3]"
                          style={{ color: NAVY }}
                        >
                          {p.name}
                        </h3>

                        {/* Description: Desktop Only */}
                        <p className="mt-1 min-h-[4.2em] text-[0.84rem] leading-[1.45] text-slate-500 max-[540px]:hidden">
                          {p.short}
                          {p.needsMore && (
                            <span className="font-semibold" style={{ color: NAVY }}>
                              {" "}Read more
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="mt-auto flex items-center gap-2.5 px-[18px] pb-[18px] pt-4 max-[540px]:gap-1.5 max-[540px]:px-2 max-[540px]:pb-2 max-[540px]:pt-1">
                      <button
                        type="button"
                        onClick={openQuote}
                        className="flex h-[48px] flex-1 cursor-pointer items-center justify-center rounded-full border-0 bg-slate-100 px-4 text-[0.9rem] font-bold hover:bg-slate-200 max-[540px]:h-9 max-[540px]:px-1 max-[540px]:text-[0.65rem]"
                        style={{ color: NAVY, fontFamily: "inherit" }}
                      >
                        View more
                      </button>

                      <button
                        type="button"
                        aria-label={`Chat on WhatsApp about ${p.name}`}
                        title="Chat on WhatsApp"
                        onClick={(e) => openWhatsApp(e, p)}
                        className="grid h-[48px] w-[48px] shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-[#25D366] text-white shadow-[0_6px_14px_rgba(37,211,102,0.45)] max-[540px]:h-9 max-[540px]:w-9"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="max-[540px]:h-[18px] max-[540px]:w-[18px]"
                        >
                          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.23 8.21z" />
                        </svg>
                      </button>

                      <Link
                        href={`/products/${p.slug}`}
                        aria-label={`View ${p.name}`}
                        className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-full shadow-[0_6px_14px_rgba(245,166,35,0.45)] max-[540px]:h-9 max-[540px]:w-9"
                        style={{ background: AMBER, color: NAVY }}
                      >
                        <ArrowRight className="h-[18px] w-[18px] max-[540px]:h-4 max-[540px]:w-4" />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Get a Free Quote Popup */}
      <QuoteModal open={productquote} onClose={() => setProductquote(false)} />
    </>
  )
}