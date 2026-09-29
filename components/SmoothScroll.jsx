"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let id
    const raf = (time) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  return children
}
