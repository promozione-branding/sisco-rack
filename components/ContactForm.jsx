"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User, Mail, Package, FileText, ChevronDown, ArrowRight, ShieldCheck,
  MapPin, Phone, Clock, Send, Settings, Truck, Headphones,
} from "lucide-react"
import { categories } from "@/lib/data"

const BANNER_IMG = "/"
const FACTORY_IMG = "/testimonial_1.png"

const NAVY = "#0b2a5b"
const BLUE = "#0f4aa8"
const AMBER = "#f5a623"

const box =
  "relative flex items-center rounded-xl border border-solid border-slate-300 bg-white transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
const iconCls = "pointer-events-none absolute left-5 h-[22px] w-[22px] text-slate-500"
const inputCls =
  "w-full bg-transparent py-[22px] pl-14 pr-4 text-[0.95rem] text-slate-800 outline-none placeholder:text-slate-500 [font-family:inherit]"

const infoRows = [
  {
    icon: Phone, bg: "bg-sky-100", color: "text-sky-600", title: "Sales",
    lines: ["sales@rackwellsteel.com", "+917629827285"],
  },
  {
    icon: Clock, bg: "bg-amber-50", color: "text-amber-500", title: "Hours",
    lines: ["Monday to Saturday", "8am to 6pm"],
  },
  {
    icon: Send, bg: "bg-green-50", color: "text-green-600", title: "Quick response",
    lines: ["Our team usually responds", "within 24 hours."],
  },
]

const features = [
  { icon: Settings, bg: "bg-blue-100", color: "text-blue-700", title: "Custom Solutions", sub: "As per your requirements" },
  { icon: ShieldCheck, bg: "bg-amber-50", color: "text-amber-500", title: "Quality Products", sub: "Durable & reliable" },
  { icon: Truck, bg: "bg-blue-100", color: "text-blue-700", title: "On-Time Delivery", sub: "Pan India support" },
  { icon: Headphones, bg: "bg-amber-50", color: "text-amber-500", title: "Expert Support", sub: "From inquiry to installation" },
]

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
  }

  return (
    <section className="bg-slate-50">
      {/* Top banner */}
      <div
        className="h-[98px] w-full bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.15),rgba(255,255,255,.15)),` }}
      />

<div className="mx-auto grid max-w-[1910px] grid-cols-[1.02fr_1.18fr] items-stretch gap-5 px-14 py-9 max-[1100px]:grid-cols-1 max-[720px]:px-5">
  <form
  onSubmit={submit}
  className="flex flex-col rounded-3xl bg-white p-[30px] shadow-[0_10px_40px_rgba(15,40,90,0.08)]"
>
          <div className="flex items-center gap-4">
            <span className="text-[0.8rem] font-bold uppercase tracking-wide" style={{ color: BLUE }}>
              Get in touch
            </span>
            <span className="h-[3px] w-[108px] rounded-full" style={{ background: AMBER }} />
          </div>

          <h2 className="mt-3 text-[3rem] font-extrabold leading-[1.05] tracking-tight max-[720px]:text-[2.2rem]" style={{ color: NAVY }}>
            Send us a <span style={{ color: BLUE }}>message</span>
          </h2>
          <p className="mt-4 max-w-[540px] text-[1.05rem] leading-relaxed text-slate-500">
            Tell us about your requirements and our team will get back to you with the best solution for your storage needs.
          </p>

<div className="mt-9 flex flex-1 flex-col gap-[22px]">
            <div className="grid grid-cols-2 gap-[18px] max-[720px]:grid-cols-1">
              <label className={box}>
                <User className={iconCls} />
                <input className={inputCls} name="name" placeholder="Your name *" required />
              </label>
              <label className={box}>
                <Mail className={iconCls} />
                <input className={inputCls} name="email" type="email" placeholder="Email address *" required />
              </label>
            </div>

            <label className={box}>
              <Package className={iconCls} />
              <div className="w-full pl-14 pr-12 pb-3 pt-3">
                <span className="block text-[0.72rem] text-slate-500">What do you need? *</span>
                <select
                  name="type"
                  className="w-full appearance-none bg-transparent text-[0.95rem] font-medium text-slate-800 outline-none [font-family:inherit]"
                >
                  {categories.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <ChevronDown className="pointer-events-none absolute right-5 h-5 w-5 text-slate-700" />
            </label>

            <label className={`${box} items-start`}>
              <FileText className={`${iconCls} top-[22px]`} />
              <textarea
                className={`${inputCls} min-h-[126px] resize-y`}
                name="message"
                placeholder="Bay sizes and load per level"
                required
              />
            </label>
          </div>

          <div className="mt-6 flex items-center gap-8 max-[720px]:flex-col max-[720px]:items-stretch">
            <button
              type="submit"
              className="flex h-[58px] w-[650px] max-w-full cursor-pointer items-center justify-center gap-3 rounded-xl text-[1.1rem] font-semibold text-white shadow-[0_8px_20px_rgba(15,60,150,0.3)] transition hover:brightness-110 [font-family:inherit]"
              style={{ background: `linear-gradient(90deg, ${NAVY}, ${BLUE})` }}
            >
              Send request <ArrowRight className="h-5 w-5" />
            </button>
            
          </div>

          {sent && (
            <motion.div
              className="mt-5 rounded-xl border border-green-200 bg-green-50 px-5 py-3.5 font-semibold text-green-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Request sent. We will reply within one working day.
            </motion.div>
          )}
        </form>

        <div className="grid gap-5">
          <aside
            className="relative overflow-hidden rounded-3xl p-[52px] text-white shadow-[0_10px_40px_rgba(15,40,90,0.2)] max-[720px]:p-8"
            style={{
              minHeight: 500,
              backgroundColor: NAVY,
              backgroundImage: `linear-gradient(90deg, ${NAVY} 0%, rgba(11,42,91,.92) 30%, rgba(11,42,91,.35) 62%, rgba(11,42,91,0) 100%), url(${FACTORY_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-[0.8rem] font-bold uppercase tracking-wide">Our location</span>
              <span className="h-[3px] w-[52px] rounded-full" style={{ background: AMBER }} />
            </div>

            <h3 className="mt-3 text-[2rem] font-bold leading-tight">Factory and showroom</h3>

            <div className="mt-5 flex items-center gap-4 text-[1.1rem]">
              <MapPin className="h-7 w-7 fill-amber-400 text-amber-400" />
              <span>New Delhi, Delhi</span>
            </div>

            <div className="mt-8 grid gap-7">
              {infoRows.map(({ icon: Icon, bg, color, title, lines }) => (
                <div key={title} className="flex items-center gap-5">
                  <span className={`flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full ${bg}`}>
                    <Icon className={`h-7 w-7 ${color}`} />
                  </span>
                  <div className="leading-relaxed">
                    <p className="font-bold">{title}</p>
                    {lines.map((l) => (
                      <p key={l} className="text-[1.02rem] text-white/90">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="grid grid-cols-4 items-center rounded-2xl bg-white px-2 py-5 shadow-[0_6px_24px_rgba(15,40,90,0.06)] max-[1100px]:grid-cols-2 max-[1100px]:gap-5 max-[560px]:grid-cols-1">
            {features.map(({ icon: Icon, bg, color, title, sub }, i) => (
              <div
                key={title}
                className={`flex items-center gap-3 ${i > 0 ? "min-[1101px]:border-l min-[1101px]:border-slate-200" : ""}`}
              >
                <span className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </span>
                <div>
                  <p className="text-[0.82rem] font-bold" style={{ color: NAVY }}>{title}</p>
                  <p className="text-[0.72rem] text-slate-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}