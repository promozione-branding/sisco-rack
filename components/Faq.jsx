"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { faqs } from "@/lib/data"

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-12 max-[720px]:py-10">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5 grid grid-cols-[0.8fr_1.2fr] gap-10">
        <div>
          <h2 className="text-[#253970]">Questions before you order</h2>
          <p className="mt-5 max-w-[46ch] text-[1.15rem] text-muted">Cannot find your answer? Our team replies within one working day.</p>
        </div>
        <div>
          {faqs.map((f, i) => (
            <div className="border-b-2 border-solid border-ink" key={f.q}>
              <button className="flex w-full cursor-pointer justify-between gap-5 border-none bg-transparent py-3.5 text-left text-[1.02rem] font-semibold leading-[inherit] text-inherit [font-family:inherit]" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {f.q}
                <motion.span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[10px] border-2 border-solid border-ink bg-safety font-bold" animate={{ rotate: open === i ? 45 : 0 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="max-w-[60ch] pb-3.5 text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
