"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, MotionConfig, useInView, animate } from "framer-motion"
import SplitButton from "./SplitButton"
import RackBlueprint from "./RackBlueprint"
import ShelfCrew from "./ShelfCrew"
import QuoteModal from "./QuoteModal"
import {
  ShieldCheck, Truck, Award, Settings, Heart, Share2, MessageCircle, Phone,
  IndianRupee, FileText, ShoppingBag, ArrowUpDown, Layers, Package, PaintBucket,
  LayoutGrid, Columns3, Boxes, Wrench, Warehouse, Factory, Store, Lock,
  BadgeCheck
} from "lucide-react"

const UP = "absolute bottom-0 top-0 w-4 bg-blue bg-[radial-gradient(circle,var(--panel)_2.5px,transparent_3.5px)] bg-[length:16px_24px] bg-[position:center_6px]"
const THUMB = "relative h-[84px] w-[84px] cursor-pointer rounded-[14px] border-2 border-solid bg-white p-1 transition-[transform,box-shadow,border-color] duration-[180ms] ease-out hover:-translate-y-[5px] max-[720px]:h-16 max-[720px]:w-16"
const ARROW = "absolute top-1/2 z-[2] -mt-[21px] grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-circle border-2 border-solid border-ink bg-white text-ink transition-[background,color] duration-[180ms] hover:bg-ink hover:text-white"

const CARD = "rounded-[24px] border border-solid border-line bg-white shadow-[0_6px_24px_rgba(38,58,75,0.06)]"
const BTN = "inline-flex items-center justify-center gap-2.5 rounded-[12px] border-2 border-solid border-blue bg-white px-7 py-3.5 text-[1rem] font-bold text-ink transition-[background,color] duration-[200ms] [font-family:inherit] hover:bg-blue hover:text-white"
const TILE_LABEL = "block text-[0.72rem] font-semibold uppercase tracking-[0.04em]"
const TILE_VALUE = "mt-0.5 block font-display text-[1.45rem] font-bold leading-[1.15] text-ink"

const labels = {
  height: "Height",
  layersPerRack: "Layers per rack",
  loadPerLayer: "Load per layer",
  material: "Material",
  surfaceTreatment: "Surface treatment",
  productType: "Frame type",
  usage: "Usage"
}

const specIcons = {
  height: ArrowUpDown,
  layersPerRack: Layers,
  loadPerLayer: Lock,
  material: Package,
  surfaceTreatment: PaintBucket,
  productType: Columns3,
  usage: LayoutGrid
}

const trust = [
  { Icon: ShieldCheck, title: "Quality Assured", text: "Color-coated mild steel" },
  { Icon: Truck, title: "Reliable Delivery", text: "Pan-India shipping" },
  { Icon: Award, title: "Trusted Maker", text: "Sisco Steel Industry standard" },
  { Icon: Settings, title: "Custom Sizes", text: "Available on request" }
]

const defaultHighlights = [
  { Icon: Layers, title: "Strong & Durable", text: "Premium-quality mild steel construction for long-lasting performance." },
  { Icon: Settings, title: "Stable Structure", text: "Sturdy angle frame design for enhanced stability and load-bearing capacity." },
  { Icon: ShieldCheck, title: "Rust Protection", text: "Color-coated surface treatment protects against rust, corrosion, and wear." },
  { Icon: Wrench, title: "Easy Assembly", text: "Slotted design allows easy assembly, adjustment, and shelf customization." },
  {
    Icon: BadgeCheck,
    title: "Trusted Manufacturer",
    text: "Precision-manufactured storage solutions built for consistent quality and reliable performance.",
  },
]
const hlIcons = [Layers, Settings, ShieldCheck, Wrench]
const hlTints = ["bg-[#e3effd] text-blue", "bg-[#e3effd] text-blue", "bg-[#fdf1d3] text-[#e8a317]", "bg-[#e3effd] text-blue"]

const appIcons = [Warehouse, Boxes, Factory, Store]

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

function SectionTitle({ children, light }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className={`text-[length:clamp(1.5rem,2.4vw,2rem)] ${light ? "text-white" : ""}`}>{children}</h2>
      <span className="h-[3px] w-14 rounded-pill bg-safety" aria-hidden="true" />
    </div>
  )
}

