"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "framer-motion"
import { reasons } from "@/lib/data"

const NAVY = "#0b1a40"
const YELLOW = "#f5b800"

const figures = [
  { value: "1.5×", label: "rated load tested" },
  { value: "Custom", label: "bays and aisles" },
  { value: "Days", label: "not weeks" },
  { value: "10 yr", label: "frame warranty" },
]

const images = [
  "/load-test.jpg",
  "/hero.jpg",
  "/installation.jpg",
  "/warranty.jpeg",
]

const icons = [
  <>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </>,
  <>
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
    <path d="m14.5 12.5 2-2" />
    <path d="m11.5 9.5 2-2" />
    <path d="m8.5 6.5 2-2" />
    <path d="m17.5 15.5 2-2" />
  </>,
  <>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </>,
  // shield-check: warranty
  <>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </>,
]

const FRAME =
  "overflow-hidden rounded-tl-[72px] rounded-br-[72px] rounded-tr-[20px] rounded-bl-[20px] max-[720px]:rounded-tl-[44px] max-[720px]:rounded-br-[44px]"

const slide = {
  enter: (dir) => ({ y: dir > 0 ? "100%" : "-100%" }),
  center: { y: 0 },
  exit: (dir) => ({ y: dir > 0 ? "-100%" : "100%" }),
}

const cardSlide = {
  enter: (dir) => ({ y: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir > 0 ? -120 : 120, opacity: 0 }),
}

function Icon({ i }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-9 w-9 max-[720px]:h-6 max-[720px]:w-6"
    >
      {icons[i]}
    </svg>
  )
}

