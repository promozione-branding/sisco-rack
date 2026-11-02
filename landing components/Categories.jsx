
"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"

import { industries } from "@/lib/industries"
import SplitButton from "./SplitButton"
import QuoteModal from "./QuoteModal"
import { cardImg } from "@/lib/smImages"

const WHATSAPP_LINK = "https://walink.me/fskx3z"

const openWhatsApp = (e, title) => {
  e.preventDefault()
  e.stopPropagation()

  window.open(
    WHATSAPP_LINK,
    "_blank",
    "noopener,noreferrer"
  )
}

const paths = {
  design: (
    <>
      <path d="M4 20l4-1 10-10-3-3L5 16l-1 4z" />
      <path d="M13 7l3 3" />
    </>
  ),

  install: (
    <path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z" />
  ),

  test: (
    <>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16l4-5" />
    </>
  ),

  fab: (
    <>
      <rect x="4" y="8" width="16" height="10" rx="2" />
      <path d="M8 8V5h8v3" />
    </>
  ),

  mezz: (
    <>
      <path d="M12 4l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16l8 4 8-4" />
    </>
  ),

  maint: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),

  move: <path d="M4 8h13l-3-3M20 16H7l3 3" />,
}

const Icon = ({ name }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths[name]}
  </svg>
)

