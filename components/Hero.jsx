"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SplitButton from "./SplitButton"
import QuoteModal from "./QuoteModal"
import { useState } from "react"

const line = (i) => ({
  initial: { opacity: 0, y: 46 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15 + i * 0.15 }
})

export default function Hero() {
   const [open, setOpen] = useState(false)
    const [drop, setDrop] = useState(false)
  const [quote, setQuote] = useState(false)
    const closeAll = () => {
      setOpen(false)
      setDrop(false)
    }
  const openQuote = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(false)
    setDrop(false)
    setQuote(true)
  }
  return (
    <section className="relative isolate flex h-[100svh] max-h-[860px] min-h-[560px] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(165deg,#c9eaf2_0%,#dbe3fa_32%,#f3f6fb_62%,#ffffff_82%)] px-6 pb-[124px] pt-[104px] text-center text-white before:absolute before:inset-0 before:-z-[1] before:content-[''] before:bg-[repeating-linear-gradient(0deg,rgba(62,92,118,0.16)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(62,92,118,0.12)_0_1px,transparent_1px_7px)] before:[mask-image:linear-gradient(170deg,#000_0%,rgba(0,0,0,0.5)_35%,transparent_70%)] max-[720px]:mx-3 max-[720px]:mt-2.5 max-[720px]:h-auto max-[720px]:max-h-none max-[720px]:min-h-[100svh] max-[720px]:rounded-[32px] max-[720px]:px-[18px] max-[720px]:pb-[120px] max-[720px]:pt-24">
      <div className="absolute inset-0 -z-[2] scale-[1.02] bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
      <div className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(162,174,192,0.55)_0%,rgba(56,61,67,0.72)_45%,rgb(181_181_181/88%)_100%_70%)]" aria-hidden="true" />

      <h2 className="text-[length:clamp(2.8rem,7.2vw,6rem)] leading-[0.92] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
        <motion.span className="block" {...line(0)}>Build storage faster</motion.span>
        <motion.span className="block" {...line(1)}>
          Load with <em className="font-normal tracking-normal text-[#f0b429]">confidence</em>
        </motion.span>
      </h2>

      <motion.div
        className="mt-7 flex flex-wrap justify-center gap-3.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClickCapture={openQuote}
      >
        <SplitButton href="/" dark>
          Get a quote
        </SplitButton>
        <Link href="/products" className="inline-block cursor-pointer rounded-[14px] border-2 border-solid border-white/70 bg-transparent px-7 py-3.5 text-[1rem] font-semibold text-white transition-[background,color] duration-[250ms] [font-family:inherit] hover:border-white hover:bg-white hover:text-ink">
          Browse products
        </Link>
      </motion.div>
            <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </section>
  )
}