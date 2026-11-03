"use client"

import { useEffect, useRef } from "react"
import { testimonials } from "@/lib/testimonials"

const sideFor = (i) => (i % 2 === 0 ? "left" : "right")

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z"
      fill="currentColor"
    />
  </svg>
)

const Stars = ({ className = "" }) => (
  <span className={`flex gap-[3px] text-safety ${className}`} role="img" aria-label="5 out of 5 stars">
    <Star /><Star /><Star /><Star /><Star />
  </span>
)

const QuoteMark = ({ size = 42 }) => (
  <svg
    width={size}
    height={(size * 34) / 42}
    viewBox="0 0 42 34"
    aria-hidden="true"
    className="shrink-0 text-safety"
  >
    <path
      d="M0 34V19C0 8 6 1.5 16 0v6.5C11 8 9 11 9 15h8v19H0zm24 0V19C24 8 30 1.5 40 0v6.5C35 8 33 11 33 15h8v19H24z"
      fill="currentColor"
    />
  </svg>
)

function Author({ data, dark }) {
  const initials = data.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)

  return (
    <div className="mt-5 flex items-center gap-3.5">
      <span className="grid h-[44px] w-[44px] shrink-0 place-items-center overflow-hidden rounded-circle bg-safety font-display text-[1.2rem] font-bold text-ink">
        {data.avatar ? (
          <img src={data.avatar} alt={data.name} className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </span>

      <span className="min-w-0">
        <b className="block leading-[1.3]">{data.name}</b>
        <small className={`block text-[0.82rem] ${dark ? "text-mist" : "text-muted-2"}`}>
          {data.role}, {data.company}
        </small>
      </span>

      <span
        className={`ml-auto whitespace-nowrap rounded-pill border border-solid px-3.5 py-1.5 text-[0.76rem] font-semibold max-[700px]:hidden ${
          dark ? "border-white/35" : "border-line"
        }`}
      >
        {data.project}
      </span>
    </div>
  )
}

const quoteText =
  "max-w-[640px] text-[length:clamp(1rem,1.4vw,1.3rem)] font-medium leading-[1.5]"

function Body({ data, side }) {
  const dark = data.tone === "dark"
  const left = side === "left"

  return (
    <>
      {data.image && (
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 w-[40%] max-[700px]:hidden ${
            left ? "left-0" : "right-0"
          }`}
        >
          <img src={data.image} alt="" className="h-full w-full object-cover" />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${
              left
                ? dark
                  ? "from-transparent via-[#253970]/20 to-[#253970]"
                  : "from-transparent via-white/20 to-white"
                : dark
                  ? "from-[#253970] via-[#253970]/20 to-transparent"
                  : "from-white via-white/20 to-transparent"
            }`}
          />
        </div>
      )}

      <div
        className={`relative flex h-full min-w-0 flex-col justify-between max-[700px]:p-0 max-[700px]:pr-8 ${
          data.image ? (left ? "pl-[38%]" : "pr-[38%]") : ""
        }`}
      >
        <div>
          <QuoteMark />
          <p className={`mt-4 ${quoteText}`}>{data.quote}</p>
          <Stars className="mt-3" />
        </div>
        <Author data={data} dark={dark} />
      </div>
    </>
  )
}

const articleBase =
  "relative h-full overflow-hidden rounded-[28px] border-2 border-solid border-ink px-[34px] py-7 shadow-[0_18px_40px_rgba(31,42,51,0.14)] max-[960px]:p-[22px]"

const tone = (t) => (t === "dark" ? "bg-[#253970] text-white" : "bg-white")

/**
 * Auto-advances a horizontally scrollable list while still allowing
 * manual swipe / drag / wheel. Auto-play pauses on any user interaction
 * and resumes after `resumeDelay` ms of inactivity. Loops back to the
 * start after the last slide.
 */
function useAutoSlide(ref, { interval = 4000, resumeDelay = 6000 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    let paused = false
    let resumeTimer

    const pause = () => {
      paused = true
      clearTimeout(resumeTimer)
    }
    const resumeLater = () => {
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => {
        paused = false
      }, resumeDelay)
    }
    // Any interaction: pause now, resume after inactivity
    const interact = () => {
      pause()
      resumeLater()
    }

    const tick = () => {
      if (paused || document.hidden) return
      // list is display:none on desktop
      if (el.offsetParent === null) return

      const items = Array.from(el.children)
      if (items.length < 2) return

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" })
        return
      }

      // find the slide currently nearest the left edge, then go to the next
      let current = 0
      let best = Infinity
      items.forEach((item, i) => {
        const d = Math.abs(item.offsetLeft - el.scrollLeft)
        if (d < best) {
          best = d
          current = i
        }
      })
      const next = items[Math.min(current + 1, items.length - 1)]
      el.scrollTo({ left: next.offsetLeft, behavior: "smooth" })
    }

    const id = setInterval(tick, interval)

    el.addEventListener("touchstart", interact, { passive: true })
    el.addEventListener("pointerdown", interact)
    el.addEventListener("wheel", interact, { passive: true })
    el.addEventListener("focusin", interact)
    el.addEventListener("mouseenter", pause)
    el.addEventListener("mouseleave", resumeLater)

    return () => {
      clearInterval(id)
      clearTimeout(resumeTimer)
      el.removeEventListener("touchstart", interact)
      el.removeEventListener("pointerdown", interact)
      el.removeEventListener("wheel", interact)
      el.removeEventListener("focusin", interact)
      el.removeEventListener("mouseenter", pause)
      el.removeEventListener("mouseleave", resumeLater)
    }
  }, [ref, interval, resumeDelay])
}

export default function Testimonials() {
  const sliderRef = useRef(null)
  useAutoSlide(sliderRef, { interval: 4000, resumeDelay: 6000 })

  return (
    <section className="py-12 max-[720px]:py-10">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="mb-11 text-center text-[#253970] min-[961px]:mb-[18px]">
          <span className="mt-8 inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']">
            Client stories
          </span>
          <h2 className="mt-3.5 min-[961px]:mt-2 min-[961px]:text-[length:clamp(1.8rem,3.4vw,2.8rem)]">
            What Our Customers Say
          </h2>
        </div>

        {/* Desktop (≥961px) – keep 2-column grid */}
        <div className="hidden min-[961px]:grid min-[961px]:grid-cols-2 min-[961px]:gap-6">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className={`${articleBase} h-auto min-h-[300px] ${tone(t.tone)}`}
            >
              <Body data={t} side={sideFor(i)} />
            </article>
          ))}
        </div>

        {/* Mobile / tablet – auto-sliding + manual swipe */}
        <div className="min-[961px]:hidden">
          <ul
            ref={sliderRef}
            className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide list-none"
          >  
            {testimonials.map((t, i) => (
              <li
                key={t.name}
                className="w-[85vw] max-w-[26rem] shrink-0 snap-start"
              >
                <article
                  className={`${articleBase} h-auto min-h-[300px] ${tone(t.tone)}`}
                >
                  <Body data={t} side={sideFor(i)} />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}