export default function WhyChooseUs() {
  const items = reasons.slice(0, 4)
  const [view, setView] = useState({ index: 0, dir: 1 })
  const sectionRef = useRef(null)

  // Desktop: the section is tall and its inner stage is pinned. Scroll progress
  // through the section decides which reason is showing.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // 0 -> 1 progress *within* the current reason, so things keep moving between snaps
  const n = items.length
  const local = useTransform(scrollYProgress, (p) => {
    const x = Math.min(Math.max(p, 0) * n, n - 0.0001)
    return x - Math.floor(x)
  })
  const cardY = useTransform(local, [0, 1], [28, -28])
  const imgY = useTransform(local, [0, 1], [-18, 18])
  const barWidth = useTransform(local, (v) => `${v * 100}%`)

  useEffect(() => {
    const update = (p) => {
      const idx = Math.max(0, Math.min(items.length - 1, Math.floor(p * items.length)))
      setView((v) => (v.index === idx ? v : { index: idx, dir: idx > v.index ? 1 : -1 }))
    }
    update(scrollYProgress.get())
    return scrollYProgress.on("change", update)
  }, [scrollYProgress, items.length])

  const heading = (
    <>
      <span aria-hidden="true" className="mb-5 block h-1 w-14" style={{ background: YELLOW }} />
      <h2
        className="font-display text-[3.2rem] font-extrabold leading-[1.05] tracking-tight max-[720px]:text-[2.4rem]"
        style={{ color: NAVY }}
      >
        Why Choose Sisco Steel Products
      </h2>
      <p className="mt-5 max-w-[30rem] text-[1.1rem] leading-[1.65] text-[#4b5469]">
        As a trusted Slotted Angle Rack Manufacturer, Sisco Steel Products focuses on quality manufacturing, durable products, and reliable service to meet diverse storage requirements.
      </p>
    </>
  )

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        style={{ "--h": `${100 + items.length * 70}vh` }}
        className="bg-white max-[960px]:py-12 min-[961px]:h-[var(--h)]"
      >
        <div className="sticky top-0 flex h-screen items-center max-[960px]:hidden">
          <div className="mx-auto w-full max-w-full px-14">
            <div className="grid grid-cols-[5fr_7fr] grid-rows-[auto_auto] gap-x-16 gap-y-8">
              <div className="col-start-1 row-start-1">{heading}</div>

              <div className="relative col-start-1 row-start-2">
                <div
                  className={`relative h-[clamp(320px,56vh,540px)] w-full bg-[#dfe3ea] shadow-[0_24px_50px_-20px_rgba(11,26,64,0.45)] ${FRAME}`}
                >
                  <AnimatePresence initial={false} custom={view.dir}>
                    <motion.div
                      key={view.index}
                      className="absolute inset-0"
                      custom={view.dir}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div className="absolute inset-0" style={{ y: imgY, scale: 1.14 }}>
                        <Image
                          src={images[view.index]}
                          alt={items[view.index]?.title ?? ""}
                          fill
                          sizes="40vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <span
                  className="absolute -bottom-3 left-8 rounded-full px-4 py-1.5 font-display text-[0.95rem] font-bold tracking-wide"
                  style={{ background: YELLOW, color: NAVY }}
                >
                  {String(view.index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>

              {/* Row 2, right: card, vertically centred on the image */}
              <div className="relative col-start-2 row-start-2 h-[clamp(320px,56vh,540px)] self-center">
                <motion.div className="absolute inset-0" style={{ y: cardY }}>
                <AnimatePresence initial={false} custom={view.dir}>
                  <motion.div
                    key={view.index}
                    custom={view.dir}
                    variants={cardSlide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-8 rounded-3xl border-l-[6px] border-[#f5b800] bg-[#253970] px-12 py-10 shadow-[0_26px_50px_-18px_rgba(11,26,64,0.6)]"
                  >
                    <span
                      className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl"
                      style={{ background: YELLOW, color: NAVY }}
                    >
                      <Icon i={view.index} />
                    </span>

                    <div>
                      <h3 className="font-display text-[2.4rem] font-bold leading-tight text-white">
                        {items[view.index]?.title}
                      </h3>
                      <p className="mt-3 max-w-[44ch] text-[1.3rem] leading-[1.55] text-[#c9d2e8]">
                        {items[view.index]?.text}
                      </p>
                    </div>

                    <div className="min-w-[9.5rem] text-right">
                      <div
                        className="font-display text-[3.6rem] font-extrabold leading-none"
                        style={{ color: YELLOW }}
                      >
                        {figures[view.index]?.value}
                      </div>
                      <div
                        className="mt-2 inline-block border-t-2 pt-1.5 text-[1.05rem] font-medium text-white"
                        style={{ borderColor: YELLOW }}
                      >
                        {figures[view.index]?.label}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                </motion.div>

                {/* Segment progress: fills as you scroll through each reason */}
                {/* <div className="absolute left-0 right-0 top-full mt-8 flex gap-3" aria-hidden="true">
                  {items.map((_, i) => (
                    <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e3e7f0]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: YELLOW,
                          width: i === view.index ? barWidth : i < view.index ? "100%" : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Tablet / mobile: simple stacked list ---------- */}
        <div className="mx-auto px-10 max-[720px]:px-5 min-[961px]:hidden">
          {heading}
          <ol className="mt-10 flex flex-col gap-4">
            {items.map((r, i) => (
              <li
                key={r.title}
                className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-2 rounded-3xl border-l-[6px] border-[#c9d4ee] bg-[#e9eefa] px-5 py-5"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: NAVY, color: YELLOW }}
                >
                  <Icon i={i} />
                </span>
                <div>
                  <div className={`relative mb-4 h-44 w-full ${FRAME}`}>
                    <Image src={images[i]} alt={r.title} fill sizes="100vw" className="object-cover" />
                  </div>
                  <h3 className="font-display text-[1.4rem] font-bold leading-tight" style={{ color: NAVY }}>
                    {r.title}
                  </h3>
                  <p className="mt-1 text-[0.95rem] leading-[1.5] text-[#3f4a66]">{r.text}</p>
                </div>
                <div className="col-start-2">
                  <div className="font-display text-[1.7rem] font-extrabold leading-none" style={{ color: NAVY }}>
                    {figures[i]?.value}
                  </div>
                  <div
                    className="mt-1.5 inline-block border-t-2 pt-1 text-[0.85rem] font-medium text-[#3f4a66]"
                    style={{ borderColor: YELLOW }}
                  >
                    {figures[i]?.label}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </MotionConfig>
  )
}