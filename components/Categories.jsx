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
    el.classList.add("dragging")
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
    track.current.classList.remove("dragging")
  }

  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <section className="section">
      <div className="cat-head">
        <motion.span
          className="cat-eyebrow"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Categories
        </motion.span>
        <h2>
            Explore our <span> Categories</span>
          </h2>
       <p className="lead">
            Our wide range of categories built on trust and premium quality.
          </p>
      </div>

      <div className="svc">
        <div className="svc-bg" aria-hidden="true">
          <img src="/leftslide2.jpg" alt="" />
        </div>
        <div className="svc-body">
          <div
  className="svc-panel"
  ref={panel}
  onMouseEnter={() => { paused.current = true }}
  onMouseLeave={() => { paused.current = false }}
  onFocusCapture={() => { paused.current = true }}
  onBlurCapture={() => { paused.current = false }}
  onTouchStart={() => { paused.current = true }}
  onTouchEnd={() => { setTimeout(() => { paused.current = false }, 2500) }}
>
            <div
              className="svc-track"
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
                  className="svc-item"
                  variants={reduce ? still : item}
                  custom={i}
                  initial="hidden"
                  animate={state}
                >
                  <Link href="/products" className="svc-card" draggable={false}>
                    <div className="svc-img">
                      <img src={s.image} alt={s.title} draggable={false} loading="lazy" />
                    </div>
                    <span className="svc-icon">
                      <Icon name={s.icon} />
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <span className="svc-go" aria-hidden="true">
                      <Arrow />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="svc-foot">
            <p>From design and fabrication to installation and inspection, we deliver reliable racking services built to improve efficiency and safety.</p>
            <div className="svc-ctrl">
            <button className="svc-nav" onClick={() => { lastManual.current = Date.now(); step(-1) }} disabled={!can.prev} aria-label="Previous category">
  <Arrow flip />
</button>
<button className="svc-nav" onClick={() => { lastManual.current = Date.now(); step(1) }} disabled={!can.next} aria-label="Next category">
  <Arrow />
</button>
              <SplitButton href="/products" dark>View all Categories</SplitButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}