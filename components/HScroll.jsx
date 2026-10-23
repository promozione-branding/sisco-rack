"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

function Pinned({ children, className, speed, header }) {
  const box = useRef(null)
  const pin = useRef(null)
  const track = useRef(null)
  const dims = useRef({ dist: 0, speed })
  const [size, setSize] = useState({ dist: 0, h: 0, vh: 0 })

  // Horizontal offset in px, driven by how far the sticky pin has actually
  // travelled inside its wrapper (no viewport-height arithmetic involved).
  const raw = useMotionValue(0)
  const x = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.35 })

  useEffect(() => {
    dims.current.speed = speed
  }, [speed])

  useEffect(() => {
    const b = box.current
    const p = pin.current
    const t = track.current
    if (!b || !p || !t) return

    const update = () => {
      const { dist, speed: s } = dims.current
      // 0 before the pin sticks, grows while stuck, tops out at (box height - pin height)
      const travelled = p.getBoundingClientRect().top - b.getBoundingClientRect().top
      raw.set(-clamp(travelled / s, 0, dist))
    }

    const measure = () => {
      const vh = window.innerHeight
      const h = p.offsetHeight
      const dist = Math.max(0, t.scrollWidth - p.clientWidth)
      dims.current = { dist, speed: dims.current.speed }
      setSize((prev) =>
        prev.dist === dist && prev.h === h && prev.vh === vh ? prev : { dist, h, vh }
      )
      update()
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    ro.observe(p)
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("load", measure)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("load", measure)
    }
  }, [raw])

  // Re-run position update whenever sizes (and therefore wrapper height) change.
  useEffect(() => {
    const b = box.current
    const p = pin.current
    if (!b || !p) return
    const { dist, speed: s } = dims.current
    const travelled = p.getBoundingClientRect().top - b.getBoundingClientRect().top
    raw.set(-clamp(travelled / s, 0, dist))
  }, [size, raw])

  const top = Math.max(0, (size.vh - size.h) / 2)

  return (
    <div ref={box} style={{ height: size.h + size.dist * speed || undefined }}>
      <div ref={pin} className="sticky overflow-hidden" style={{ top }}>
        {header}
        <motion.ul
          ref={track}
          role="list"
          style={{ x }}
          className={`m-0 flex w-max list-none gap-4 px-5 py-2 ${className}`}
        >
          {children}
        </motion.ul>
      </div>
    </div>
  )
}

export default function HScroll({ children, className = "", speed = 1, header = null }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <>
        {header}
        <ul
          role="list"
          className={`m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
        >
          {children}
        </ul>
      </>
    )
  }

  return (
    <Pinned className={className} speed={speed} header={header}>
      {children}
    </Pinned>
  )
}