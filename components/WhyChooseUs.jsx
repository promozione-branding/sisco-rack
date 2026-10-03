"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { reasons } from "@/lib/data"

const NAVY = "#0b1a40"
const YELLOW = "#f5b800"

// One headline figure per reason, same order as `reasons`.
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

const FRAME =
  "overflow-hidden rounded-tl-[72px] rounded-br-[72px] rounded-tr-[20px] rounded-bl-[20px] max-[720px]:rounded-tl-[44px] max-[720px]:rounded-br-[44px]"

const slide = {
  enter: (dir) => ({ y: dir > 0 ? "100%" : "-100%" }),
  center: { y: 0 },
  exit: (dir) => ({ y: dir > 0 ? "-100%" : "100%" }),
}

export default function WhyChooseUs() {
  const items = reasons.slice(0, 4)
  const [view, setView] = useState({ index: 0, dir: 1 })
  const rowRefs = useRef([])

  // Whichever row crosses the middle of the screen becomes active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number(entry.target.dataset.index)
          setView((v) => (v.index === idx ? v : { index: idx, dir: idx > v.index ? 1 : -1 }))
        })
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    rowRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-white py-20 max-[720px]:py-12">
        <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
          <div className="grid grid-cols-[5fr_7fr] gap-16 max-[960px]:grid-cols-[1fr] max-[960px]:gap-10">
            {/* Left: heading, intro and sliding image (sticky on desktop) */}
            <div className="min-[961px]:sticky min-[961px]:top-24 min-[961px]:self-start">
              <span aria-hidden="true" className="mb-5 block h-1 w-14" style={{ background: YELLOW }} />
              <h2
                className="font-display text-[3.2rem] font-extrabold leading-[1.05] tracking-tight max-[720px]:text-[2.4rem]"
                style={{ color: NAVY }}
              >
                Why choose Sisco
              </h2>
              <p className="mt-5 max-w-[30rem] text-[1.1rem] leading-[1.65] text-[#4b5469]">
                We make the steel, test it, ship it and fit it. Fewer hand-offs
                mean fewer surprises on install day.
              </p>

              <motion.div
                className="relative mt-8 max-[960px]:hidden"
                initial={{ opacity: 0, x: -56 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`relative h-[clamp(220px,40vh,380px)] w-full bg-[#dfe3ea] shadow-[0_24px_50px_-20px_rgba(11,26,64,0.45)] ${FRAME}`}
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
                      <Image
                        src={images[view.index]}
                        alt={items[view.index]?.title ?? ""}
                        fill
                        sizes="(min-width: 961px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <span
                  className="absolute -bottom-3 left-8 rounded-full px-4 py-1.5 font-display text-[0.95rem] font-bold tracking-wide"
                  style={{ background: YELLOW, color: NAVY }}
                >
                  {String(view.index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </motion.div>
            </div>

            {/* Right: rows. The row in the middle of the screen lifts up */}
            <ol className="flex flex-col max-[960px]:gap-4">
              {items.map((r, i) => (
                <li
                  key={r.title}
                  ref={(el) => (rowRefs.current[i] = el)}
                  data-index={i}
                  className="flex items-center min-[961px]:min-h-[34vh]"
                >
                <div
                  data-active={view.index === i}
                  className="grid w-full grid-cols-[3rem_1fr_auto] items-center gap-x-6 gap-y-2 rounded-2xl border-l-4 border-transparent bg-[#f4f5f8] px-7 py-5 transition-all duration-500 ease-out max-[720px]:grid-cols-[2.2rem_1fr] max-[720px]:gap-x-3 max-[720px]:px-5 max-[720px]:py-5 min-[961px]:data-[active=true]:-translate-y-2 min-[961px]:data-[active=true]:border-[#f5b800] min-[961px]:data-[active=true]:bg-white min-[961px]:data-[active=true]:shadow-[0_22px_40px_-18px_rgba(11,26,64,0.4)]"
                >
                  <span className="font-display text-[1.05rem] font-bold text-[#9aa3b5]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    {/* Mobile: each row carries its own image */}
                    <div className={`relative mb-4 h-44 w-full min-[961px]:hidden ${FRAME}`}>
                      <Image
                        src={images[i]}
                        alt={r.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>

                    <h3
                      className="font-display text-[1.5rem] font-bold leading-tight max-[720px]:text-[1.3rem]"
                      style={{ color: NAVY }}
                    >
                      {r.title}
                    </h3>
                    <p className="mt-1 max-w-[44ch] text-[0.95rem] leading-[1.5] text-[#4b5469]">
                      {r.text}
                    </p>
                  </div>

                  <div className="min-w-[7.5rem] text-right max-[720px]:col-start-2 max-[720px]:text-left">
                    <div
                      className="font-display text-[2rem] font-extrabold leading-none max-[720px]:text-[1.7rem]"
                      style={{ color: NAVY }}
                    >
                      {figures[i]?.value}
                    </div>
                    <div
                      className="mt-1.5 inline-block border-t-2 pt-1 text-[0.85rem] font-medium text-[#4b5469]"
                      style={{ borderColor: YELLOW }}
                    >
                      {figures[i]?.label}
                    </div>
                  </div>
                </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}