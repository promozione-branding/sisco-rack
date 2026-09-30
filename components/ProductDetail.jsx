"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, MotionConfig, useInView, animate } from "framer-motion"
import SplitButton from "./SplitButton"
import LottieIcon from "./LottieIcon"
import RackBlueprint from "./RackBlueprint"
import { ShieldCheck, Truck, Award } from "lucide-react"

const WHITE = ["#FFFFFF", "#E8A317"]

const labels = {
  height: "Height",
  layersPerRack: "Layers per rack",
  loadPerLayer: "Load per layer",
  material: "Material",
  surfaceTreatment: "Surface treatment",
  productType: "Frame type",
  usage: "Usage"
}

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } })
}

function Reveal({ children, className, i = 0 }) {
  return (
    <motion.div className={className} variants={rise} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  )
}

function Arrow({ flip }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const num = parseInt(value)
  const unit = String(value ?? "").replace(/[0-9\s]/g, "")
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || Number.isNaN(num)) return
    const c = animate(0, num, { duration: 1.2, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, num])

  if (Number.isNaN(num)) return <span ref={ref}>{value ?? "On request"}</span>
  return <span ref={ref}>{n} {unit}</span>
}

function Gallery({ images, name }) {
  const [i, setI] = useState(0)
  const go = (n) => setI((n + images.length) % images.length)

  return (
    <div className="pd-gallery">
              <div className="pd-shelf">
        {images.map((src, k) => (
          <motion.div
            key={src}
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 13, delay: 0.5 + k * 0.13 }}
          >
            <button className={k === i ? "pd-thumb on" : "pd-thumb"} onClick={() => go(k)} aria-label={`Show image ${k + 1}`}>
              <img src={src} alt="" />
            </button>
          </motion.div>
        ))}
      </div>
      <div className="pd-stage">
        <span className="pd-up l" />
        <span className="pd-up r" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={i}
            src={images[i]}
            alt={name}
            className="pd-img"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.96 }}
            transition={{ duration: 0.28 }}
          />
        </AnimatePresence>
        <span className="pd-count">{i + 1} / {images.length}</span>
        {images.length > 1 && (
          <>
            <button className="pd-arrow l" onClick={() => go(i - 1)} aria-label="Previous image"><Arrow flip /></button>
            <button className="pd-arrow r" onClick={() => go(i + 1)} aria-label="Next image"><Arrow /></button>
          </>
        )}
      </div>
    </div>
  )
}

