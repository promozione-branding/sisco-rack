"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { industries } from "@/lib/industries"
import SplitButton from "./SplitButton"


const paths = {
  design: (
    <>
      <path d="M4 20l4-1 10-10-3-3L5 16l-1 4z" />
      <path d="M13 7l3 3" />
    </>
  ),
  install: <path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z" />,
  test: (
    <>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16l4-5" />
    </>
  ),
  fab: (
    <>
      <rect x="4" y="8" width="16" height="10" rx="2" />
      <path d="M8 8V5h8v3" />
    </>
  ),
  mezz: (
    <>
      <path d="M12 4l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16l8 4 8-4" />
    </>
  ),
  maint: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  move: <path d="M4 8h13l-3-3M20 16H7l3 3" />
}

const Icon = ({ name }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths[name]}
  </svg>
)


const Arrow = ({ flip }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const NAV_BTN = "grid h-[46px] w-[46px] cursor-pointer place-items-center rounded-circle border-2 border-solid border-ink bg-transparent text-ink transition-[background,color,opacity] duration-[180ms] ease-out hover:enabled:bg-ink hover:enabled:text-white disabled:cursor-default disabled:opacity-30"

const item = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: Math.min(i, 4) * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
}

const still = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1 }
}

export default function Categories() {
  const track = useRef(null)
  const panel = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })
  const inView = useInView(panel, { once: true, amount: 0.25 })
  const reduce = useReducedMotion()
  const [can, setCan] = useState({ prev: false, next: true })
  const state = inView || reduce ? "show" : "hidden"
const paused = useRef(false)
const lastManual = useRef(0)
const visible = useInView(panel, { amount: 0.3 })

  const measure = () => {
    const el = track.current
    if (!el) return
    setCan({
      prev: el.scrollLeft > 4,
      next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4
    })
  }

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const step = (dir) => {
    const el = track.current
    const card = el.firstElementChild
    const gap = 18
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" })
  }

useEffect(() => {
  if (reduce || !visible) return
  const id = setInterval(() => {
    const el = track.current
    if (!el || paused.current || drag.current.down) return
    if (Date.now() - lastManual.current < 5000) return
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" })
    else step(1)
  }, 2200)
  return () => clearInterval(id)
}, [reduce, visible])


  const onDown = (e) => {
    if (e.pointerType !== "mouse") return
    const el = track.current
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false }
    el.dataset.dragging = "true"
  }

  const onMove = (e) => {
    const d = drag.current
    if (!d.down) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 5) d.moved = true
    track.current.scrollLeft = d.left - dx
  }

  const end = () => {
    if (!drag.current.down) return
    drag.current.down = false
    delete track.current.dataset.dragging
  }

  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <section className="py-12 max-[720px]:py-10 bg-white">
      <div className="mb-11 text-center min-[961px]:mb-[18px]">
        <motion.span
          className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Categories
        </motion.span>
        <h2 className="mt-3.5 min-[961px]:mt-2 min-[961px]:text-[length:clamp(1.8rem,3.4vw,2.8rem)]">
            Explore our <span className="text-blue"> Categories</span>
          </h2>
       <p className="mx-auto mt-[18px] max-w-[60ch] text-[1rem] text-muted min-[961px]:mt-2 min-[961px]:text-[0.92rem]">
            Our wide range of categories built on trust and premium quality.
          </p>
      </div>

      <div className="relative isolate mx-11 overflow-hidden rounded-[36px] border-2 border-solid border-ink bg-[linear-gradient(90deg,#434c54_10%,#e2e2e2_30%)] max-[960px]:mx-3 max-[960px]:rounded-[28px] max-[960px]:bg-none max-[960px]:bg-panel">
        <div className="absolute bottom-0 left-0 top-0 -z-[1] flex w-[33%] items-center justify-center bg-[linear-gradient(90deg,#ca8a04_0%,#374151_100%)] [mask-image:linear-gradient(90deg,#000_55%,transparent_100%)] max-[960px]:h-[300px]" aria-hidden="true">
          <img src="/leftslide2.jpg" alt="" />
        </div>
        <div className="min-w-0 pb-[30px] pl-[32%] pr-10 pt-9 max-[960px]:px-5 max-[960px]:pb-9 max-[960px]:pt-[190px]">
          <div
  className="mt-9 overflow-hidden rounded-[28px] border border-solid border-line bg-white/60 backdrop-blur-[10px] min-[961px]:mt-[18px]"
  ref={panel}
  onMouseEnter={() => { paused.current = true }}
  onMouseLeave={() => { paused.current = false }}
  onFocusCapture={() => { paused.current = true }}
  onBlurCapture={() => { paused.current = false }}
  onTouchStart={() => { paused.current = true }}
  onTouchEnd={() => { setTimeout(() => { paused.current = false }, 2500) }}
