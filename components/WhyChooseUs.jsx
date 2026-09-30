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

function Card({ className, title, text, children }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <motion.article
      className={`wx-card ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onMouseMove={onMove}
    >
      <span className="wx-bolt wx-bolt-tl" aria-hidden="true" />
      <span className="wx-bolt wx-bolt-tr" aria-hidden="true" />
      <div className="wx-visual">{children}</div>
      <div className="wx-copy">
        <h3>{title}</h3>
        <p>{text}</p>
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
    <div className="wx-gauge">
      <svg viewBox="0 0 240 150" className="wx-svg" role="img" aria-label="Gauge reading 1.5 times rated load">
        <path d="M30 120 A90 90 0 0 1 210 120" className="wx-track" />
        <motion.path
          d="M30 120 A90 90 0 0 1 210 120"
          className="wx-fill"
          variants={{
            hidden: { pathLength: 0 },
            show: { pathLength: 0.75, transition: { duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        {ticks.map((t) => (
          <line key={t.i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className="wx-tick" />
        ))}
        <text x="30" y="142" textAnchor="middle" className="wx-svg-label">0</text>
        <text x="120" y="20" textAnchor="middle" className="wx-svg-label">rated</text>
        <text x="210" y="142" textAnchor="middle" className="wx-svg-label">2×</text>

        <motion.line
          x1="120" y1="120" x2="120" y2="42"
          className="wx-needle"
          style={{ originX: 0.5, originY: 1 }}
          variants={{
            hidden: { rotate: -90 },
            show: { rotate: 45, transition: { type: "spring", stiffness: 38, damping: 6, delay: 0.3 } },
          }}
        />
        <circle cx="120" cy="120" r="9" className="wx-hub" />
        <circle cx="120" cy="120" r="3" className="wx-hub-dot" />
      </svg>

      <div className="wx-readout">
        <CountUp to={1.5} decimals={1} suffix="×" className="wx-readout-num" />
        <span>rated capacity, every profile</span>
      </div>
    </div>
  )
}


const rackXs = [44, 80, 204, 240]

function Blueprint() {
  return (
    <svg viewBox="0 0 340 200" className="wx-svg wx-blueprint" role="img" aria-label="Floor plan with racks fitted around an aisle">
      <defs>
        <pattern id="wx-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="340" height="200" fill="url(#wx-grid)" opacity="0.7" />

      <motion.path
        d="M20 20 H320 V172 H20 Z"
        className="wx-outline"
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
          <rect x={x} y="40" width="36" height="112" rx="3" className="wx-rack" />
          {[62, 84, 106, 128].map((y) => (
            <line key={y} x1={x} y1={y} x2={x + 36} y2={y} className="wx-rack-beam" />
          ))}
        </motion.g>
      ))}

      <motion.path
        d="M160 36 V156"
        className="wx-lane"
        animate={{ strokeDashoffset: [0, -28] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />

      <motion.g
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.5, duration: 0.5 } } }}
      >
        <line x1="116" y1="166" x2="204" y2="166" className="wx-dim" />
        <line x1="116" y1="160" x2="116" y2="172" className="wx-dim" />
        <line x1="204" y1="160" x2="204" y2="172" className="wx-dim" />
        <rect x="128" y="158" width="64" height="16" rx="8" className="wx-dim-chip" />
        <text x="160" y="169.5" textAnchor="middle" className="wx-dim-text">your aisle</text>
      </motion.g>

      {[44, 80, 204, 240].map((x, i) => (
        <motion.circle
          key={x}
          cx={x + 18}
          cy="152"
          r="3"
          className="wx-anchor"
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
      <path d={d} className="wx-leader" />
      <circle cx={dot[0]} cy={dot[1]} r="3" className="wx-leader-dot" />
      <rect x={x} y={y} width={w} height="20" rx="10" className="wx-pill" />
      <text x={x + w / 2} y={y + 13.5} textAnchor="middle" className="wx-pill-text">{label}</text>
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
      <rect x={x} y="24" width="10" height="166" className="wx-upright" />
      <line x1={x + 5} y1="34" x2={x + 5} y2="178" className="wx-holes" />
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
      <line x1={x} y1="186" x2={x} y2="206" className="wx-anc-stem" />
      <rect x={x - 4} y="180" width="8" height="6" rx="1.5" className="wx-anc-head" />
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
      <rect x={x} y={y} width={w} height={h} rx="3" className="wx-crate" />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} className="wx-crate-tape" />
    </motion.g>
  )
}

function Install() {
  return (
    <svg viewBox="0 0 360 236" className="wx-svg" role="img" aria-label="A storage rack being assembled, levelled and anchored, with a load plate fitted">
      <defs>
        <pattern id="wx-haz" width="14" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="7" height="8" fill="#e8a317" />
          <rect x="7" width="7" height="8" fill="#1f2a33" />
        </pattern>
      </defs>

      <motion.rect
        x="20" y="190" width="320" height="8" className="wx-floor"
        style={{ originX: 0 }}
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, delay: 0.15, ease: "easeOut" } } }}
      />

      <Upright x={120} delay={0.4} />
      <Upright x={240} delay={0.55} />

      <rect x="110" y="186" width="30" height="4" className="wx-anc-head" />
      <rect x="230" y="186" width="30" height="4" className="wx-anc-head" />

      {[64, 110, 156].map((y, i) => (
        <motion.rect key={y} x="122" y={y} width="126" height="10" rx="2" className="wx-beam" variants={drop(0.9 + i * 0.15)} />
      ))}

      <Crate x={140} y={122} w={64} h={34} delay={2.9} />
      <Crate x={172} y={28} w={44} h={36} delay={3.05} />

      <Anchor x={117} delay={1.6} />
      <Anchor x={133} delay={1.7} />
      <Anchor x={237} delay={1.8} />
      <Anchor x={253} delay={1.9} />

      <motion.g variants={fade(2.0)}>
        <rect x="182" y="98" width="50" height="12" rx="6" className="wx-level" />
        <line x1="200" y1="100" x2="200" y2="108" className="wx-level-mark" />
        <line x1="214" y1="100" x2="214" y2="108" className="wx-level-mark" />
        <motion.circle
          cx="207" cy="104" r="3.6" className="wx-bubble"
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
        <rect x="108" y="76" width="34" height="22" rx="3" className="wx-plate-rect" />
        <line x1="114" y1="84" x2="136" y2="84" className="wx-plate-line" />
        <line x1="114" y1="90" x2="128" y2="90" className="wx-plate-line" />
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
    <div className="wx-warranty">
      <motion.div
        className="wx-seal"
        variants={{
          hidden: { scale: 1.9, rotate: -30, opacity: 0 },
          show: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 170, damping: 12, delay: 0.25 } },
        }}
      >
        <svg viewBox="0 0 200 200" className="wx-seal-svg" role="img" aria-label="Ten-year frame warranty seal">
          <defs>
            <path id="wx-seal-path" d="M100 100 m-68 0 a68 68 0 1 1 136 0 a68 68 0 1 1 -136 0" />
          </defs>
          <polygon points={sealPoints} className="wx-seal-star" />
          <circle cx="100" cy="100" r="82" className="wx-seal-line" />
          <g className="wx-seal-spin">
            <text className="wx-seal-text">
              <textPath href="#wx-seal-path" textLength="418" lengthAdjust="spacing">
                Ten-year frame warranty • Powder coated • Welded •{" "}
              </textPath>
            </text>
          </g>
          <circle cx="100" cy="100" r="54" className="wx-seal-disc" />
        </svg>
        <div className="wx-seal-center">
          <CountUp to={10} className="wx-seal-num" />
          <span>years</span>
        </div>
      </motion.div>

      <div className="wx-tl">
        <div className="wx-tl-track">
          <div className="wx-tl-main">
            <motion.i
              className="wx-tl-fill"
              style={{ originX: 0 }}
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 1.6, delay: 0.9, ease: "easeInOut" } },
              }}
            />
            {Array.from({ length: 10 }, (_, i) => (
              <motion.b
                key={i}
                className={i === 9 ? "wx-tl-tick last" : "wx-tl-tick"}
                variants={{
                  hidden: { scaleY: 0, opacity: 0 },
                  show: { scaleY: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.9 + i * 0.18 } },
                }}
              />
            ))}
          </div>
          <motion.i
            className="wx-tl-ext"
            style={{ originX: 0 }}
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 2.6, duration: 0.6 } } }}
          />
        </div>
        <div className="wx-tl-cap">
          <span>Install day</span>
          <span>Year 10</span>
        </div>
        <motion.div
          className="wx-tl-note"
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 3, duration: 0.5 } } }}
        >
          <motion.span
            className="wx-pulse"
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
  { cls: "wx-a", visual: <Gauge /> },
  { cls: "wx-b", visual: <Blueprint /> },
  { cls: "wx-c", visual: <Install /> },
  { cls: "wx-d", visual: <Warranty /> },
]


export default function WhyChooseUs() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const decoY = useTransform(scrollYProgress, [0, 1], [-50, 90])
  const decoRotate = useTransform(scrollYProgress, [0, 1], [-4, 4])

  return (
    <MotionConfig reducedMotion="user">
      <section className="section why wx" ref={ref}>
        <motion.svg
          className="wx-deco"
          viewBox="0 0 160 300"
          aria-hidden="true"
          style={{ y: decoY, rotate: decoRotate }}
        >
          <rect x="14" y="0" width="14" height="300" className="wx-deco-post" />
          <rect x="132" y="0" width="14" height="300" className="wx-deco-post" />
          <line x1="21" y1="8" x2="21" y2="292" className="wx-deco-holes" />
          <line x1="139" y1="8" x2="139" y2="292" className="wx-deco-holes" />
          {[60, 130, 200].map((y) => (
            <rect key={y} x="10" y={y} width="140" height="12" rx="4" className="wx-deco-beam" />
          ))}
        </motion.svg>

        <div className="wrap">
          <div className="sec-head">
             <h2>
            Why Choose Sisco
          </h2>
            <motion.p
              className="lead"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
            >
              We make the steel, test it, ship it and fit it. Fewer hand-offs mean fewer surprises on install day.
            </motion.p>
          </div>

          <div className="wx-grid">
            {reasons.slice(0, 4).map((r, i) => (
              <Card key={r.title} className={layout[i].cls} title={r.title} text={r.text}>
                {layout[i].visual}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}