export default function ProductDetail({ product: p, related }) {
  const specs = Object.entries(p.specs || {})
  const s = p.specs || {}
  const c = p.contact || {}
  const images = p.images?.length ? p.images : [p.image]

  return (
    <MotionConfig reducedMotion="user">
      <section className="pd-head">
        <div className="wrap">
          <motion.nav className="pd-crumbs" aria-label="Breadcrumb" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            <span>{p.category}</span>
          </motion.nav>
          <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {p.name}
          </motion.h1>
          <motion.div className="pd-chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="pd-chip hot">{p.category}</span>
            <span className="pd-chip">{p.brand}</span>
            {s.height && <span className="pd-chip">{s.height} tall</span>}
          </motion.div>
        </div>
      </section>

      <div className="wrap pd-main">
        <Gallery images={images} name={p.name} />
        <div className="pd-info">
          <motion.div className="pd-tiles" variants={rise} custom={1} initial="hidden" animate="show">
            <div className="pd-tile">
              <small>Price</small>
              <b>{p.price}</b>
            </div>
            <div className="pd-tile">
              <small>Minimum order</small>
              <b>{p.moq}</b>
            </div>
            <div className="pd-tile dark">
              <small>Load per layer</small>
              <b><CountUp value={s.loadPerLayer} /></b>
              <LottieIcon className="pd-tile-lottie" colors={WHITE} />
            </div>
          </motion.div>
          <motion.p className="pd-desc" variants={rise} custom={2} initial="hidden" animate="show">
            {p.description}
          </motion.p>
              <motion.div className="pd-cta" variants={rise} custom={3} initial="hidden" animate="show">
            <SplitButton href="/contact" dark>Request a quote</SplitButton>
            {c.whatsapp && <a className="btn ghost" href={c.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}
            {c.phone && <a className="btn ghost" href={`tel:${c.phone}`}>Call now</a>}
          </motion.div>

          <motion.div className="pd-trust" variants={rise} custom={4} initial="hidden" animate="show">
            <div className="pd-trust-item">
              <span className="pd-trust-icon" aria-hidden="true">
                <ShieldCheck size={28} strokeWidth={2.5} />
              </span>
              <div>
                <strong>Quality Assured</strong>
                <span>Color-coated mild steel</span>
              </div>
            </div>
            <div className="pd-trust-item">
              <span className="pd-trust-icon" aria-hidden="true">
                <Truck size={28} strokeWidth={2.5} />
              </span>
              <div>
                <strong>Reliable Delivery</strong>
                <span>Pan-India shipping</span>
              </div>
            </div>
            <div className="pd-trust-item">
              <span className="pd-trust-icon" aria-hidden="true">
                <Award size={28} strokeWidth={2.5} />
              </span>
              <div>
                <strong>Trusted Maker</strong>
                <span>Arya Industry standard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="wrap pd-sec">
        <Reveal className="pd-title">
          <h2>Built to this spec</h2>
        </Reveal>
        <div className="pd-spec">
          <Reveal>
            <figure className="pd-blue">
              <RackBlueprint height={s.height} layers={s.layersPerRack} load={s.loadPerLayer} />
              <figcaption>{s.layersPerRack ? "Drawn from the listed height and layers." : "Layer count in the drawing is illustrative."}</figcaption>
            </figure>
          </Reveal>
          <div className="pd-table">
            {specs.map(([k, v], idx) => (
              <Reveal key={k} i={idx * 0.6}>
                <div className="pd-row">
                  <span>{labels[k] || k}</span>
                  <b>{v ?? "On request"}</b>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {p.keyFeatures?.length > 0 && (
        <section className="wrap pd-sec">
          <Reveal className="pd-title">
            <h2>Key features</h2>
          </Reveal>
          <div className="pd-feats">
            {p.keyFeatures.map((f, idx) => (
              <Reveal key={f} className="pd-cell" i={(idx % 2) * 1.2}>
                <div className="pd-feat">
                  <em>{String(idx + 1).padStart(2, "0")}</em>
                  <p>{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.applications?.length > 0 && (
        <section className="wrap pd-sec">
          <div className="pd-apps">
            <Reveal>
              <span className="cat-eyebrow">Applications</span>
              <h2>Where it works</h2>
            </Reveal>
            <ul>
              {p.applications.map((a, idx) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: (idx % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <i>✦</i>
                  <span>{a}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="wrap pd-sec">
          <Reveal className="pd-title">
            <h2>More like this</h2>
            <Link href="/products" className="btn ghost">All products</Link>
          </Reveal>
          <div className="pd-rel">
            {related.map((r, idx) => (
              <Reveal key={r.id} i={idx}>
                <Link href={`/products/${r.slug || r.id}`} className="pd-rcard">
                  <div className="pd-rimg">
                    <img src={r.image} alt={r.name} loading="lazy" />
                  </div>
                  <div className="pd-rbody">
                    <h3>{r.name}</h3>
                    <p>{r.specs?.height} · {r.specs?.loadPerLayer} per layer</p>
                    <span className="pd-rgo" aria-hidden="true"><Arrow /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Reveal>
        <section className="pd-band">
          <div className="pd-band-l">
            <LottieIcon className="pd-band-lottie" colors={WHITE} />
            <div>
              <h2>Need the {p.name} in bulk?</h2>
              <p>Minimum order is {p.moq}. Send us your quantity and site details and we will reply with a quote.</p>
            </div>
          </div>
          <div className="pd-band-r">
            <SplitButton href="/contact">Get a quote</SplitButton>
            {c.phone && <a className="pd-link" href={`tel:${c.phone}`}>{c.phone}</a>}
            {c.email && <a className="pd-link" href={`mailto:${c.email}`}>{c.email}</a>}
          </div>
        </section>
      </Reveal>
    </MotionConfig>
  )
}