"use client"

import { useRef, useEffect } from "react"

const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1100 200'><text x='550' y='100' text-anchor='middle' dominant-baseline='central' font-family='Arial Black,Arial,Helvetica,sans-serif' font-weight='900' font-size='150' textLength='900' lengthAdjust='spacingAndGlyphs' fill='black'>Sisco Racks</text></svg>`

const SVG_MASK = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
const RATIO = 200 / 1100
const START = 0.8
const END = 12
const EASING = 0.12

const smooth = (t) => t * t * (3 - 2 * t)
const clamp = (v) => Math.min(1, Math.max(0, v))

export default function Industries() {
  const container = useRef(null)
  const mask = useRef(null)
  const media = useRef(null)
  const eyebrow = useRef(null)

  useEffect(() => {
    let eased = 0
    let raf = 0
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const frame = () => {
      const box = container.current
      const m = mask.current
      const inner = media.current

      if (box && m && inner) {
        const rect = box.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const raw = total > 0 ? clamp(-rect.top / total) : 0

        if (reduced) eased = 1
        else eased += (raw - eased) * EASING

        const p = clamp(eased)
        const w = m.clientWidth
        const h = m.clientHeight
        const mobile = window.innerWidth < 640

        if (eyebrow.current) eyebrow.current.style.opacity = String(Math.max(0, 1 - raw * 8))

        const z = clamp(p / 0.6)

        if (z >= 1) {
          m.style.maskImage = "none"
          m.style.webkitMaskImage = "none"
        } else {
          const start = mobile ? 1 : START
          const imgW = w * (start + (END - start) * Math.pow(z, 3))
          const imgH = imgW * RATIO
          const a = smooth(clamp((z - 0.5) / 0.5))
          const solid = `linear-gradient(rgba(0,0,0,${a}), rgba(0,0,0,${a}))`
          const image = `${solid}, ${SVG_MASK}`
          const size = `100% 100%, ${imgW}px ${imgH}px`
          const pos = `0px 0px, ${(w - imgW) / 2}px ${(h - imgH) / 2}px`

          m.style.maskImage = image
          m.style.webkitMaskImage = image
          m.style.maskSize = size
          m.style.webkitMaskSize = size
          m.style.maskPosition = pos
          m.style.webkitMaskPosition = pos
        }

        const s = clamp((p - 0.6) / 0.4)
        const scale = 1 - s * (mobile ? 0.035 : 0.055)
        const shift = s * (mobile ? 10 : 18)
        const radius = s * (mobile ? 14 : 20)

        inner.style.transform = `scale(${scale}) translateY(${shift}px)`
        inner.style.borderRadius = `${radius}px`
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="ind" ref={container}>
      <div className="ind-stick">
        <p className="ind-eyebrow" ref={eyebrow}>Storage solutions</p>
        <div
          className="ind-mask"
          ref={mask}
          style={{
            maskImage: SVG_MASK,
            WebkitMaskImage: SVG_MASK,
            maskSize: "65%",
            WebkitMaskSize: "65%",
            maskPosition: "center",
            WebkitMaskPosition: "center"
          }}
        >
          <div className="ind-media" ref={media}>
            <video autoPlay muted loop playsInline preload="auto">
              <source src="/watermarked_preview.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}