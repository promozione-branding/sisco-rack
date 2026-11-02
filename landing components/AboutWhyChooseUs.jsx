"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { reasons } from "@/lib/data"

const NAVY = "#0b1a40"
const YELLOW = "#f5b800"
const BLUE = "#1f4fd8"

const icons = [
  <>
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </>,
  <>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </>,
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </>,
  <>
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="m16.71 13.88.7.71-2.82 2.82" />
  </>,
  <>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </>,
]

const defaultItems = reasons.slice(0, 5).map((r, i) => ({ ...r, icon: i }))

const defaultEyebrow = "Our Advantages"
const defaultHeadingStart = "Why"
const defaultHeadingEnd = "Choose Us?"
const defaultIntro =
  "We are engaged in providing our esteemed clients a premium quality array of Fruits and Vegetable Racks, Heavy Duty Racks, Modern Bookshelves, Shopping Basket, Supermarket Rack and many more. Offered products range is in complete compliance with set industry standards."
const defaultNote =
  "The following major factors contribute towards our tremendous growth and success in the industry."
const defaultBadge = {
  title: "On time everywhere",
  text: "Delivering reliability across the globe",
}

function Glyph({ index, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icons[index] ?? icons[0]}
    </svg>
  )
}

function Chevron({ active }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
        active ? "border-white/70 text-white" : "border-[#b9c3dc] text-[#1f4fd8]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </span>
  )
}

export default function AboutWhyChooseUs({
  eyebrow = defaultEyebrow,
  headingStart = defaultHeadingStart,
  headingEnd = defaultHeadingEnd,
  intro = defaultIntro,
  note = defaultNote,
  items = defaultItems,
  image = "/delivery.webp",
  imageAlt = "Delivery truck and warehouse with steel racks",
  badge = defaultBadge,
  contactHref = "/contact",
}) {
  const [active, setActive] = useState(0)
  const n = items.length

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-y-0 right-0 w-[70%] max-[960px]:hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="70vw"
          className="object-cover object-right"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/95 to-transparent max-[960px]:hidden"
      />

      {badge && (
        <div className="absolute right-14 top-14 z-10 flex items-center gap-5 rounded-3xl border border-white/25 bg-[#1b3a66]/55 px-8 py-6 text-white shadow-[0_20px_40px_-18px_rgba(11,26,64,0.6)] backdrop-blur-md max-[1200px]:hidden">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-16 w-16"
          >
            <line x1="10" x2="14" y1="2" y2="2" />
            <line x1="12" x2="15" y1="14" y2="11" />
            <circle cx="12" cy="14" r="8" />
          </svg>
          <div className="max-w-[14rem]">
            <p className="font-display text-[1.5rem] font-extrabold uppercase leading-[1.1]">{badge.title}</p>
            <span aria-hidden="true" className="mt-3 block h-px w-10" style={{ background: YELLOW }} />
            <p className="mt-2 text-[0.8rem] uppercase leading-[1.35] tracking-wide text-white/85">{badge.text}</p>
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-full px-14 py-20 max-[720px]:px-5 max-[720px]:py-12">
        <div className="max-w-[44rem] max-[960px]:max-w-none">
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="block h-[3px] w-14" style={{ background: YELLOW }} />
            <span className="text-[0.95rem] font-semibold uppercase tracking-[0.28em] text-[#5b6580]">
              {eyebrow}
            </span>
          </div>

          <h2
            className="mt-5 font-display text-[4.4rem] font-extrabold leading-[1.02] tracking-tight max-[720px]:text-[3rem]"
            style={{ color: NAVY }}
          >
            {headingStart} <span style={{ color: BLUE }}>{headingEnd}</span>
          </h2>

          {intro && <p className="mt-6 text-[1.1rem] leading-[1.65] text-[#4b5469]">{intro}</p>}
          {note && (
            <p className="mt-6 text-[1.1rem] font-medium italic leading-[1.6]" style={{ color: NAVY }}>
              {note}
            </p>
          )}

          <ul className="mt-8 grid list-none grid-cols-2 gap-4 p-0 max-[560px]:grid-cols-1">
            {items.map((item, i) => {
              const isActive = i === active
              const spansRow = n % 2 === 1 && i === n - 1
              return (
                <li
                  key={`${i}-${item.title}`}
                  className={`list-none ${spansRow ? "col-span-2 max-[560px]:col-span-1" : ""}`}
                >
                  <div
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`flex w-full items-center gap-4 rounded-2xl px-6 py-5 transition-colors duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-[#16307a] to-[#0b1a40] text-white shadow-[0_18px_34px_-14px_rgba(11,26,64,0.75)]"
                        : "bg-white shadow-[0_10px_26px_-14px_rgba(11,26,64,0.3)]"
                    }`}
                    style={isActive ? undefined : { color: NAVY }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      style={{ background: "none", border: 0, padding: 0, color: "inherit", font: "inherit" }}
                      className="flex flex-1 appearance-none items-center gap-4 bg-transparent p-0 text-left text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f4fd8]"
                    >
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center"
                        style={{ color: isActive ? YELLOW : BLUE }}
                      >
                        <Glyph index={typeof item.icon === "number" ? item.icon : i} className="h-10 w-10" />
                      </span>
                      <span className="flex-1 font-display text-[1.15rem] font-bold leading-[1.25]">
                        {item.title}
                      </span>
                    </button>

                    <Link
                      href={contactHref}
                      aria-label={`Contact us about ${item.title}`}
                      className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f4fd8]"
                    >
                      <Chevron active={isActive} />
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="relative h-64 w-full min-[961px]:hidden">
        <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" />
      </div>
    </section>
  )
}