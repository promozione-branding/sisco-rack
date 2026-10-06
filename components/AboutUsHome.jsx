"use client"

import { motion, useReducedMotion } from "framer-motion"

const NAVY = "#0b2a5b"
const BLUE = "#0f4aa8"
const AMBER = "#f5a623"

export default function AboutUsHome({
  titlePlain,
  titleHighlight,
  paragraphs = [],
  image,
  imageAlt = "",
  headingTag: Heading = "h1",
  reverse = false, // set true to put the image on the right
}) {
  const reduce = useReducedMotion()
  const dir = reverse ? -1 : 1

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
      <div
        className={`mx-auto grid max-w-full items-center gap-16 px-14 max-[1100px]:grid-cols-1 max-[1100px]:gap-12 max-[960px]:px-10 max-[720px]:px-5 ${
          reverse ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-[0.9fr_1.1fr]"
        }`}
      >
        <motion.div
          className={`relative mx-auto w-full max-w-[560px] max-[1100px]:max-w-[640px] ${
            reverse ? "order-2 max-[1100px]:order-none" : ""
          }`}
          {...reveal(-40 * dir)}
        >
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
              src={image}
              alt={imageAlt}
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div {...reveal(40 * dir, 0.1)}>
          <Heading
            className="text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold leading-[1.1] tracking-tight"
            style={{ color: NAVY }}
          >
            {titlePlain}
            {titlePlain && titleHighlight ? " " : null}
            {titleHighlight && <span style={{ color: BLUE }}>{titleHighlight}</span>}
          </Heading>
          <span className="mt-5 block h-[4px] w-24 rounded-full" style={{ background: AMBER }} />

          <div className="mt-7 grid gap-4">
            {paragraphs.map((text, i) => (
              <p key={`${i}-${text.slice(0, 24)}`} className="text-[1.02rem] leading-[1.75] text-slate-600">
                {text}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}