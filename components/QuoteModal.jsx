"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { categories } from "@/lib/data"

const EMAIL = "info.siscosteel@gmail.com"
const PHONE = "+91 9953018892"
const PHONE_HREF = "tel:+919953018892"

const labelCls = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#6b7a90]"
const fieldCls =
  "w-full rounded-[14px] border border-solid border-[#e3e7ee] bg-[#fafafa] py-3.5 pl-11 pr-4 text-[0.95rem] text-[#253970] outline-none transition-colors placeholder:text-[#9aa5b5] focus:border-[#253970] focus:bg-white"
const iconCls = "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a96a8]"

function Icon({ children }) {
  return (
    <svg className={iconCls} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

export default function QuoteModal({ open, onClose }) {
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

    const body = `Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nProduct: ${d.product}\n\n${d.message}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Quote enquiry from " + d.name)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1530]/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            className="grid max-h-[92vh] w-full max-w-[1000px] grid-cols-[0.8fr_1.2fr] overflow-y-auto rounded-[28px] bg-white shadow-2xl max-[800px]:grid-cols-1"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            {/* Left panel */}
            <div className="flex flex-col bg-[#253970] p-9 text-white max-[800px]:hidden">
              <div className="w-fit rounded-[10px]">
                <img src="/siscologo.png" alt="Logo" className="h-auto w-[140px]" />
              </div>

              <p className="mt-9 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-safety">Get in touch</p>
              <h2 className="mt-3 text-[2.8rem] font-extrabold leading-[1.05]">
                Let&apos;s build <span className="font-normal text-white/40">something better.</span>
              </h2>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-white/70">
                Tell us about your racking or shelving project and our team will help you find the right solution.
              </p>

              <div className="mt-auto border-t border-solid border-white/15 pt-6">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">Speak with our team</p>
                <a href={PHONE_HREF} className="mb-4 flex items-center gap-3 hover:text-safety">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-safety">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-bold">{PHONE}</span>
                    <span className="block text-[0.7rem] text-white/60">Call us directly</span>
                  </span>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-safety">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-safety">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  </span>
                  <span>
                    <span className="block break-all text-[0.9rem] font-bold">{EMAIL}</span>
                    <span className="block text-[0.7rem] text-white/60">Email our team</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right panel */}
            <div className="relative p-9 max-[800px]:p-6">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-solid border-[#e3e7ee] bg-white text-[#6b7a90] transition-colors hover:bg-[#f3f5f9]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>

              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#9aa5b5]">Project enquiry</p>
              <h3 id="quote-title" className="mt-2 text-[2rem] font-extrabold text-[#253970]">Tell us what you need.</h3>
              <p className="mt-1 text-[0.95rem] text-[#9aa5b5]">Fill in your details and we&apos;ll get back to you.</p>

              {sent ? (
                <div className="mt-10 rounded-[18px] bg-[#f3f5f9] p-8 text-center">
                  <p className="text-xl font-bold text-[#253970]">Thank you!</p>
                  <p className="mt-2 text-[#6b7a90]">We&apos;ve received your enquiry and will get back to you shortly.</p>
                  <button type="button" onClick={onClose} className="mt-6 cursor-pointer rounded-[14px] bg-[#253970] px-6 py-3 font-semibold text-white">Close</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 max-[600px]:grid-cols-1">
                  <div>
                    <label htmlFor="q-name" className={labelCls}>Your name</label>
                    <div className="relative">
                      <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>
                      <input id="q-name" name="name" required placeholder="Enter your name" className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="q-phone" className={labelCls}>Phone number</label>
                    <div className="relative">
                      <Icon><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></Icon>
                      <input id="q-phone" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="q-email" className={labelCls}>Email address</label>
                    <div className="relative">
                      <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>
                      <input id="q-email" name="email" type="email" placeholder="your@email.com" className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="q-product" className={labelCls}>Product / requirement</label>
                    <select id="q-product" name="product" defaultValue="" className={`${fieldCls} !pl-4`}>
                      <option value="">Select a product</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 max-[600px]:col-span-1">
                    <label htmlFor="q-message" className={labelCls}>Message</label>
                    <textarea id="q-message" name="message" rows={5} placeholder="Tell us about your project..." className={`${fieldCls} !pl-4 resize-none`} />
                  </div>

                  <div className="col-span-2 max-[600px]:col-span-1">
                    <button type="submit" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-0 bg-[#253970] py-4 font-bold text-white transition-colors hover:bg-[#1b2c5a]">
                      Send Enquiry
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </button>
                    <p className="mt-4 text-center text-[0.7rem] text-[#9aa5b5]">Our team typically responds within one business day.</p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}