>
            <div
              className="flex cursor-grab snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-p-[22px] p-[22px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden data-[dragging]:cursor-grabbing data-[dragging]:snap-none"
              ref={track}
              onScroll={measure}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={end}
              onPointerLeave={end}
              onClickCapture={onClickCapture}
            >
              {industries.map((s, i) => (
                <motion.div
                  key={s.id}
                  className="flex-[0_0_min(320px,78%)] snap-start"
                  variants={reduce ? still : item}
                  custom={i}
                  initial="hidden"
                  animate={state}
                >
                 <Link
  href="/products"
  className="group/card block h-full select-none rounded-[20px] border border-solid border-line bg-[#e3e8ec] px-2 pb-[18px] pt-2 shadow-lift transition-[transform,box-shadow,border-color] duration-[180ms] ease-out hover:-translate-y-1.5 hover:border-safety hover:shadow-lift-hover"
  draggable={false}
>
  {/* Taller image */}
  <div className="h-[260px] overflow-hidden rounded-[14px] border-b-[3px] border-solid border-safety bg-[linear-gradient(135deg,#c5ced5,#e9edf0)]">
    <img
      className="pointer-events-none block h-full w-full object-fill transition-transform duration-[250ms] ease-out group-hover/card:scale-[1.06]"
      src={s.image}
      alt={s.title}
      draggable={false}
      loading="lazy"
    />
  </div>

  {/* Icon badge (left-aligned so it doesn't clash with the left text) */}
  <span className="relative z-[2] -mt-[27px] mb-2 ml-4 grid h-[54px] w-[54px] place-items-center rounded-circle border-4 border-solid border-white bg-safety text-ink">
    <Icon name={s.icon} />
  </span>

  {/* Text left, arrow right */}
  <div className="flex items-end justify-between gap-3 px-3 text-left">
    <div className="min-w-0 flex-1">
      <h3 className="font-body text-[1rem] font-bold leading-[1.3] tracking-normal">{s.title}</h3>
      <p className="mt-1.5 line-clamp-2 text-[0.84rem] leading-[1.5] text-muted-2">{s.text}</p>
    </div>
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-circle border border-solid border-line bg-white text-ink transition-[background] duration-[180ms] ease-out group-hover/card:border-safety group-hover/card:bg-safety"
      aria-hidden="true"
    >
      <Arrow />
    </span>
  </div>
</Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-[30px] flex flex-wrap items-center justify-between gap-6 min-[961px]:mt-4">
            <p className="max-w-[44ch] text-[0.92rem] text-muted">From design and fabrication to installation and inspection, we deliver reliable racking services built to improve efficiency and safety.</p>
            <div className="flex items-center gap-2.5">
            <button className={NAV_BTN} onClick={() => { lastManual.current = Date.now(); step(-1) }} disabled={!can.prev} aria-label="Previous category">
  <Arrow flip />
</button>
<button className={NAV_BTN} onClick={() => { lastManual.current = Date.now(); step(1) }} disabled={!can.next} aria-label="Next category">
  <Arrow />
</button>
              <SplitButton href="/products" dark className="ml-1.5">View all Categories</SplitButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}