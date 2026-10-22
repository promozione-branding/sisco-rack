"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion"


function Pinned({ children, className, speed }) {
  const box = useRef(null)
  const pin = useRef(null)
  const track = useRef(null)
  const dims = useRef({ dist: 0, h: 0, speed })
  const [size, setSize] = useState({ dist: 0, h: 0, vh: 0 })

  useEffect(() => {
    dims.current.speed = speed
  }, [speed])

  useEffect(() => {
    const t = track.current
    const p = pin.current
    if (!t || !p) return

    const measure = () => {
      const vh = window.innerHeight
      const h = p.offsetHeight
      const dist = Math.max(0, t.scrollWidth - p.clientWidth)
      dims.current = { dist, h, speed: dims.current.speed }
      setSize({ dist, h, vh })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    ro.observe(p)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: box,
    offset: ["start end", "end start"],
  })

  const raw = useTransform(scrollYProgress, (v) => {
    const { dist, h, speed: s } = dims.current
    const vh = window.innerHeight
    const top = Math.max(0, (vh - h) / 2) // where the row pins
    const total = h + dist * s // wrapper height
    const pinned = v * (total + vh) - (vh - top)
    return -Math.min(Math.max(pinned / s, 0), dist)
  })
  const x = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.35 })

  const top = Math.max(0, (size.vh - size.h) / 2)

  return (
    <div ref={box} style={{ height: size.h + size.dist * speed || undefined }}>
      <div ref={pin} className="sticky overflow-hidden" style={{ top }}>
        <motion.ul
          ref={track}
          role="list"
          style={{ x }}
          className={`m-0 flex w-max list-none gap-4 px-5 py-2 will-change-transform ${className}`}
        >
          {children}
        </motion.ul>
      </div>
    </div>
  )
}

export default function HScroll({ children, className = "", speed = 1 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <ul
        role="list"
        className={`m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </ul>
    )
  }

  return (
    <Pinned className={className} speed={speed}>
      {children}
    </Pinned>
  )
}