"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, MotionConfig, useInView, animate } from "framer-motion"
import SplitButton from "./SplitButton"
import LottieIcon from "./LottieIcon"
import RackBlueprint from "./RackBlueprint"
import { ShieldCheck, Truck, Award } from "lucide-react"
import ShelfCrew from "./ShelfCrew"
import QuoteModal from "./QuoteModal"

const UP = "absolute bottom-0 top-0 w-4 bg-blue bg-[radial-gradient(circle,var(--panel)_2.5px,transparent_3.5px)] bg-[length:16px_24px] bg-[position:center_6px]"
const THUMB = "relative h-[84px] w-[84px] cursor-pointer rounded-[14px] border-2 border-solid bg-white p-1 transition-[transform,box-shadow,border-color] duration-[180ms] ease-out hover:-translate-y-[5px] max-[720px]:h-16 max-[720px]:w-16"
const ARROW = "absolute top-1/2 z-[2] -mt-[21px] grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-circle border-2 border-solid border-ink bg-white text-ink transition-[background,color] duration-[180ms] hover:bg-ink hover:text-white"
const TILE = "relative rounded-[20px] border-2 border-solid px-[18px] py-4 max-[720px]:first:col-[span_2]"
const TSMALL = "block text-[0.7rem] font-semibold uppercase tracking-[0.12em]"
const TB = "mt-1 block font-display text-[1.7rem] leading-[1.1]"
const CHIP = "rounded-pill border-[1.5px] border-solid bg-white/[0.85] px-4 py-[7px] text-[0.82rem] font-semibold"
const ICON = "mt-0.5 block h-9 w-9 shrink-0 place-items-center rounded-circle bg-safety pl-1 pt-[3px] text-[0.8rem] leading-[1.35] text-muted-2"

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
    <div className="sticky top-[110px] flex min-w-0 flex-col gap-4 max-[960px]:static">
      {/* Main image */}
      <div className="relative grid place-items-center overflow-hidden rounded-[28px] border-2 border-solid border-ink bg-white">
        <span className={`${UP} left-3.5`} />
        <span className={`${UP} right-3.5`} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={i}
            src={images[i]}
            alt={name}
            className="relative z-[1] h-[620px] w-full object-cover max-[720px]:h-[320px]"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.96 }}
            transition={{ duration: 0.28 }}
          />
        </AnimatePresence>
        <span className="absolute bottom-3 left-1/2 z-[2] -translate-x-1/2 rounded-pill bg-ink px-3.5 py-1 text-[0.75rem] font-semibold text-white">{i + 1} / {images.length}</span>
        {images.length > 1 && (
          <>
            <button className={`${ARROW} left-3`} onClick={() => go(i - 1)} aria-label="Previous image"><Arrow flip /></button>
            <button className={`${ARROW} right-3`} onClick={() => go(i + 1)} aria-label="Next image"><Arrow /></button>
          </>
        )}
      </div>

      {/* Thumbnails below */}
      <div className="flex gap-3 overflow-x-auto px-1 pb-2 pt-3">
        {images.map((src, k) => (
          <motion.div
            key={src}
            className="shrink-0"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 13, delay: 0.5 + k * 0.13 }}
          >
            <button className={`${THUMB} ${k === i ? "border-safety shadow-[0_0_0_3px_var(--safety)]" : "border-ink"}`} onClick={() => go(k)} aria-label={`Show image ${k + 1}`}>
              <img className="block h-full w-full object-contain" src={src} alt="" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetail({ product: p, related }) {
  const specs = Object.entries(p.specs || {})
  const s = p.specs || {}
  const c = p.contact || {}
  const images = p.images?.length ? p.images : [p.image]
    const [open, setOpen] = useState(false)
      const [drop, setDrop] = useState(false)
const [quote, setQuote] = useState(false)
const openQuote = (e) => {
  e.preventDefault()
  e.stopPropagation()
  setOpen(false)
  setDrop(false)
  setQuote(true)
}
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate overflow-hidden border-2 border-solid border-ink bg-[linear-gradient(165deg,#c9eaf2_0%,#dbe3fa_40%,#f6f8f9_100%)] pb-10 pt-[124px] before:absolute before:inset-0 before:-z-[1] before:content-[''] before:bg-[repeating-linear-gradient(0deg,rgba(62,92,118,0.14)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(62,92,118,0.1)_0_1px,transparent_1px_7px)] before:[mask-image:linear-gradient(170deg,#000_0%,transparent_70%)] max-[960px]:mx-3 max-[960px]:mt-2.5 max-[960px]:rounded-[28px] max-[960px]:pb-8 max-[960px]:pt-[104px]">
  <ShelfCrew />
  <div className="relative z-[1] mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
          <motion.nav className="flex flex-wrap gap-2 text-[0.85rem] font-semibold text-muted-3" aria-label="Breadcrumb" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/" className="hover:text-blue">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue">Products</Link>
            <span>/</span>
            <span>{p.category}</span>
          </motion.nav>
          <motion.h1 className="mt-3.5 max-w-[16ch] text-[length:clamp(2.6rem,6vw,5rem)]" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {p.name}
          </motion.h1>
          <motion.div className="mt-[18px] flex flex-wrap gap-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className={`${CHIP} border-safety`}>{p.category}</span>
            <span className={`${CHIP} border-line`}>{p.brand}</span>
            {s.height && <span className={`${CHIP} border-line`}>{s.height} tall</span>}
          </motion.div>
        </div>
      </section>

<div className="mx-auto grid max-w-full grid-cols-[minmax(0,0.8fr)_minmax(0,0.85fr)] items-start gap-12 px-14 pt-11 max-[960px]:grid-cols-[1fr] max-[960px]:gap-7 max-[960px]:px-10 max-[720px]:px-5">
        <Gallery images={images} name={p.name} />
        <div>
          <motion.div className="grid grid-cols-[repeat(3,1fr)] gap-3 max-[720px]:grid-cols-[1fr_1fr]" variants={rise} custom={1} initial="hidden" animate="show">
            <div className={`${TILE} border-ink bg-white`}>
              <small className={`${TSMALL} text-muted-2`}>Price</small>
              <b className={TB}>{p.price}</b>
            </div>
            <div className={`${TILE} border-ink bg-white`}>
              <small className={`${TSMALL} text-muted-2`}>Minimum order</small>
              <b className={TB}>{p.moq}</b>
            </div>
            <div className={`${TILE} border-navy bg-navy text-white`}>
              <small className={`${TSMALL} text-mist`}>Load per layer</small>
              <b className={TB}><CountUp value={s.loadPerLayer} /></b>
              <LottieIcon className="absolute right-2 top-2 h-[34px] w-[34px]" colors={WHITE} />
            </div>
          </motion.div>
          <motion.p className="mt-[22px] text-muted" variants={rise} custom={2} initial="hidden" animate="show">
            {p.description}
          </motion.p>
              <motion.div className="mt-6 flex flex-wrap items-center gap-3" variants={rise} custom={3} initial="hidden" animate="show">
            <div onClickCapture={openQuote}>
  <SplitButton dark>Get a quote</SplitButton>
</div>
            {c.whatsapp && <a className="inline-block cursor-pointer border-2 border-solid border-ink bg-transparent px-7 py-3.5 text-[1rem] font-semibold text-ink transition-[background,color] duration-[250ms] [font-family:inherit] hover:bg-ink hover:text-bg rounded-[14px]" href={c.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}
            {c.phone && <a className="inline-block cursor-pointer border-2 border-solid border-ink bg-transparent px-7 py-3.5 text-[1rem] font-semibold text-ink transition-[background,color] duration-[250ms] [font-family:inherit] hover:bg-ink hover:text-bg rounded-[14px]" href={`tel:${c.phone}`}>Call now</a>}
          </motion.div>

          <motion.div className="mt-7 grid grid-cols-[repeat(3,1fr)] gap-3 max-[720px]:mt-[22px] max-[720px]:grid-cols-[1fr] max-[720px]:gap-2.5" variants={rise} custom={4} initial="hidden" animate="show">
            <div className="flex items-start gap-3 rounded-2xl border-2 border-solid border-ink bg-white px-4 py-3.5 max-[720px]:px-3.5 max-[720px]:py-3">
              <span className={ICON} aria-hidden="true">
                <ShieldCheck size={28} strokeWidth={2.5} />
              </span>
              <div>
                <strong className="block text-[0.95rem] font-bold leading-[1.25]">Quality Assured</strong>
                <span className="mt-0.5 block pl-1 pt-[3px] text-[0.8rem] leading-[1.35] text-muted-2">Color-coated mild steel</span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border-2 border-solid border-ink bg-white px-4 py-3.5 max-[720px]:px-3.5 max-[720px]:py-3">
              <span className={ICON} aria-hidden="true">
                <Truck size={28} strokeWidth={2.5} />
              </span>
              <div>
                <strong className="block text-[0.95rem] font-bold leading-[1.25]">Reliable Delivery</strong>
                <span className="mt-0.5 block pl-1 pt-[3px] text-[0.8rem] leading-[1.35] text-muted-2">Pan-India shipping</span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border-2 border-solid border-ink bg-white px-4 py-3.5 max-[720px]:px-3.5 max-[720px]:py-3">
              <span className={ICON} aria-hidden="true">
                <Award size={28} strokeWidth={2.5} />
              </span>
              <div>
                <strong className="block text-[0.95rem] font-bold leading-[1.25]">Trusted Maker</strong>
                <span className="mt-0.5 block pl-1 pt-[3px] text-[0.8rem] leading-[1.35] text-muted-2">Sisco Steel Industry standard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="mx-auto max-w-full px-14 pt-16 max-[960px]:px-10 max-[720px]:px-5">
        <Reveal className="mb-[26px] flex items-end justify-between gap-6">
          <h2 className="text-[length:clamp(1.9rem,3.6vw,3rem)]">Built to this spec</h2>
        </Reveal>
        <div className="grid grid-cols-[0.9fr_1.1fr] items-stretch gap-6 max-[960px]:grid-cols-[1fr]">
          <Reveal className="flex flex-col">
            <figure className="grid h-full place-items-center gap-2.5 rounded-[32px] border-2 border-solid border-ink bg-white bg-[linear-gradient(rgba(122,139,153,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(122,139,153,0.16)_1px,transparent_1px)] bg-[length:24px_24px] p-6">
              <RackBlueprint height={s.height} layers={s.layersPerRack} load={s.loadPerLayer} />
              <figcaption className="text-[0.78rem] font-semibold text-muted-2">{s.layersPerRack ? "Drawn from the listed height and layers." : "Layer count in the drawing is illustrative."}</figcaption>
            </figure>
          </Reveal>
          <div className="flex flex-col overflow-hidden rounded-[28px] border-2 border-solid border-ink bg-white">
            {specs.map(([k, v], idx) => (
              <Reveal key={k} i={idx * 0.6}>
                <div className={`flex justify-between gap-5 border-b border-solid border-line px-6 py-[18px] transition-[background] duration-[180ms] hover:bg-panel ${idx === specs.length - 1 ? "border-b-0" : ""}`}>
                  <span className="font-semibold text-muted-2">{labels[k] || k}</span>
                  <b className="text-right">{v ?? "On request"}</b>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {p.keyFeatures?.length > 0 && (
        <section className="mx-auto max-w-full px-14 pt-16 max-[960px]:px-10 max-[720px]:px-5">
          <Reveal className="mb-[26px] flex items-end justify-between gap-6">
            <h2 className="text-[length:clamp(1.9rem,3.6vw,3rem)]">Key features</h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(2,1fr)] gap-[18px] max-[960px]:grid-cols-[1fr]">
            {p.keyFeatures.map((f, idx) => (
              <Reveal key={f} className="flex" i={(idx % 2) * 1.2}>
                <div className="relative flex-1 rounded-[24px] border-2 border-solid border-ink bg-white py-[26px] pl-[92px] pr-[26px] transition-[transform,box-shadow,background] duration-[180ms] ease-out hover:-translate-y-[5px] hover:bg-panel hover:shadow-soft max-[720px]:py-[22px] max-[720px]:pl-[76px] max-[720px]:pr-5">
                  <em className="absolute left-6 top-5 font-display text-[2.6rem] font-bold not-italic leading-none text-safety max-[720px]:left-[18px] max-[720px]:text-[2.2rem]">{String(idx + 1).padStart(2, "0")}</em>
                  <p>{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.applications?.length > 0 && (
        <section className="mx-auto max-w-full px-14 pt-16 max-[960px]:px-10 max-[720px]:px-5">
          <div className="rounded-[32px] border-2 border-solid border-ink bg-[linear-gradient(155deg,#3e5c76_0%,#263a4b_100%)] p-10 text-white max-[960px]:px-[22px] max-[960px]:py-7">
            <Reveal>
              <span className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-mist after:h-px after:w-12 after:bg-steel-deep after:content-['']">Applications</span>
              <h2 className="mt-2.5 text-[length:clamp(1.9rem,3.6vw,3rem)] text-white">Where it works</h2>
            </Reveal>
            <ul className="mt-[26px] grid list-none grid-cols-[1fr_1fr] gap-x-6 gap-y-3 max-[960px]:grid-cols-[1fr]">
              {p.applications.map((a, idx) => (
                <motion.li
                  key={a}
                  className="flex items-start gap-3.5 rounded-2xl border border-solid border-white/[0.22] bg-white/[0.07] px-4 py-3.5 transition-[background] duration-[180ms] hover:bg-white/[0.14]"
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: (idx % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <i className="not-italic text-safety">✦</i>
                  <span>{a}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-full px-14 pt-16 max-[960px]:px-10 max-[720px]:px-5">
          <Reveal className="mb-[26px] flex items-end justify-between gap-6">
            <h2 className="text-[length:clamp(1.9rem,3.6vw,3rem)]">More like this</h2>
            <Link href="/products" className="inline-block cursor-pointer border-2 border-solid border-ink bg-transparent px-7 py-3.5 text-[1rem] font-semibold text-ink transition-[background,color] duration-[250ms] [font-family:inherit] hover:bg-ink hover:text-bg rounded-pill">All products</Link>
          </Reveal>
          <div className="grid grid-cols-[repeat(3,1fr)] gap-5 max-[720px]:grid-cols-[1fr] max-[960px]:grid-cols-[1fr_1fr]">
            {related.map((r, idx) => (
              <Reveal key={r.id} i={idx}>
                <Link href={`/products/${r.slug || r.id}`} className="group/r block h-full overflow-hidden rounded-[24px] border-2 border-solid border-ink bg-white transition-[transform,box-shadow] duration-[180ms] ease-out hover:-translate-y-1.5 hover:shadow-lift-hover">
                  <div className="grid h-[400px] place-items-center border-b-[3px] border-solid border-safety bg-white p-2">
                    <img className="max-h-full max-w-full object-contain transition-transform duration-[250ms] ease-out group-hover/r:scale-[1.06]" src={r.image} alt={r.name} loading="lazy" />
                  </div>
                  <div className="relative bg-cool pb-5 pl-5 pr-16 pt-4">
                    <h3 className="font-body text-[1rem] font-bold leading-[1.3] tracking-normal">{r.name}</h3>
                    <p className="mt-1 text-[0.84rem] text-muted-2">{r.specs?.height} · {r.specs?.loadPerLayer} per layer</p>
                    <span className="absolute bottom-[18px] right-[18px] grid h-[34px] w-[34px] place-items-center rounded-circle border border-solid border-line bg-white transition-[background] duration-[180ms] group-hover/r:border-safety group-hover/r:bg-safety" aria-hidden="true"><Arrow /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Reveal>
        <section className="mx-11 my-16 flex flex-wrap items-center justify-between gap-8 rounded-[36px] border-2 border-solid border-ink bg-ink px-12 py-11 text-white max-[960px]:mx-3 max-[960px]:my-12 max-[960px]:rounded-[28px] max-[960px]:px-6 max-[960px]:py-8">
          <div className="flex w-[65%] items-center gap-[22px]">
            <LottieIcon className="h-[84px] w-[84px] shrink-0" colors={WHITE} />
            <div>
              <h2 className="max-w-[20ch] text-[length:clamp(1.7rem,3.2vw,2.7rem)] text-white">Need the {p.name} in bulk?</h2>
              <p className="mt-2 max-w-[46ch] text-mist">Minimum order is {p.moq}. Send us your quantity and site details and we will reply with a quote.</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <div onClickCapture={openQuote}>
  <SplitButton >Get a quote</SplitButton>
</div>
            {c.phone && <a className="font-semibold text-white hover:text-safety" href={`tel:${c.phone}`}>{c.phone}</a>}
            {c.email && <a className="font-semibold text-white hover:text-safety" href={`mailto:${c.email}`}>{c.email}</a>}
          </div>
        </section>
      </Reveal>
      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </MotionConfig>
  )
}