function Gallery({ images, name }) {
  const [i, setI] = useState(0)
  const go = (n) => setI((n + images.length) % images.length)

  return (
    <div className="sticky top-[110px] flex min-w-0 flex-col gap-4 max-[960px]:static">
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
  const [quote, setQuote] = useState(false)
  const [wish, setWish] = useState(false)

  const openQuote = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setQuote(true)
  }

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) await navigator.share({ title: p.name, url })
      else await navigator.clipboard.writeText(url)
    } catch (_) {}
  }

  const highlights = (p.highlights?.length
    ? p.highlights.map((h, k) => ({ Icon: hlIcons[k % hlIcons.length], title: h.title, text: h.text }))
    : defaultHighlights)

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
            <span className="rounded-pill border-[1.5px] border-solid border-safety bg-white/[0.85] px-4 py-[7px] text-[0.82rem] font-semibold">{p.category}</span>
            <span className="rounded-pill border-[1.5px] border-solid border-line bg-white/[0.85] px-4 py-[7px] text-[0.82rem] font-semibold">{p.brand}</span>
            {s.height && <span className="rounded-pill border-[1.5px] border-solid border-line bg-white/[0.85] px-4 py-[7px] text-[0.82rem] font-semibold">{s.height} tall</span>}
          </motion.div>
        </div>
      </section>

      <div className="bg-[#f6f8fb] pb-2 pt-11">
        <div className="mx-auto grid max-w-full grid-cols-[minmax(0,0.8fr)_minmax(0,0.85fr)] items-start gap-12 px-14 max-[960px]:grid-cols-[1fr] max-[960px]:gap-7 max-[960px]:px-10 max-[720px]:px-5">
          <Gallery images={images} name={p.name} />

          <div>
            <motion.div className="flex flex-wrap items-center justify-between gap-3" variants={rise} custom={0} initial="hidden" animate="show">
              <span className="rounded-pill bg-[#dbeafe] px-3.5 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.03em] text-blue">{p.category}</span>
         
            </motion.div>

            <motion.p className="mt-5 max-w-[62ch] text-[1.05rem] leading-[1.6] text-muted" variants={rise} custom={2} initial="hidden" animate="show">
              {p.description}
            </motion.p>

            <motion.div className="mt-6 grid grid-cols-[repeat(3,1fr)] gap-3 max-[720px]:grid-cols-[1fr]" variants={rise} custom={3} initial="hidden" animate="show">
              <div className="flex items-center gap-4 rounded-[18px] bg-[#fdf3dc] px-5 py-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-circle bg-[#fbe5b0] text-[#d98c00]"><IndianRupee size={26} strokeWidth={2.5} /></span>
                <div>
                  <small className={`${TILE_LABEL} text-[#b9770a]`}>Price</small>
                  <b className={TILE_VALUE}>{p.price}</b>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[18px] bg-[#e3effd] px-5 py-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-circle bg-[#cfe2fa] text-blue"><FileText size={26} strokeWidth={2.2} /></span>
                <div>
                  <small className={`${TILE_LABEL} text-blue`}>Minimum order</small>
                  <b className={TILE_VALUE}>{p.moq}</b>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[18px] bg-[#e2f4e6] px-5 py-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-circle bg-[#c8ebd0] text-[#1f8a3b]"><ShoppingBag size={26} strokeWidth={2.2} /></span>
                <div>
                  <small className={`${TILE_LABEL} text-[#1f8a3b]`}>Load per layer</small>
                  <b className={TILE_VALUE}><CountUp value={s.loadPerLayer} /></b>
                </div>
              </div>
            </motion.div>

            <motion.div className="mt-5 flex flex-wrap items-center gap-3" variants={rise} custom={4} initial="hidden" animate="show">
              <div onClickCapture={openQuote}>
                <SplitButton dark>Request a quote</SplitButton>
              </div>
              {c.whatsapp && (
                <a className={BTN} href={c.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle size={22} strokeWidth={2.2} /> WhatsApp
                </a>
              )}
              {c.phone && (
                <a className={BTN} href={`tel:${c.phone}`}>
                  <Phone size={22} strokeWidth={2.2} /> Call now
                </a>
              )}
            </motion.div>

            <motion.div className={`${CARD} mt-6 grid grid-cols-[repeat(4,1fr)] max-[960px]:grid-cols-[1fr_1fr] max-[480px]:grid-cols-[1fr]`} variants={rise} custom={5} initial="hidden" animate="show">
              {trust.map(({ Icon, title, text }, k) => (
                <div key={title} className={`flex items-center gap-2 px-4 py-4 ${k > 0 ? "border-l border-solid border-line max-[960px]:odd:border-l-0 max-[480px]:border-l-0" : ""}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-circle bg-[#fdf1d3] text-[#e8a317]" aria-hidden="true"><Icon size={20} strokeWidth={2.2} /></span>
                  <div className="min-w-0">
                    <strong className="block text-[0.82rem] font-bold leading-[1.25]">{title}</strong>
                    <span className="mt-0.5 block text-[0.72rem] leading-[1.35] text-muted-2">{text}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <section className="mx-auto max-w-full px-14 pt-8 max-[960px]:px-10 max-[720px]:px-5">
          <Reveal>
            <div className={`${CARD} grid grid-cols-[1fr_1.05fr_0.85fr] gap-6 p-6 max-[1180px]:grid-cols-[1fr_1fr] max-[960px]:grid-cols-[1fr]`}>
              <div className="flex flex-col">
                <SectionTitle>Built to this spec</SectionTitle>
                <div className="mt-5 flex flex-col gap-2">
                  {specs.map(([k, v]) => {
                    const Icon = specIcons[k] || LayoutGrid
                    return (
                      <div key={k} className="flex items-center gap-4 rounded-[10px] bg-[#f3f5f8] px-4 py-2.5 text-[0.92rem]">
                        <Icon size={20} strokeWidth={2} className="shrink-0 text-ink" aria-hidden="true" />
                        <span className="font-medium text-ink">{labels[k] || k}</span>
                        <span className="ml-auto text-right text-muted">{v ?? "On request"}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <figure className="grid place-items-center gap-2 rounded-[18px] bg-[#f3f5f8] bg-[radial-gradient(rgba(122,139,153,0.28)_1px,transparent_1px)] bg-[length:14px_14px] p-4 max-[1180px]:order-3 max-[1180px]:col-span-2 max-[960px]:col-span-1">
                <RackBlueprint height={s.height} layers={s.layersPerRack} load={s.loadPerLayer} />
                <figcaption className="text-[0.72rem] text-muted-2">{s.layersPerRack ? "Drawn from the listed height and layers." : "Layer count in the drawing is illustrative."}</figcaption>
              </figure>

              <div className="flex flex-col justify-center gap-5 rounded-lg border border-solid border-line p-4 bg-[#f3f5f8]">
                {highlights.map(({ Icon, title, text }, k) => (
                  <div key={title} className="flex items-start gap-4">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-circle ${hlTints[k % hlTints.length]}`} aria-hidden="true"><Icon size={22} strokeWidth={2} /></span>
                    <div>
                      <strong className="block text-[0.95rem] font-bold leading-[1.25]">{title}</strong>
                      <p className="mt-1 text-[0.82rem] leading-[1.45] text-muted-2">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {(p.keyFeatures?.length > 0 || p.applications?.length > 0) && (
          <section className="mx-auto max-w-full px-14 pt-6 max-[960px]:px-10 max-[720px]:px-5">
            <div className="grid grid-cols-[1.45fr_1fr] items-stretch gap-6 max-[1180px]:grid-cols-[1fr]">
              {p.keyFeatures?.length > 0 && (
                <Reveal className="flex">
                  <div className={`${CARD} w-full p-6`}>
                    <SectionTitle>Key features</SectionTitle>
                    <div className="mt-12 grid grid-cols-[repeat(3,1fr)] gap-x-6 gap-y-12 max-[960px]:grid-cols-[1fr_1fr] max-[720px]:grid-cols-[1fr]">
                      {p.keyFeatures.map((f, idx) => (
                        <div key={f} className="flex items-start gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-circle bg-[#f5b82e] text-[0.78rem] font-bold text-white shadow-[0_0_0_4px_#fdf1d3]">{String(idx + 1).padStart(2, "0")}</span>
                          <p className="text-[0.82rem] leading-[1.45] text-muted">{f}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {p.applications?.length > 0 && (
                <Reveal className="flex">
                  <div className="w-full rounded-[24px] bg-[linear-gradient(155deg,#12347a_0%,#0c2457_100%)] p-6 text-white">
                    <SectionTitle light>Where it works</SectionTitle>
                    <ul className="mt-5 grid list-none grid-cols-[1fr_1fr] gap-4 max-[720px]:grid-cols-[1fr]">
                      {p.applications.map((a, idx) => {
                        const app = typeof a === "string" ? { title: a } : a
                        const Icon = appIcons[idx % appIcons.length]
                        const img = app.image || images[(idx + 1) % images.length]
                        return (
                        <li key={app.title} className="flex items-center gap-3">
  <img className="h-[62px] w-[84px] shrink-0 rounded-[8px] object-cover" src={img} alt="" loading="lazy" />
  <div className="min-w-0">
    <span className="flex items-start gap-1.5 text-[0.85rem] font-bold leading-[1.45]">
      <Icon size={18} strokeWidth={2.2} className="mt-[0.2em] shrink-0" aria-hidden="true" />
      <span>{app.title}</span>
    </span>
    {app.description && <span className="mt-0.5 block text-[0.74rem] leading-[1.35] text-white/75">{app.description}</span>}
  </div>
</li>
                        )
                      })}
                    </ul>
                  </div>
                </Reveal>
              )}
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
          <section className="mx-14 my-16 flex flex-wrap items-center justify-between gap-8 rounded-[36px] border-2 border-solid border-ink bg-ink px-12 py-11 text-white max-[960px]:mx-3 max-[960px]:my-12 max-[960px]:rounded-[28px] max-[960px]:px-6 max-[960px]:py-8">
            <div>
              <h2 className="max-w-[20ch] text-[length:clamp(1.7rem,3.2vw,2.7rem)] text-white">Need the {p.name} in bulk?</h2>
              <p className="mt-2 max-w-[46ch] text-mist">Minimum order is {p.moq}. Send us your quantity and site details and we will reply with a quote.</p>
            </div>
            <div className="flex flex-col items-start gap-2.5">
              <div onClickCapture={openQuote}>
                <SplitButton>Request a quote</SplitButton>
              </div>
              {c.phone && <a className="font-semibold text-white hover:text-safety" href={`tel:${c.phone}`}>{c.phone}</a>}
              {c.email && <a className="font-semibold text-white hover:text-safety" href={`mailto:${c.email}`}>{c.email}</a>}
            </div>
          </section>
        </Reveal>
      </div>

      <QuoteModal open={quote} onClose={() => setQuote(false)} />
    </MotionConfig>
  )
}