"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

const EMAIL = "info.siscosteel@gmail.com"
const PHONE = "+91 9953018892"
const PHONE_HREF = "tel:+919953018892"

const SERVICES = [
  "Rack installation",
  "Rack dismantling",
  "Dismantle and reinstall (relocation)",
  "Installation and dismantling"
]

const INCLUDED = [
  "Trained on-site installation crew",
  "Safe dismantling with labelled parts",
  "Relocation to your new facility",
]

const labelCls = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#7a6a4a]"
const fieldCls =
  "w-full rounded-[14px] border border-solid border-[#eadfc6] bg-[#fffdf8] py-3.5 pl-11 pr-4 text-[0.95rem] max-[720px]:text-[16px] text-[#1f2a33] outline-none transition-colors placeholder:text-[#b3a78d] focus:border-[#e8a317] focus:bg-white"
const iconCls = "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#b08a2e]"

function Icon({ children }) {
  return (
    <svg className={iconCls} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

export default function InstallationServicesModal({ open, onClose }) {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) setSent(false)
  }, [open])

  const handleSubmit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget))

    const body = [
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      `Email: ${d.email}`,
      `Service: ${d.service}`,
      `Site location: ${d.location}`,
      `Preferred start date: ${d.date}`,
      "",
      d.message
    ].join("\n")

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Installation / dismantling enquiry from " + d.name)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (typeof document === "undefined") return null


  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10161b]/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-quote-title"
            className="grid max-h-[96dvh] w-full max-w-[1000px] grid-cols-[1.2fr_0.8fr] overflow-y-auto rounded-[28px] bg-white shadow-2xl max-[800px]:grid-cols-1"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            {/* Form panel (left) */}
            <div className="relative p-9 max-[800px]:order-2 max-[800px]:p-6">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 hidden h-10 w-10 cursor-pointer place-items-center rounded-full border border-solid border-[#eadfc6] bg-white text-[#7a6a4a] transition-colors hover:bg-[#fff6e0]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>

              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#b08a2e]">Service request</p>
              <h3 id="install-quote-title" className="mt-2 text-[2rem] font-extrabold text-[#1f2a33]">Book an installation crew.</h3>
              <p className="mt-1 text-[0.95rem] text-[#8a7d62]">Share your site details and we&apos;ll arrange a visit and a quote.</p>

              {sent ? (
                <div className="mt-10 rounded-[18px] bg-[#fff6e0] p-8 text-center">
                  <p className="text-xl font-bold text-[#1f2a33]">Request received!</p>
                  <p className="mt-2 text-[#7a6a4a]">Our service team will contact you shortly to confirm your site visit.</p>
                  <button type="button" onClick={onClose} className="mt-6 cursor-pointer rounded-[14px] bg-[#e8a317] px-6 py-3 font-semibold text-[#1f2a33]">Close</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 max-[600px]:grid-cols-1">
                  <div>
                    <label htmlFor="i-name" className={labelCls}>Your name</label>
                    <div className="relative">
                      <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>
                      <input id="i-name" name="name" required placeholder="Enter your name" className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="i-phone" className={labelCls}>Phone number</label>
                    <div className="relative">
                      <Icon><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></Icon>
                      <input id="i-phone" name="phone" type="tel" required placeholder="Enter your Mobile Number" className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="i-service" className={labelCls}>Service needed</label>
                    <select id="i-service" name="service" required defaultValue="" className={`${fieldCls} !pl-4`}>
                      <option value="" disabled>Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                <div>
  <label htmlFor="i-email" className={labelCls}>Email address</label>
  <div className="relative">
    <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>
    <input id="i-email" name="email" type="email" placeholder="Enter your Email" className={fieldCls} />
  </div>
</div>

                  <div>
                    <label htmlFor="i-location" className={labelCls}>Site location</label>
                    <div className="relative">
                      <Icon><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></Icon>
                      <input id="i-location" name="location" required placeholder="City / area of the site" className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="i-date" className={labelCls}>Preferred start date</label>
                    <div className="relative">
                      <Icon><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Icon>
                      <input id="i-date" name="date" type="date" className={fieldCls} />
                    </div>
                  </div>

             

                  <div className="col-span-2 max-[600px]:col-span-1">
                    <label htmlFor="i-message" className={labelCls}>Site details</label>
                    <textarea id="i-message" name="message" rows={4} placeholder="Approx. area, number of racks, floor type, access constraints..." className={`${fieldCls} !pl-4 resize-none`} />
                  </div>

                  <div className="col-span-2 max-[600px]:col-span-1">
                    <button type="submit" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-0 bg-[#e8a317] py-4 font-bold text-[#1f2a33] transition-colors hover:bg-[#d49410]">
                      Request Site Visit
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </button>
                    <p className="mt-4 text-center text-[0.7rem] text-[#b3a78d]">We usually confirm site visits within one business day.</p>
                  </div>
                </form>
              )}
            </div>

            {/* Info panel (right) */}
            <div className="relative flex flex-col bg-[#1f2a33] p-9 text-white max-[800px]:order-1 max-[800px]:p-6">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-solid border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>

              <div className="w-fit rounded-[10px]">
                <img src="/sisco_logo_transparent.png" alt="Logo" className="h-auto w-[120px]" />
              </div>

              <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#e8a317]">Installation &amp; Dismantling</p>
              <h2 className="mt-3 text-[2.2rem] font-extrabold leading-[1.08] max-[800px]:text-[1.8rem]">
                Racks up, racks down. Done safely.
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">
                From a fresh warehouse setup to moving your storage to a new site, our crew handles the heavy work.
              </p>

              <ul className="mt-6 list-none space-y-3 p-0">
                {INCLUDED.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.9rem] text-white/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e8a317] text-[#1f2a33]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-solid border-white/15 pt-6 max-[800px]:mt-2">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">Talk to our service team</p>
                <a href={PHONE_HREF} className="mb-4 flex items-center gap-3 text-white hover:text-[#e8a317]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#e8a317]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-bold">{PHONE}</span>
                    <span className="block text-[0.7rem] text-white/60">Call us directly</span>
                  </span>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white hover:text-[#e8a317]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#e8a317]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  </span>
                  <span>
                    <span className="block break-all text-[0.9rem] font-bold">{EMAIL}</span>
                    <span className="block text-[0.7rem] text-white/60">Email our team</span>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}