"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion"

export default function HScroll({ children, className = "" }) {
  const box = useRef(null)
  const track = useRef(null)
  const reduce = useReducedMotion()
  const [dist, setDist] = useState(0)

  useEffect(() => {
    const measure = () => {
      const t = track.current
      if (!t) return
      setDist(Math.max(0, t.offsetWidth - t.parentElement.clientWidth))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end end"] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const x = useTransform(p, (v) => -v * dist)

  // reduced motion: plain swipeable row, no scroll-jacking
  if (reduce) {
    return (
      <ul className={`flex snap-x gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}>
        {children}
      </ul>
    )
  }

  return (
    // vertical scroll distance = horizontal distance, so it feels 1:1
    <div ref={box} style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.ul
          ref={track}
          role="list"
          style={{ x }}
          className={`flex w-max gap-4 px-5 will-change-transform ${className}`}
        >
          {children}
        </motion.ul>
      </div>
    </div>
  )
}