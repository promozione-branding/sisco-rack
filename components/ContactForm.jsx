"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { categories } from "@/lib/data"

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
  }

  return (
    <section className="section">
      <div className="wrap two">
        <form className="form" onSubmit={submit}>
          <label className="field">Your name<input name="name" required /></label>
          <label className="field">Email<input name="email" type="email" required /></label>
          <label className="field">
            What do you need?
            <select name="type">
              {categories.map((c) => (<option key={c.id}>{c.name}</option>))}
            </select>
          </label>
          <label className="field">Bay sizes and load per level<textarea name="message" required /></label>
          <button className="btn" type="submit">Send request</button>
          {sent && (
            <motion.div className="notice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              Request sent. We will reply within one working day.
            </motion.div>
          )}
        </form>
        <motion.aside className="info" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <div>
            <h3>Factory and showroom</h3>
            <p>New Delhi, Delhi</p>
          </div>
          <div>
            <h3>Sales</h3>
            <p>sales@rackwellsteel.com</p>
            <p>+91 8043834499</p>
          </div>
          <div>
            <h3>Hours</h3>
            <p>Monday to Saturday, 8am to 6pm</p>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
