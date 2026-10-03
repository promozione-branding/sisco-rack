"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  MotionConfig,
  animate,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion"
import { reasons } from "@/lib/data"




const SVG_BOX = "h-auto w-full max-w-[420px] overflow-visible min-[961px]:max-h-[28svh]"
const GRID_LINES = "bg-[linear-gradient(rgba(122,139,153,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(122,139,153,0.16)_1px,transparent_1px)] bg-[length:24px_24px]"
const CARD_BASE = "relative isolate grid min-h-[420px] grid-rows-[1fr_auto] overflow-hidden rounded-[28px] border-2 border-solid border-ink after:pointer-events-none after:absolute after:inset-0 after:z-0 after:opacity-0 after:transition-[opacity] after:duration-300 after:content-[''] after:bg-[radial-gradient(360px_circle_at_var(--mx,50%)_var(--my,50%),rgba(232,163,23,0.2),transparent_60%)] hover:after:opacity-100 min-[961px]:min-h-0"
const ROUND = "[stroke-linecap:round]"

const cardVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
}

function CountUp({ to, decimals = 0, suffix = "", className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => v.toFixed(decimals) + suffix)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 })
    return () => controls.stop()
  }, [inView, to, mv])

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  )
}

function Card({ className, dark, title, text, children }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <motion.article
      className={`${CARD_BASE} ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onMouseMove={onMove}
    >
      <span className="absolute left-4 top-4 z-[2] h-2.5 w-2.5 rounded-circle border-2 border-solid border-current opacity-[0.35]" aria-hidden="true" />
      <span className="absolute right-4 top-4 z-[2] h-2.5 w-2.5 rounded-circle border-2 border-solid border-current opacity-[0.35]" aria-hidden="true" />
      <div className="relative z-[1] grid min-h-[240px] place-items-center px-8 pb-2 pt-10 max-[720px]:px-5 max-[720px]:pt-9 min-[961px]:min-h-0 min-[961px]:px-6 min-[961px]:pb-1 min-[961px]:pt-6">{children}</div>
      <div className="relative z-[1] px-8 pb-8 max-[720px]:px-[22px] max-[720px]:pb-[26px] min-[961px]:px-6 min-[961px]:pb-5">
        <h3 className={`mb-2 text-[length:clamp(1.7rem,2.6vw,2.3rem)] min-[961px]:mb-1 min-[961px]:text-[length:clamp(1.4rem,2vw,1.8rem)] ${dark ? "text-white" : ""}`}>{title}</h3>
        <p className={`max-w-[46ch] min-[961px]:text-[0.9rem] min-[961px]:leading-[1.45] ${dark ? "text-[#d5e0e8]" : "text-muted"}`}>{text}</p>
      </div>
    </motion.article>
  )
}

function Gauge() {
  const ticks = Array.from({ length: 9 }, (_, i) => {
    const a = Math.PI - (i * Math.PI) / 8
    const len = i % 4 === 0 ? 14 : 8
    return {
      x1: 120 + (92 - len) * Math.cos(a),
      y1: 120 - (92 - len) * Math.sin(a),
      x2: 120 + 92 * Math.cos(a),
      y2: 120 - 92 * Math.sin(a),
      i,
    }
  })

  return (
    <div className="relative w-full max-w-[380px]">
      <svg viewBox="0 0 240 150" className={SVG_BOX} role="img" aria-label="Gauge reading 1.5 times rated load">
        <path d="M30 120 A90 90 0 0 1 210 120" className={`fill-none stroke-steel stroke-[14] ${ROUND}`} />
        <motion.path
          d="M30 120 A90 90 0 0 1 210 120"
          className={`fill-none stroke-safety stroke-[14] ${ROUND}`}
          variants={{
            hidden: { pathLength: 0 },
            show: { pathLength: 0.75, transition: { duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        {ticks.map((t) => (
          <line key={t.i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={`stroke-ink stroke-[2] ${ROUND}`} />
        ))}
        <text x="30" y="142" textAnchor="middle" className="fill-muted-3 [font:600_10px_var(--font-body),sans-serif]">0</text>
        <text x="120" y="20" textAnchor="middle" className="fill-muted-3 [font:600_10px_var(--font-body),sans-serif]">rated</text>
        <text x="210" y="142" textAnchor="middle" className="fill-muted-3 [font:600_10px_var(--font-body),sans-serif]">2×</text>

        <motion.line
          x1="120" y1="120" x2="120" y2="42"
          className={`stroke-ink stroke-[4] ${ROUND}`}
          style={{ originX: 0.5, originY: 1 }}
          variants={{
            hidden: { rotate: -90 },
            show: { rotate: 45, transition: { type: "spring", stiffness: 38, damping: 6, delay: 0.3 } },
          }}
        />
        <circle cx="120" cy="120" r="9" className="fill-ink" />
        <circle cx="120" cy="120" r="3" className="fill-safety" />
      </svg>

      <div className="mt-1 flex items-baseline justify-center gap-2.5 text-[0.9rem] text-muted">
        <CountUp to={1.5} decimals={1} suffix="×" className="font-display text-[2.6rem] font-bold leading-none text-blue min-[961px]:text-[2rem]" />
        <span>rated capacity, every profile</span>
      </div>
    </div>
  )
}


const rackXs = [44, 80, 204, 240]

function Blueprint() {
  return (
    <svg viewBox="0 0 340 200" className={SVG_BOX} role="img" aria-label="Floor plan with racks fitted around an aisle">
      <defs>
        <pattern id="wx-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="340" height="200" fill="url(#wx-grid)" opacity="0.7" />

      <motion.path
        d="M20 20 H320 V172 H20 Z"
        className="fill-none stroke-blue stroke-[2.5] [stroke-linejoin:round]"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: 1.3, ease: "easeInOut" } },
        }}
      />

      {rackXs.map((x, i) => (
        <motion.g
          key={x}
          style={{ originY: 1, originX: 0.5 }}
          variants={{
            hidden: { scaleY: 0, opacity: 0 },
            show: { scaleY: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.7 + i * 0.15 } },
          }}
        >
          <rect x={x} y="40" width="36" height="112" rx="3" className="fill-[rgba(232,163,23,0.35)] stroke-blue stroke-[2]" />
          {[62, 84, 106, 128].map((y) => (
            <line key={y} x1={x} y1={y} x2={x + 36} y2={y} className="stroke-ink stroke-[1.5] opacity-60" />
          ))}
        </motion.g>
      ))}

      <motion.path
        d="M160 36 V156"
        className="stroke-blue stroke-[2] opacity-[0.55] [stroke-dasharray:8_6]"
        animate={{ strokeDashoffset: [0, -28] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />

      <motion.g
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.5, duration: 0.5 } } }}
      >
        <line x1="116" y1="166" x2="204" y2="166" className="stroke-ink stroke-[1.5]" />
        <line x1="116" y1="160" x2="116" y2="172" className="stroke-ink stroke-[1.5]" />
        <line x1="204" y1="160" x2="204" y2="172" className="stroke-ink stroke-[1.5]" />
        <rect x="128" y="158" width="64" height="16" rx="8" className="fill-ink" />
        <text x="160" y="169.5" textAnchor="middle" className="fill-bg [font:600_9px_var(--font-body),sans-serif]">your aisle</text>
      </motion.g>

      {[44, 80, 204, 240].map((x, i) => (
        <motion.circle
          key={x}
          cx={x + 18}
          cy="152"
          r="3"
          className="origin-center fill-ink [transform-box:fill-box]"
          animate={{ scale: [1, 1.9, 1], opacity: [1, 0.35, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.8 + i * 0.25 }}
        />
      ))}
    </svg>
  )
}


const drop = (delay) => ({
  hidden: { y: -28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 160, damping: 13, delay } },
})

const fade = (delay) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay, duration: 0.4 } },
})

function Callout({ d, dot, x, y, w, label, delay }) {
  return (
    <motion.g variants={fade(delay)}>
      <path d={d} className="fill-none stroke-ink stroke-[1.5] [stroke-dasharray:3_3]" />
      <circle cx={dot[0]} cy={dot[1]} r="3" className="fill-ink" />
      <rect x={x} y={y} width={w} height="20" rx="10" className="fill-ink" />
      <text x={x + w / 2} y={y + 13.5} textAnchor="middle" className="fill-white [font:700_10.5px_var(--font-body),sans-serif]">{label}</text>
    </motion.g>
  )
}

function Upright({ x, delay }) {
  return (
    <motion.g
      style={{ originX: 0.5, originY: 1 }}
      variants={{
        hidden: { scaleY: 0 },
        show: { scaleY: 1, transition: { type: "spring", stiffness: 90, damping: 15, delay } },
      }}
    >
      <rect x={x} y="24" width="10" height="166" className="fill-blue stroke-ink stroke-[2]" />
      <line x1={x + 5} y1="34" x2={x + 5} y2="178" className={`stroke-white stroke-[3] opacity-[0.85] [stroke-dasharray:0.1_10] ${ROUND}`} />
    </motion.g>
  )
}

function Anchor({ x, delay }) {
  return (
    <motion.g
      variants={{
        hidden: { y: -16, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 12, delay } },
      }}
    >
      <line x1={x} y1="186" x2={x} y2="206" className={`stroke-ink stroke-[3] ${ROUND}`} />
      <rect x={x - 4} y="180" width="8" height="6" rx="1.5" className="fill-ink" />
    </motion.g>
  )
}

function Crate({ x, y, w, h, delay }) {
  return (
    <motion.g
      style={{ originX: 0.5, originY: 1 }}
      variants={{
        hidden: { scaleY: 0, opacity: 0 },
        show: { scaleY: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 12, delay } },
      }}
    >
      <rect x={x} y={y} width={w} height={h} rx="3" className="fill-[#cbd5dc] stroke-ink stroke-[2]" />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} className="stroke-ink stroke-[2] opacity-[0.35]" />
    </motion.g>
  )
}

function Install() {
  return (
    <svg viewBox="0 0 360 236" className={SVG_BOX} role="img" aria-label="A storage rack being assembled, levelled and anchored, with a load plate fitted">
      <defs>
        <pattern id="wx-haz" width="14" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="7" height="8" fill="#e8a317" />
          <rect x="7" width="7" height="8" fill="#1f2a33" />
        </pattern>
      </defs>

      <motion.rect
        x="20" y="190" width="320" height="8" className="fill-[url(#wx-haz)] stroke-ink stroke-[1.5]"
        style={{ originX: 0 }}
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, delay: 0.15, ease: "easeOut" } } }}
      />

      <Upright x={120} delay={0.4} />
      <Upright x={240} delay={0.55} />

      <rect x="110" y="186" width="30" height="4" className="fill-ink" />
      <rect x="230" y="186" width="30" height="4" className="fill-ink" />

      {[64, 110, 156].map((y, i) => (
        <motion.rect key={y} x="122" y={y} width="126" height="10" rx="2" className="fill-safety stroke-ink stroke-[2]" variants={drop(0.9 + i * 0.15)} />
      ))}

      <Crate x={140} y={122} w={64} h={34} delay={2.9} />
      <Crate x={172} y={28} w={44} h={36} delay={3.05} />

      <Anchor x={117} delay={1.6} />
      <Anchor x={133} delay={1.7} />
      <Anchor x={237} delay={1.8} />
      <Anchor x={253} delay={1.9} />

      <motion.g variants={fade(2.0)}>
        <rect x="182" y="98" width="50" height="12" rx="6" className="fill-white stroke-ink stroke-[2]" />
        <line x1="200" y1="100" x2="200" y2="108" className="stroke-ink stroke-[1.5]" />
        <line x1="214" y1="100" x2="214" y2="108" className="stroke-ink stroke-[1.5]" />
        <motion.circle
          cx="207" cy="104" r="3.6" className="fill-safety stroke-ink stroke-[1.5]"
          variants={{
            hidden: { x: -16 },
            show: { x: [-16, 12, -8, 4, 0], transition: { delay: 2.2, duration: 1.6, ease: "easeInOut" } },
          }}
        />
      </motion.g>

      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          hidden: { scale: 0, rotate: -20, opacity: 0 },
          show: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 240, damping: 12, delay: 2.5 } },
        }}
      >
        <rect x="108" y="76" width="34" height="22" rx="3" className="fill-white stroke-ink stroke-[2]" />
        <line x1="114" y1="84" x2="136" y2="84" className={`stroke-steel-deep stroke-[2] ${ROUND}`} />
        <line x1="114" y1="90" x2="128" y2="90" className={`stroke-steel-deep stroke-[2] ${ROUND}`} />
      </motion.g>

      <Callout d="M245 40 H280" dot={[245, 40]} x={280} y={30} w={68} label="Assemble" delay={1.4} />
      <Callout d="M232 104 H280" dot={[232, 104]} x={280} y={94} w={48} label="Level" delay={2.4} />
      <Callout d="M78 87 H110" dot={[110, 87]} x={6} y={77} w={72} label="Load plate" delay={2.7} />
      <Callout d="M70 218 H117 V206" dot={[117, 206]} x={10} y={208} w={60} label="Anchor" delay={1.95} />
    </svg>
  )
}


const sealPoints = (() => {
  const n = 32
  const pts = []
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? 88 : 97
    const a = (Math.PI * i) / n - Math.PI / 2
    pts.push(`${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`)
  }
  return pts.join(" ")
})()

function Warranty() {
  return (
    <div className="flex w-full max-w-[640px] flex-wrap items-center justify-center gap-10 max-[720px]:gap-6 min-[961px]:gap-6">
      <motion.div
        className="relative h-[190px] w-[190px] shrink-0 drop-shadow-[0_8px_0_rgba(0,0,0,0.22)] max-[720px]:h-40 max-[720px]:w-40 min-[961px]:h-[130px] min-[961px]:w-[130px]"
        variants={{
          hidden: { scale: 1.9, rotate: -30, opacity: 0 },
          show: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 170, damping: 12, delay: 0.25 } },
        }}
      >
        <svg viewBox="0 0 200 200" className="block h-full w-full" role="img" aria-label="Ten-year frame warranty seal">
          <defs>
            <path id="wx-seal-path" d="M100 100 m-68 0 a68 68 0 1 1 136 0 a68 68 0 1 1 -136 0" />
          </defs>
          <polygon points={sealPoints} className="fill-safety stroke-ink stroke-[2.5] [stroke-linejoin:round]" />
          <circle cx="100" cy="100" r="82" className="fill-none stroke-ink stroke-[1.5]" />
          <g className="origin-[100px_100px] animate-wx-spin [transform-box:view-box]">
            <text className="fill-ink [font:700_11px_var(--font-body),sans-serif]">
              <textPath href="#wx-seal-path" textLength="418" lengthAdjust="spacing">
                Ten-year frame warranty • Powder coated • Welded •{" "}
              </textPath>
            </text>
          </g>
          <circle cx="100" cy="100" r="54" className="fill-white stroke-ink stroke-[2]" />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center leading-none text-ink">
          <CountUp to={10} className="font-display text-[3.6rem] font-bold max-[720px]:text-[3rem] min-[961px]:text-[2.6rem]" />
          <span className="mt-0.5 text-[0.85rem] font-semibold">years</span>
        </div>
      </motion.div>

      <div className="grid min-w-[250px] flex-1 gap-2.5">
        <div className="flex h-8 items-center gap-2">
          <div className="relative flex h-8 flex-1 items-center justify-between before:absolute before:inset-x-0 before:top-1/2 before:-mt-[1.5px] before:h-[3px] before:rounded-[3px] before:bg-white/[0.22] before:content-['']">
            <motion.i
              className="absolute inset-x-0 top-1/2 -mt-[1.5px] h-[3px] rounded-[3px] bg-safety"
              style={{ originX: 0 }}
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 1.6, delay: 0.9, ease: "easeInOut" } },
              }}
            />
            {Array.from({ length: 10 }, (_, i) => (
              <motion.b
                key={i}
                className={`relative block rounded-[3px] ${i === 9 ? "h-[26px] w-1.5 bg-safety" : "h-4 w-1 bg-white"}`}
                variants={{
                  hidden: { scaleY: 0, opacity: 0 },
                  show: { scaleY: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.9 + i * 0.18 } },
                }}
              />
            ))}
          </div>
          <motion.i
            className="relative block h-0 w-16 border-t-[3px] border-dashed border-white/55 after:absolute after:-right-[3px] after:-top-[9px] after:border-b-[7px] after:border-l-[9px] after:border-t-[7px] after:border-solid after:border-b-transparent after:border-l-white/70 after:border-t-transparent after:content-['']"
            style={{ originX: 0 }}
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 2.6, duration: 0.6 } } }}
          />
        </div>
        <div className="flex justify-between pr-[72px] text-[0.82rem] font-semibold text-mist">
          <span>Install day</span>
          <span>Year 10</span>
        </div>
        <motion.div
          className="mt-1.5 inline-flex items-center gap-2.5 justify-self-start rounded-pill border border-solid border-white/25 bg-white/10 px-4 py-2 text-[0.9rem] font-semibold text-white"
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 3, duration: 0.5 } } }}
        >
          <motion.span
            className="h-[9px] w-[9px] rounded-circle bg-safety"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          Spare parts stay in stock past year 10
        </motion.div>
      </div>
    </div>
  )
}


const layout = [
  { cls: "col-[span_7] bg-[linear-gradient(160deg,#fff_0%,#dfe6eb_100%)] max-[960px]:col-[span_12]", visual: <Gauge /> },
  { cls: "col-[span_5] bg-bg max-[960px]:col-[span_12]", visual: <Blueprint /> },
  { cls: `col-[span_5] bg-white ${GRID_LINES} max-[960px]:col-[span_12]`, visual: <Install /> },
  { cls: "col-[span_7] bg-[linear-gradient(155deg,#3e5c76_0%,#263a4b_100%)] text-white max-[960px]:col-[span_12]", dark: true, visual: <Warranty /> },
]


export default function WhyChooseUs() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const decoY = useTransform(scrollYProgress, [0, 1], [-50, 90])
  const decoRotate = useTransform(scrollYProgress, [0, 1], [-4, 4])

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative mx-11 my-[70px] overflow-hidden rounded-[36px] border-y-2 border-solid border-ink bg-panel py-12 max-[720px]:mx-3 max-[720px]:my-0 max-[720px]:py-10 min-[961px]:py-8" ref={ref}>
        <motion.svg
          className="pointer-events-none absolute right-[4%] top-5 z-0 w-[150px] opacity-[0.35] max-[960px]:hidden"
          viewBox="0 0 160 300"
          aria-hidden="true"
          style={{ y: decoY, rotate: decoRotate }}
        >
          <rect x="14" y="0" width="14" height="300" className="fill-steel stroke-steel-deep stroke-[2]" />
          <rect x="132" y="0" width="14" height="300" className="fill-steel stroke-steel-deep stroke-[2]" />
          <line x1="21" y1="8" x2="21" y2="292" className={`stroke-panel stroke-[6] [stroke-dasharray:0.1_14] ${ROUND}`} />
          <line x1="139" y1="8" x2="139" y2="292" className={`stroke-panel stroke-[6] [stroke-dasharray:0.1_14] ${ROUND}`} />
          {[60, 130, 200].map((y) => (
            <rect key={y} x="10" y={y} width="140" height="12" rx="4" className="fill-safety stroke-ink stroke-[2]" />
          ))}
        </motion.svg>

        <div className="relative z-[1] mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
          <div className="mb-7 grid grid-cols-[1fr_1fr] items-end gap-10">
             <h2 className="min-[961px]:text-[length:clamp(1.8rem,3.2vw,2.7rem)]">
            Why Choose Sisco
          </h2>
            <motion.p
              className="max-w-[46ch] text-[1.15rem] text-muted"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
            >
              We make the steel, test it, ship it and fit it. Fewer hand-offs mean fewer surprises on install day.
            </motion.p>
          </div>

          <div className="grid grid-cols-[repeat(12,1fr)] gap-[22px] min-[961px]:gap-4">
            {reasons.slice(0, 4).map((r, i) => (
              <Card key={r.title} className={layout[i].cls} dark={layout[i].dark} title={r.title} text={r.text}>
                {layout[i].visual}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}