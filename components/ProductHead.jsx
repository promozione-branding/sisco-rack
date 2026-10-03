"use client"

import { motion } from "framer-motion"
import ShelfCrew from "./ShelfCrew"

export default function ProductHead({ title, text }) {
  return (
    <section className="relative isolate overflow-hidden border-2 border-solid border-ink bg-[linear-gradient(165deg,#c9eaf2_0%,#dbe3fa_40%,#f6f8f9_100%)] pb-10 pt-[124px] before:absolute before:inset-0 before:-z-[1] before:content-[''] before:bg-[repeating-linear-gradient(0deg,rgba(62,92,118,0.14)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(62,92,118,0.1)_0_1px,transparent_1px_7px)] before:[mask-image:linear-gradient(170deg,#000_0%,transparent_70%)] max-[960px]:mx-3 max-[960px]:mt-2.5 max-[960px]:rounded-[28px] max-[960px]:pb-8 max-[960px]:pt-[104px]">
        <ShelfCrew/>
      <div className="relative z-[1] mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
        <motion.h1 className="mt-3.5 max-w-[16ch] text-[length:clamp(3rem,7vw,5.4rem)]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {title}
        </motion.h1>
        <p className="max-w-[46ch] text-[1.15rem] text-muted">{text}</p>
      </div>
    </section>
  )
}
