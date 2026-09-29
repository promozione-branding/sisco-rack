"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SplitButton from "./SplitButton"

export default function QueryForm({ className = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [status, setStatus] = useState("idle") // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // Replace with your actual API endpoint
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Failed")
      setStatus("success")
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className={`query ${className}`}>
      <div className="query-inner">
        {/* Left side – text */}
        <div className="query-copy">
          <span className="query-tag">
            <i>✦</i> Get in touch <i>✦</i>
          </span>
          <h2>Send us your query</h2>
          <p>
            Tell us about your storage needs. Our team will respond within one business day with a tailored solution.
          </p>

          <ul className="query-points">
            <li>Free site assessment</li>
            <li>Custom design & fabrication</li>
            <li>Fast installation nationwide</li>
          </ul>
        </div>

        {/* Right side – form */}
        <motion.form
          className="query-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="query-row">
            <label className="field">
              <span>Full Name *</span>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </label>
            <label className="field">
              <span>Email *</span>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.com"
              />
            </label>
          </div>

          <div className="query-row">
            <label className="field">
              <span>Phone</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </label>
            <label className="field">
              <span>Company</span>
              <input
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Your company name"
              />
            </label>
          </div>

          <label className="field">
            <span>Service interested in</span>
            <select name="service" value={form.service} onChange={handleChange}>
              <option value="">Select a service</option>
              <option value="slotted">Slotted Angle Racks</option>
              <option value="supermarket">Supermarket Racks</option>
              <option value="mezzanine">Mezzanine Floors</option>
              <option value="heavy">Heavy Duty Racks</option>
              <option value="other">Other / Custom</option>
            </select>
          </label>

          <label className="field">
            <span>Your Query *</span>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your storage requirements, dimensions, load capacity, timeline..."
            />
          </label>

          <div className="query-actions">
            <SplitButton type="submit" dark disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Query"}
            </SplitButton>

            {status === "success" && (
              <p className="query-success">Thank you! We’ll get back to you shortly.</p>
            )}
            {status === "error" && (
              <p className="query-error">Something went wrong. Please try again.</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}