"use client"

import { motion, useReducedMotion } from "framer-motion"

const ABOUT_IMG = "about_bg.png"

const NAVY = "#0b2a5b"
const BLUE = "#0f4aa8"
const AMBER = "#f5a623"

const paragraphs = [
  "Sisco Steel Products started in 2015. Our main product is Slotted Angle Racks. We also offer other storage items at prices many buyers can afford. You might spot our racks in factories, retail spaces, offices, and warehouses.",
  "Our workshop does not focus on just one type of rack. Slotted Angle Racks make up a large share of our work. We also produce Supermarket Racks. Other items we handle include Mezzanine Floors and Heavy-Duty Racks.",
  "We take quality seriously. The steel must last, even with regular use. Each unit is checked to see how it holds up day to day. The goal is straightforward. Put more items into less space. We review each order as it moves along so it fits our stated requirements.",
  "Sisco Steel Products wants customers to keep coming back. We work to reduce problems that can show up early. Our prices stay fair. Many customers rely on us for storage solutions and steel products. They see that we care about the build quality and also the help we provide after purchase.",
]

export default function AboutUsHome() {
  const reduce = useReducedMotion()

  const reveal = (x, delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, x },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.7, delay, ease: "easeOut" },
        }

  return (
    <section className="bg-slate-50 py-16 max-[720px]:py-10">
      <div className="mx-auto grid max-w-full grid-cols-[0.9fr_1.1fr] items-center gap-16 px-14 max-[1100px]:grid-cols-1 max-[1100px]:gap-12 max-[960px]:px-10 max-[720px]:px-5">
        <motion.div className="relative mx-auto w-full max-w-[560px] max-[1100px]:max-w-[640px]" {...reveal(-40)}>
          <span
            className="absolute -bottom-4 -left-4 h-full w-full rounded-[32px]"
            style={{ background: AMBER }}
            aria-hidden="true"
          />
          <div
            className="absolute -right-5 -top-5 h-28 w-28 rounded-[28px] opacity-90"
            style={{ background: NAVY }}
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-slate-200 shadow-[0_18px_50px_rgba(15,40,90,0.20)] max-[720px]:aspect-[4/3]">
            <img
              className="block h-full w-full object-cover object-center"
              src={ABOUT_IMG}
              alt="Slotted angle racks manufactured by Sisco Steel Products"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div {...reveal(40, 0.1)}>
          <h1
            className="text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold leading-[1.1] tracking-tight"
            style={{ color: NAVY }}
          >
            Slotted Angle Rack{" "}
            <span style={{ color: BLUE }}>Manufacturer in India</span>
          </h1>
          <span className="mt-5 block h-[4px] w-24 rounded-full" style={{ background: AMBER }} />

          <div className="mt-7 grid gap-4">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="text-[1.02rem] leading-[1.75] text-slate-600">
                {text}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}