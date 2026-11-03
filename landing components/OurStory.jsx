"use client"

import { useState } from "react"
import SplitButton from "./SplitButton"
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

      <QuoteModal open={productquote} onClose={() => setProductquote(false)} />
    </>
  )
}