"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { submitEnquiry } from "@/lib/submitEnquiry"

const PHONE = "+91 7629827285"
const PHONE_HREF = "tel:+917629827285"

const SERVICES = [
  "Rack installation",
  "Rack dismantling",
  "Dismantle and reinstall (relocation)",
  "Installation and dismantling",
]

const labelCls = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#7a6a4a]"
const fieldCls =
  "block w-full min-w-0 rounded-[12px] border border-solid border-[#eadfc6] bg-[#fffdf8] px-4 py-3 text-[16px] text-[#1f2a33] outline-none transition-colors placeholder:text-[#b3a78d] focus:border-[#e8a317] focus:bg-white"

export default function InstallationServicesModal({ open, onClose }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!open) return
    setSent(false)
    setError("")
    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const form = e.currentTarget
    const d = Object.fromEntries(new FormData(form))

    const message = [
      d.date ? `Preferred start date: ${d.date}` : "",
      d.message ? `Site details: ${d.message}` : "",
    ]
      .filter(Boolean)
      .join("\n")

    try {
      await submitEnquiry({
        name: d.name,
        phone: d.phone,
        email: d.email,
        product: d.service,
        message: message || "N/A",
        place: d.location,
      })
      setSent(true)
      form.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-[#10161b]/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="flex min-h-full items-center justify-center p-4 max-[480px]:p-2"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-quote-title"
            className="relative w-full max-w-[560px] overflow-x-hidden rounded-[24px] bg-white p-7 shadow-2xl max-[480px]:rounded-[20px] max-[480px]:p-5"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-solid border-[#eadfc6] bg-white text-[#1f2a33] transition-colors hover:bg-[#fff6e0]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>

            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#b08a2e]">Installation &amp; Dismantling</p>
            <h3 id="install-quote-title" className="mt-1 pr-10 text-[1.6rem] font-extrabold leading-tight text-[#1f2a33] max-[480px]:text-[1.35rem]">
              Book an installation crew.
            </h3>
            <p className="mt-1 text-[0.9rem] text-[#8a7d62]">Share your site details and we&apos;ll arrange a visit and quote.</p>

            {sent ? (
              <div className="mt-6 rounded-[16px] bg-[#fff6e0] p-6 text-center">
                <p className="text-lg font-bold text-[#1f2a33]">Request received!</p>
                <p className="mt-2 text-[0.9rem] text-[#7a6a4a]">Our team will contact you shortly to confirm your site visit.</p>
                <button type="button" onClick={onClose} className="mt-5 cursor-pointer rounded-[12px] border-0 bg-[#e8a317] px-6 py-2.5 font-semibold text-[#1f2a33]">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 max-[600px]:grid-cols-[minmax(0,1fr)]">
                <div className="min-w-0">
                  <label htmlFor="i-name" className={labelCls}>Name</label>
                  <input id="i-name" name="name" required placeholder="Your name" className={fieldCls} />
                </div>

                <div className="min-w-0">
                  <label htmlFor="i-phone" className={labelCls}>Phone</label>
                  <input id="i-phone" name="phone" type="tel" inputMode="numeric" required maxLength={10} placeholder="Mobile number" className={fieldCls} />
                </div>

                <div className="min-w-0">
                  <label htmlFor="i-service" className={labelCls}>Service needed</label>
                  <select id="i-service" name="service" required defaultValue="" className={`${fieldCls} truncate`}>
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="min-w-0">
                  <label htmlFor="i-email" className={labelCls}>Email</label>
                  <input id="i-email" name="email" type="email" placeholder="Your email" className={fieldCls} />
                </div>

                <div className="min-w-0">
                  <label htmlFor="i-location" className={labelCls}>Site location</label>
                  <input id="i-location" name="location" required placeholder="City / area of the site" className={fieldCls} />
                </div>

                <div className="min-w-0">
                  <label htmlFor="i-date" className={labelCls}>Preferred start date</label>
                  <input id="i-date" name="date" type="date" className={`${fieldCls} min-h-[50px] appearance-none text-left [&::-webkit-date-and-time-value]:text-left`} />
                </div>

                <div className="col-span-2 min-w-0 max-[600px]:col-span-1">
                  <label htmlFor="i-message" className={labelCls}>Site details <span className="font-normal normal-case tracking-normal text-[#b3a78d]">(optional)</span></label>
                  <textarea id="i-message" name="message" rows={3} placeholder="Area, number of racks, access constraints..." className={`${fieldCls} resize-none`} />
                </div>

                <div className="col-span-2 min-w-0 max-[600px]:col-span-1">
                  {error && (
                    <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[0.9rem] font-semibold text-red-700">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-[12px] border-0 bg-[#e8a317] py-3.5 font-bold text-[#1f2a33] transition-colors hover:bg-[#d49410] disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Request Site Visit"}
                  </button>
                  <p className="mt-3 text-center text-[0.8rem] text-[#8a7d62]">
                    Or call <a href={PHONE_HREF} className="font-semibold text-[#b08a2e]">{PHONE}</a>
                  </p>
                </div>
              </form>
            )}
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}