const Arrow = ({ flip, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    style={flip ? { transform: "scaleX(-1)" } : undefined}
    aria-hidden="true"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const NAV_BTN =
  "grid h-[46px] w-[46px] cursor-pointer place-items-center rounded-circle border-2 border-solid border-ink bg-transparent text-ink transition-[background,color,opacity] duration-[180ms] ease-out hover:enabled:bg-ink hover:enabled:text-white disabled:cursor-default disabled:opacity-30"

const item = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },

  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: Math.min(i, 4) * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const still = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export default function Categories() {
  const track = useRef(null)
  const panel = useRef(null)

  const drag = useRef({
    down: false,
    x: 0,
    left: 0,
    moved: false,
  })

  const inView = useInView(panel, {
    once: true,
    amount: 0.25,
  })

  const reduce = useReducedMotion()

  const [mobile, setMobile] = useState(false)

  const [can, setCan] = useState({
    prev: false,
    next: true,
  })

  const [quote, setQuote] = useState(false)

  const state = inView || reduce ? "show" : "hidden"

  const paused = useRef(false)
  const lastManual = useRef(0)

  const visible = useInView(panel, {
    amount: 0.3,
  })

  // Detect Mobile Screen

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)")

    const update = () => setMobile(mq.matches)

    update()
    mq.addEventListener("change", update)

    return () => mq.removeEventListener("change", update)
  }, [])

  // Open Quote Popup

  const openQuote = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setQuote(true)
  }

  // WhatsApp

  const openCategoryWhatsApp = (e, title) => {
    openWhatsApp(e, title)
  }

  // Slider Measurement - Desktop Only

  const measure = () => {
    const el = track.current
    if (!el) return

    if (window.matchMedia("(max-width: 720px)").matches) {
      setCan({
        prev: false,
        next: false,
      })
      return
    }

    setCan({
      prev: el.scrollLeft > 4,
      next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    })
  }

  useEffect(() => {
    measure()

    window.addEventListener("resize", measure)

    return () => window.removeEventListener("resize", measure)
  }, [mobile])

  // Slider Navigation - Desktop Only

  const step = (dir) => {
    const el = track.current

    if (!el || mobile) return

    const card = el.firstElementChild
    if (!card) return

    const gap = 18

    el.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: "smooth",
    })
  }

  // Auto Slider - Desktop Only

  useEffect(() => {
    if (reduce || !visible || mobile) return

    const id = setInterval(() => {
      const el = track.current

      if (!el || paused.current || drag.current.down) return

      if (Date.now() - lastManual.current < 5000) return

      const atEnd =
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 4

      if (atEnd) {
        el.scrollTo({
          left: 0,
          behavior: "smooth",
        })
      } else {
        step(1)
      }
    }, 1200)

    return () => clearInterval(id)
  }, [reduce, visible, mobile])

  // Mouse Drag - Desktop Only

  const onDown = (e) => {
    if (e.pointerType !== "mouse" || mobile) return

    const el = track.current

    drag.current = {
      down: true,
      x: e.clientX,
      left: el.scrollLeft,
      moved: false,
    }

    el.dataset.dragging = "true"
  }

  const onMove = (e) => {
    const d = drag.current

    if (!d.down || mobile) return

    const dx = e.clientX - d.x

    if (Math.abs(dx) > 5) {
      d.moved = true
    }

    track.current.scrollLeft = d.left - dx
  }

  const end = () => {
    if (!drag.current.down) return

    drag.current.down = false

    if (track.current) {
      delete track.current.dataset.dragging
    }
  }

  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <section className="bg-white py-12 max-[720px]:py-10">

      {/* Section Heading */}

      <div className="mb-11 text-center min-[961px]:mb-[18px]">

        <motion.span
          className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Categories
        </motion.span>

        <h2 className="mt-3.5 min-[961px]:mt-2 min-[961px]:text-[length:clamp(1.8rem,3.4vw,2.8rem)]">
          Explore our <span className="text-blue">Categories</span>
        </h2>

        <p className="mx-auto mt-[18px] max-w-[60ch] text-[1rem] text-muted
         min-[961px]:mt-2 min-[961px]:text-[0.92rem]">
          Our wide range of categories built on trust and premium quality.
        </p>
      </div>

      {/* Main Categories Container */}

      <div className="relative isolate mx-11 overflow-hidden rounded-[36px] 
      border-2 border-solid border-ink bg-[linear-gradient(90deg,#434c54_10%,#e2e2e2_30%)] 
      max-[960px]:mx-3 max-[960px]:rounded-[28px] max-[960px]:bg-none max-[960px]:bg-panel">

        {/* Left Background Image */}

        <div
          className="absolute bottom-0 left-0 top-0 -z-[1]
           flex w-[33%] items-center justify-center 
           bg-[linear-gradient(90deg,#ca8a04_0%,#374151_100%)]
            [mask-image:linear-gradient(90deg,#000_55%,transparent_100%)] max-[960px]:h-[300px] max-[720px]:inset-0 max-[720px]:h-full max-[720px]:w-full max-[720px]:bg-none max-[720px]:[mask-image:none] max-[720px]:after:absolute max-[720px]:after:inset-0 max-[720px]:after:content-[''] max-[720px]:after:bg-[linear-gradient(180deg,rgba(255,255,255,0)_35%,rgba(255,255,255,0.88)_100%)]"
          aria-hidden="true"
        >
          <picture className="max-[720px]:block max-[720px]:h-full max-[720px]:w-full">
            <source
              media="(max-width: 720px)"
              srcSet="/shelf_mobile_347x986.webp"
            />

            <img
              src="/leftslide2.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="max-[720px]:h-full max-[720px]:w-full 
              max-[720px]:object-cover max-[720px]:object-top"
            />
          </picture>
        </div>

        {/* Right Content */}

        <div className="min-w-0 pb-[30px] pl-[32%] pr-10 pt-9 max-[960px]:px-5 max-[960px]:pb-9 max-[960px]:pt-[190px] max-[720px]:px-3 max-[720px]:pb-6 max-[720px]:pt-6">

          <div
            ref={panel}
            className="mt-9 overflow-hidden rounded-[28px] border border-solid border-line bg-white/60 backdrop-blur-[10px] min-[961px]:mt-[18px] max-[720px]:mt-0"
            onMouseEnter={() => {
              paused.current = true
            }}
            onMouseLeave={() => {
              paused.current = false
            }}
            onFocusCapture={() => {
              paused.current = true
            }}
            onBlurCapture={() => {
              paused.current = false
            }}
            onTouchStart={() => {
              paused.current = true
            }}
            onTouchEnd={() => {
              setTimeout(() => {
                paused.current = false
              }, 2500)
            }}
          >

            {/* Category Track
                Desktop: Horizontal Slider
                Mobile: 2 Column Grid
            */}

            <div
              ref={track}
className="grid grid-cols-5 gap-3 p-[22px] max-[720px]:grid-cols-2 max-[720px]:gap-2.5 max-[720px]:p-2.5 min-[721px]:flex min-[721px]:snap-x min-[721px]:snap-mandatory min-[721px]:gap-[18px] min-[721px]:overflow-x-auto min-[721px]:scroll-p-[22px] min-[721px]:[scrollbar-width:none] min-[721px]:[&::-webkit-scrollbar]:hidden"              onScroll={measure}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={end}
              onPointerLeave={end}
              onClickCapture={onClickCapture}
            >

              {industries.map((s, i) => (
                <motion.div
                  key={s.id}
                  className="min-w-0 min-[721px]:flex-[0_0_min(320px,78%)] min-[721px]:snap-start"
                  variants={reduce ? still : item}
                  custom={i}
                  initial="hidden"
                  animate={state}
                >

                  <div
                    className="group/card block h-full select-none rounded-[20px] border border-solid border-line bg-[#e3e8ec] px-2 pb-[18px] pt-2 shadow-lift transition-[transform,box-shadow,border-color] duration-[180ms] ease-out hover:-translate-y-1.5 hover:border-safety hover:shadow-lift-hover max-[720px]:rounded-xl max-[720px]:px-1.5 max-[720px]:pb-2.5 max-[720px]:pt-1.5"
                  >

                    {/* Category Image */}

                    <button
                      type="button"
                      onClick={openQuote}
                      onPointerDown={(e) => e.stopPropagation()}
                      aria-label={`Get a quote for ${s.title}`}
                      className="block h-[260px] w-full cursor-pointer overflow-hidden rounded-[14px] border-0 border-b-[3px] border-solid border-safety bg-[linear-gradient(135deg,#c5ced5,#e9edf0)] p-0 max-[720px]:h-[125px] max-[400px]:h-[105px]"
                    >
                      <img
                        className="pointer-events-none block h-full w-full object-fill transition-transform duration-[250ms] ease-out group-hover/card:scale-[1.06]"
                        {...cardImg(s.image)}
                        width={330}
                        height={260}
                        alt={s.title}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>

                    {/* Category Icon */}

                    <span className="relative z-[2] -mt-[27px] mb-2 ml-4 grid h-[54px] w-[54px] place-items-center rounded-circle border-4 border-solid border-white bg-safety text-ink max-[720px]:-mt-5 max-[720px]:mb-1.5 max-[720px]:ml-2 max-[720px]:h-9 max-[720px]:w-9 max-[720px]:border-[3px]">
                      <span className="max-[720px]:scale-[0.75]">
                        <Icon name={s.icon} />
                      </span>
                    </span>

                    {/* Category Information */}

                    <div className="flex items-end justify-between gap-3 px-3 text-left max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2 max-[720px]:px-1.5">

                      <div className="min-w-0 flex-1">

                        {s.action === "quote" ? (
                          <button
                            type="button"
                            onClick={openQuote}
                            className="cursor-pointer border-0 bg-transparent p-0 text-left font-body text-[1rem] font-bold leading-[1.3] text-inherit max-[720px]:text-[0.78rem]"
                          >
                            {s.title}
                          </button>
                        ) : (
                          <Link
                            href={`/products/${s.slug}`}
                            className="font-body text-[1rem] font-bold leading-[1.3] text-inherit max-[720px]:text-[0.78rem]"
                          >
                            {s.title}
                          </Link>
                        )}

                        {/* Description - Hidden on Mobile */}

                        <p className="mt-1.5 line-clamp-2 text-[0.84rem] leading-[1.5] text-muted-2 max-[720px]:hidden">
                          {s.text}
                        </p>
                      </div>

                      {/* Right Side Icons */}

                      <div className="flex shrink-0 items-center gap-2.5 max-[720px]:w-full max-[720px]:justify-end max-[720px]:gap-2">

                        {/* WhatsApp */}

                        <button
                          type="button"
                          aria-label={`Chat on WhatsApp about ${s.title}`}
                          title="Chat on WhatsApp"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) =>
                            openCategoryWhatsApp(e, s.title)
                          }
                          className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-circle border-0 bg-[#25D366] text-white shadow-[0_6px_14px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:scale-110 max-[720px]:h-8 max-[720px]:w-8"
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="max-[720px]:h-[19px] max-[720px]:w-[19px]"
                          >
                            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.23 8.21z" />
                          </svg>
                        </button>

                        {/* Arrow - Opens Quote Popup */}

                        <button
                          type="button"
                          aria-label={`Get a quote for ${s.title}`}
                          title="Get a quote"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={openQuote}
                          className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-circle border border-solid border-line bg-white text-ink transition-[background,border-color] duration-[180ms] ease-out hover:border-safety hover:bg-safety max-[720px]:h-8 max-[720px]:w-8"
                        >
                          <Arrow size={22} />
                        </button>

                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>

          {/* Bottom Content & Navigation */}

          <div className="mt-[30px] flex flex-wrap items-center justify-between gap-6 min-[961px]:mt-4">

            <p className="max-w-[44ch] text-[0.92rem] text-black backdrop-blur-sm">
              From design and fabrication to installation and inspection, we deliver reliable racking services built to improve efficiency and safety.
            </p>

            {/* Desktop Navigation */}

            <div className="flex items-center gap-2.5 max-[720px]:hidden">

              <button
                className={NAV_BTN}
                onClick={() => {
                  lastManual.current = Date.now()
                  step(-1)
                }}
                disabled={!can.prev}
                aria-label="Previous category"
              >
                <Arrow flip />
              </button>

              <button
                className={NAV_BTN}
                onClick={() => {
                  lastManual.current = Date.now()
                  step(1)
                }}
                disabled={!can.next}
                aria-label="Next category"
              >
                <Arrow />
              </button>

              <SplitButton
                onClick={openQuote}
                dark
                className="ml-1.5"
              >
                Get a Quote
              </SplitButton>

            </div>

            {/* Mobile Get Quote Button */}

            <div className="hidden max-[720px]:block">
              <SplitButton
                onClick={openQuote}
                dark
              >
                Get a Quote
              </SplitButton>
            </div>

          </div>
        </div>
      </div>

      {/* Get a Free Quote Popup */}

      <QuoteModal
        open={quote}
        onClose={() => setQuote(false)}
      />

    </section>
  )
}
