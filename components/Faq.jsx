"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { faqs } from "@/lib/data"

const IMAGE_SRC = "/testimonial_5.png"

const waveMask = (d) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='0'><stop offset='0.86' stop-color='#000'/><stop offset='1' stop-color='#000' stop-opacity='0'/></linearGradient></defs><path d='${d}' fill='url(#g)'/></svg>`
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  return {
    WebkitMaskImage: url,
    maskImage: url,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }
}

const PHOTO_WAVE = "M0 77 C22 77 40 74 52 70 C60 66 64 47 70 31 C74 16 82 9 92 9 L100 9 L100 100 L0 100 Z"
const BLOB_WAVE = "M0 71 C22 71 40 68 51 63 C59 58 63 39 69 23 C73 9 81 3 92 3 L100 3 L100 100 L0 100 Z"

function PlusMinusIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10" stroke="#10204f" strokeWidth="2" strokeLinecap="round" />
      <motion.path
        d="M8 3v10"
        stroke="#10204f"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{ opacity: open ? 0 : 1, rotate: open ? 90 : 0 }}
        style={{ originX: "8px", originY: "8px" }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-12 max-[720px]:py-10">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="relative grid grid-cols-[0.95fr_1.05fr] gap-6 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#f6f8fb] via-[#f1f4f9] to-[#eef2f8] p-4 shadow-[0_20px_60px_-20px_rgba(16,32,79,0.25)] max-[960px]:grid-cols-1 max-[720px]:rounded-[28px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[36%] top-8 h-36 w-44 opacity-60 [background-image:radial-gradient(#c5cfe0_1.5px,transparent_1.5px)] [background-size:16px_16px] max-[960px]:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-24 left-4 h-32 w-28 opacity-50 [background-image:radial-gradient(#c5cfe0_1.5px,transparent_1.5px)] [background-size:14px_14px] max-[960px]:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[54%] bg-[#e3eaf5] max-[960px]:hidden"
            style={waveMask(BLOB_WAVE)}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[54%] bg-cover bg-bottom bg-no-repeat max-[960px]:hidden"
            style={{ backgroundImage: `url(${IMAGE_SRC})`, ...waveMask(PHOTO_WAVE) }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[37%] top-[3%] h-[340px] w-[340px] -rotate-[18deg] rounded-full border-[6px] border-transparent border-t-[#f9c31c]/80 border-r-[#f9c31c]/30 max-[960px]:hidden"
          />
          <div className="relative z-10 flex flex-col px-6 pb-10 pt-6 max-[960px]:pb-6 max-[720px]:px-3">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-3 rounded-full bg-[#e9edf4] py-2 pl-2.5 pr-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f9c31c] text-[0.95rem] font-extrabold text-[#10204f]">
                  ?
                </span>
                <span className="text-[0.8rem] font-bold tracking-[0.25em] text-[#3b4a6b]">FAQS</span>
              </span>
              <span className="relative h-px w-44 bg-[#d5dce8] max-[720px]:w-24">
                <span className="absolute left-0 top-0 h-px w-[58%] bg-[#10204f]" />
              </span>
            </div>

            <h2 className="mt-8 text-[3.6rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-[#10246b] max-[720px]:text-[2.6rem]">
              Questions
              <br />
              <span className="text-[#141b2d]">before you order</span>
            </h2>

            <p className="mt-6 max-w-[32ch] text-[1.3rem] leading-snug text-[#4b5568]">
              Cannot find your answer? Our team replies within one working day.
            </p>

            <a
              href="/contact"
              className="mt-8 inline-flex w-fit items-center gap-6 rounded-full bg-[#f9b81c] py-2 pl-8 pr-2 text-[1.05rem] font-bold text-[#141b2d] shadow-[0_10px_24px_-8px_rgba(249,184,28,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10204f]"
            >
              Get in touch
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#141b2d] text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <div className="min-h-[300px] max-[960px]:hidden" />
          </div>
          <div className="relative z-10 rounded-[28px] bg-white/70 p-4 shadow-[0_10px_40px_-20px_rgba(16,32,79,0.2)] backdrop-blur-sm max-[720px]:p-2.5">
            <div className="flex flex-col gap-3">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <div
                    key={f.q}
                    className={`rounded-[26px] border transition-colors duration-300 ${
                      isOpen
                        ? "border-[#d3def0] bg-[#e9f0fb] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"
                        : "border-[#e6ebf3] bg-white hover:border-[#d3def0]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full cursor-pointer items-center gap-6 rounded-[26px] border-none bg-transparent px-[18px] py-[18px] text-left [font-family:inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10204f] max-[720px]:gap-3 max-[720px]:px-3"
                    >
                      <span
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-[1.05rem] font-bold transition-colors duration-300 max-[720px]:h-11 max-[720px]:w-11 ${
                          isOpen ? "bg-[#10246b] text-white" : "bg-[#e6e9ef] text-[#141b2d]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[1.3rem] font-bold leading-tight text-[#10246b] max-[720px]:text-[1.05rem]">
                        {f.q}
                      </span>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f9c31c] max-[720px]:h-10 max-[720px]:w-10">
                        <PlusMinusIcon open={isOpen} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          role="region"
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <p className="pb-6 pl-[calc(18px+3.5rem+1.5rem)] pr-16 text-[1.08rem] leading-[1.65] text-[#5b6578] max-[720px]:pl-[calc(12px+2.75rem+0.75rem)] max-[720px]:pr-4 max-[720px]:text-[0.98rem]">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}