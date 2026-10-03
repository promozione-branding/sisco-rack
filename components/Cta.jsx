"use client"

import { motion, MotionConfig } from "framer-motion"
import SplitButton from "./SplitButton"

const BAR_LINK = "text-white/90 transition-[color] duration-200 hover:text-safety"

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function CTA() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate mt-[50px] flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-[#1a1f24] text-center text-white">
        <div className="absolute inset-0 -z-[2] scale-[1.04] bg-[url('/about_bg.png')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
        <div className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(18,22,28,0.55)_0%,rgb(68_83_102/72%)_45%,rgb(68_89_123/88%)_100%_100%)]" aria-hidden="true" />

        <div className="relative z-[1] max-w-[920px] px-6 max-[720px]:px-[18px] max-[720px]:pb-[90px] max-[720px]:pt-[100px]">
          <motion.h1
            className="text-[length:clamp(2.6rem,6.5vw,4.6rem)] leading-[1.08] tracking-[-0.01em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] max-[720px]:text-[length:clamp(2.2rem,8vw,3.2rem)]"
            variants={rise}
            initial="hidden"
            animate="show"
            custom={0}
          >
            Build Stronger Floors
            <br />
            <span className="block">with Industrial Racking Systems</span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-9 mt-[22px] max-w-[52ch] text-[1.1rem] leading-[1.55] text-white/[0.88] max-[720px]:mb-7 max-[720px]:text-[1rem]"
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
          >
            Get expert guidance on the right pallet racking, cantilever and
            mezzanine solutions for your warehouse, factory or distribution centre.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3.5"
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
          >

            <a
              href="https://wa.me/919650167709"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md border-[1.5px] border-solid border-white/55 bg-[rgba(25,139,25,0.55)] px-[26px] py-3.5 text-[0.98rem] font-semibold text-white backdrop-blur-[6px] [transition:background_0.22s,border-color_0.22s,transform_0.18s] hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.12] max-[720px]:w-full max-[720px]:max-w-[280px] max-[720px]:justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp Us
            </a>

           <SplitButton href="/contact" dark>Get a quote</SplitButton>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-x-[18px] gap-y-2.5 border-t border-solid border-white/[0.18] bg-[#253970] px-5 py-[18px] text-[0.9rem] font-medium text-white/[0.78] backdrop-blur-[8px] max-[720px]:gap-x-3 max-[720px]:gap-y-1.5 max-[720px]:px-4 max-[720px]:py-3.5 max-[720px]:text-[0.82rem]"
          variants={rise}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <a className={BAR_LINK} href="tel:+919650167709">+91 96501 67709</a>
          <span className="select-none opacity-[0.45]">|</span>
          <a className={BAR_LINK} href="mailto:hello@yourracks.com">hello@yourracks.com</a>
          <span className="select-none opacity-[0.45]">|</span>
          <span>Sisco Racks</span>
        </motion.div>
      </section>
    </MotionConfig>
  )
}