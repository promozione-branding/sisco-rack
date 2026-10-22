"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { categories } from "@/lib/data"
import { submitEnquiry } from "@/lib/submitEnquiry"

const PHONE = "+91 7629827285"
const PHONE_HREF = "tel:+917629827285"

const fieldCls =
  "w-full rounded-xl border border-solid border-[#e3e7ee] bg-[#fafafa] px-4 py-3 text-[0.95rem] max-[720px]:text-[16px] text-[#253970] outline-none transition-colors placeholder:text-[#9aa5b5] focus:border-[#253970] focus:bg-white"

export default function QuoteModal({ open, onClose }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
    if (open) {
      setSent(false)
      setError("")
    }
  }, [open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const form = e.currentTarget
    const d = Object.fromEntries(new FormData(form))

    try {
      await submitEnquiry({
        name: d.name,
        phone: d.phone,
        email: d.email,
        product: d.product,
        message: d.message,
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
            className="relative max-h-[92dvh] w-full max-w-[520px] overflow-y-auto rounded-[24px] bg-white p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-solid border-[#e3e7ee] bg-white text-[#6b7a90] transition-colors hover:bg-[#f3f5f9]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>

            <h3 id="quote-title" className="pr-10 text-[1.5rem] font-extrabold leading-tight text-[#253970]">
              Get a free quote
            </h3>
            <p className="mt-1 text-[0.88rem] text-[#6b7a90]">
              Share a few details and we&apos;ll get back to you.
            </p>

            {sent ? (
              <div className="mt-6 rounded-2xl bg-[#f3f5f9] p-6 text-center">
                <p className="text-lg font-bold text-[#253970]">Thank you!</p>
                <p className="mt-1 text-[0.9rem] text-[#6b7a90]">We&apos;ve received your enquiry and will reply shortly.</p>
                <button type="button" onClick={onClose} className="mt-5 cursor-pointer rounded-xl bg-[#253970] px-6 py-2.5 font-semibold text-white">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-2 gap-3 max-[480px]:grid-cols-1">
                <input name="name" required aria-label="Your name" placeholder="Your name" className={fieldCls} />

                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  maxLength={10}
                  aria-label="Phone number"
                  placeholder="Mobile number"
                  className={fieldCls}
                />

                <input name="email" type="email" aria-label="Email address" placeholder="Email address" className={fieldCls} />

                <select name="product" defaultValue="" aria-label="Product / requirement" className={fieldCls}>
                  <option value="">Select a product</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>

                <textarea
                  name="message"
                  rows={3}
                  aria-label="Message"
                  placeholder="Tell us about your project..."
                  className={`${fieldCls} col-span-2 resize-none max-[480px]:col-span-1`}
                />

                {error && (
                  <div className="col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[0.85rem] font-semibold text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="col-span-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-[#253970] py-3.5 max-[480px]:col-span-1 font-bold text-white transition-colors hover:bg-[#1b2c5a] disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Enquiry"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>

                <p className="col-span-2 text-center text-[0.78rem] text-[#6b7a90] max-[480px]:col-span-1">
                  Prefer a call? <a href={PHONE_HREF} className="font-semibold text-[#253970] underline">{PHONE}</a>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}