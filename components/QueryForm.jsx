"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SplitButton from "./SplitButton"
import { submitEnquiry } from "@/lib/submitEnquiry"

const SERVICE_LABELS = {
  slotted: "Slotted Angle Racks",
  supermarket: "Supermarket Racks",
  mezzanine: "Mezzanine Floors",
  heavy: "Heavy Duty Racks",
  other: "Other / Custom",
}

const fieldCls =
  "rounded-[14px] border-2 border-solid border-ink bg-panel px-3.5 py-2.5 font-normal text-inherit transition-[border-color,background] duration-200 [font-family:inherit] [font-size:inherit] leading-[inherit] focus:[outline:none] focus:border-safety focus:bg-white"

const EMPTY = { name: "", email: "", phone: "", company: "", service: "", message: "" }

export default function QueryForm({ className = "" }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setStatus("loading")

    const message = form.company.trim()
      ? `Company: ${form.company.trim()}\n\n${form.message}`
      : form.message

    try {
      await submitEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        product: SERVICE_LABELS[form.service] || "",
        message,
      })
      setStatus("success")
      setForm(EMPTY)
      setTimeout(() => setStatus("idle"), 5000)
    } catch (err) {
      setErrorMsg(err.message)
      setStatus("error")
    }
  }

  return (
    <section className={`mx-11 my-10 overflow-hidden rounded-[36px] border-2 border-solid border-ink bg-panel max-[960px]:mx-3 max-[960px]:my-0 max-[960px]:rounded-[28px] ${className}`}>
      <div className="grid grid-cols-[1fr_1.15fr] max-[960px]:grid-cols-[1fr]">
        <div className="flex flex-col justify-center bg-[linear-gradient(160deg,#c5ced5_0%,#e9edf0_100%)] px-10 py-9 max-[960px]:px-6 max-[960px]:pb-6 max-[960px]:pt-8">
          <span className="inline-flex w-fit items-center gap-2.5 rounded-pill border border-solid border-safety bg-white/70 px-4 py-[7px] text-[0.72rem] font-semibold uppercase tracking-[0.16em]">
            <i className="not-italic text-safety">✦</i> Get in touch <i className="not-italic text-safety">✦</i>
          </span>
          <h2 className="mt-3 max-w-[12ch] text-[length:clamp(1.8rem,3vw,2.6rem)] uppercase">Send us your query</h2>
          <p className="mt-2.5 max-w-[36ch] text-[0.95rem] text-muted">
            Tell us about your storage needs. Our team will respond within one business day with a tailored solution.
          </p>

          <ul className="mt-[18px] grid list-none gap-2">
            <li className="flex items-center gap-3 text-[0.95rem] font-semibold before:h-2.5 before:w-2.5 before:shrink-0 before:rounded-circle before:bg-safety before:content-['']">Free Site Assessment</li>
            <li className="flex items-center gap-3 text-[0.95rem] font-semibold before:h-2.5 before:w-2.5 before:shrink-0 before:rounded-circle before:bg-safety before:content-['']">Custom Design & Fabrication</li>
            <li className="flex items-center gap-3 text-[0.95rem] font-semibold before:h-2.5 before:w-2.5 before:shrink-0 before:rounded-circle before:bg-safety before:content-['']">Fast Installation nationwide</li>
          </ul>
        </div>

        <motion.form
          className="flex flex-col gap-3.5 bg-white px-10 py-8 max-[960px]:px-5 max-[960px]:pb-8 max-[960px]:pt-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="grid grid-cols-[1fr_1fr] gap-3.5 max-[960px]:grid-cols-[1fr]">
            <label className="grid gap-[5px] text-[0.85rem] font-semibold">
              <span className="text-ink">Full Name *</span>
              <input className={fieldCls} name="name" type="text" required value={form.name} onChange={handleChange} placeholder="John Doe" />
            </label>
            <label className="grid gap-[5px] text-[0.85rem] font-semibold">
              <span className="text-ink">Email *</span>
              <input className={fieldCls} name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@company.com" />
            </label>
          </div>

          <div className="grid grid-cols-[1fr_1fr] gap-3.5 max-[960px]:grid-cols-[1fr]">
            <label className="grid gap-[5px] text-[0.85rem] font-semibold">
              <span className="text-ink">Phone *</span>
              <input className={fieldCls} name="phone" type="tel" required maxLength={10} value={form.phone} onChange={handleChange} placeholder="9876543210" />
            </label>
            <label className="grid gap-[5px] text-[0.85rem] font-semibold">
              <span className="text-ink">Company</span>
              <input className={fieldCls} name="company" type="text" value={form.company} onChange={handleChange} placeholder="Your company name" />
            </label>
          </div>

          <label className="grid gap-[5px] text-[0.85rem] font-semibold">
            <span className="text-ink">Service interested in</span>
            <select className={fieldCls} name="service" value={form.service} onChange={handleChange}>
              <option value="">Select a service</option>
              {Object.entries(SERVICE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-[5px] text-[0.85rem] font-semibold">
            <span className="text-ink">Your Query *</span>
            <textarea
              className={`${fieldCls} min-h-20 resize-y`}
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your storage requirements, dimensions, load capacity, timeline..."
            />
          </label>

          <div className="mt-0.5 flex flex-col items-start gap-2.5">
            <SplitButton type="submit" dark disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Query"}
            </SplitButton>

            {status === "success" && (
              <p className="text-[0.95rem] font-semibold text-[#1a7a3c]">Thank you! We’ll get back to you shortly.</p>
            )}
            {status === "error" && (
              <p className="text-[0.95rem] font-semibold text-[#b42318]">{errorMsg || "Something went wrong. Please try again."}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}