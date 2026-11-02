"use client"

import { useState } from "react"
import SplitButton from "./SplitButton"
import HScroll from "./HScroll"
import { story, values } from "@/lib/about"
import { cardImg } from "@/lib/smImages"
import QuoteModal from "./QuoteModal"

const valueImages = ["/welding.webp", "/steel.webp", "/finishing.webp", "/mezzanine.webp"]

function Reveal({ children, className }) {
  return <div className={className}>{children}</div>
}

function Statement({ text }) {
  return (
    <p className="mt-4 font-display text-[length:clamp(1.9rem,3.6vw,3.2rem)] font-bold leading-[1.12] text-[#253970]">
      {text}
    </p>
  )
}

function ValueCard({ v, i }) {
  return (
    <div className="group relative flex-1 overflow-hidden rounded-[22px] border-2 border-solid border-ink bg-[#253970] px-[30px] pb-[34px] pt-11">
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-0 group-hover:opacity-100" style={{ backgroundImage: `url(${v.image || valueImages[i % valueImages.length]})` }} aria-hidden="true" />
      <div className="absolute inset-0 bg-[#253970]/70 opacity-0 group-hover:opacity-100" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_16px_16px,#7a8b99_0_4px,transparent_5px),radial-gradient(circle_at_calc(100%_-_16px)_16px,#7a8b99_0_4px,transparent_5px),radial-gradient(circle_at_16px_calc(100%_-_16px),#7a8b99_0_4px,transparent_5px),radial-gradient(circle_at_calc(100%_-_16px)_calc(100%_-_16px),#7a8b99_0_4px,transparent_5px)]" aria-hidden="true" />
      <div className="relative z-[3]">
        <em className="block font-display text-[2.6rem] font-bold not-italic leading-none text-safety">{v.no}</em>
        <h3 className="mt-2.5 font-body text-[1.1rem] font-bold leading-[1.3] tracking-normal text-white">{v.title}</h3>
        <p className="mt-2 text-[0.92rem] text-white/80">{v.text}</p>
      </div>
    </div>
  )
}

export default function OurStory() {
  const [productquote, setProductquote] = useState(false)

  return (
    <>
      <div className="mx-auto grid max-w-full grid-cols-[1.1fr_0.9fr] items-center gap-14 px-14 pt-14 max-[960px]:grid-cols-[1fr] max-[960px]:gap-9 max-[960px]:px-10 max-[720px]:px-5">
        <div>
          <span className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']">Our story</span>
          <Statement text={story} />
          <Reveal>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <SplitButton href="https://walink.me/fskx3z" dark>Instant WhatsApp Inquiry</SplitButton>
              <button onClick={() => setProductquote(true)} className="inline-block cursor-pointer rounded-[14px] border-2 border-solid border-ink bg-transparent px-7 py-3.5 text-[1rem] font-semibold text-ink [font-family:inherit] hover:bg-ink hover:text-bg">Get a Free Quote Now</button>
            </div>
          </Reveal>
        </div>

        <div className="relative h-[clamp(380px,60svh,560px)]">
          <div className="absolute left-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[28px] border-2 border-solid border-ink bg-[linear-gradient(135deg,#c5ced5,#e9edf0)]">
            <img className="block h-full w-full object-fill" {...cardImg("/slotted_angle_category.webp")} alt="Our plant floor" decoding="async" loading="lazy" />
          </div>
          <div className="absolute bottom-0 right-0 h-1/2 w-[52%] overflow-hidden rounded-[28px] border-2 border-solid border-ink bg-[linear-gradient(135deg,#c5ced5,#e9edf0)] shadow-[0_16px_32px_rgba(31,42,51,0.2)]">
            <img className="block h-full w-full object-fill" src="/mezzanine.webp" alt="An installation crew at work" loading="lazy" />
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-full px-14 pt-16 max-[960px]:px-10 max-[720px]:px-5">
        <Reveal className="mb-[26px] flex items-end justify-between gap-6 max-[720px]:hidden">
          <h2 className="text-[length:clamp(1.9rem,3.6vw,3rem)] font-bold text-[#253970]">
            What Sets Us Apart
          </h2>
        </Reveal>

        <div className="grid grid-cols-[repeat(4,1fr)] gap-[18px] max-[960px]:grid-cols-[1fr_1fr] max-[720px]:hidden">
          {values.map((v, i) => (
            <Reveal key={v.no} className="flex">
              <ValueCard v={v} i={i} />
            </Reveal>
          ))}
        </div>

        <div className="-mx-5 min-[721px]:hidden">
          <HScroll
            header={
              <h2 className="px-5 pb-3 text-[length:clamp(1.9rem,3.6vw,3rem)] font-bold text-[#253970]">
                What Sets Us Apart
              </h2>
            }
          >
            {values.map((v, i) => (
              <li key={v.no} className="flex w-[80vw] max-w-[20rem] shrink-0">
                <ValueCard v={v} i={i} />
              </li>
            ))}
          </HScroll>
        </div>
      </section>

      <QuoteModal open={productquote} onClose={() => setProductquote(false)} />
    </>
  )
}