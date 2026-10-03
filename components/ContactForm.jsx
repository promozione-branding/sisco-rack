"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { categories } from "@/lib/data"

const fieldCls = "grid gap-[5px] text-[0.85rem] font-semibold"

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
  }

  return (
    <section className="py-12 max-[720px]:py-10">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5 grid grid-cols-[1fr_1fr] gap-14">
        <form className="grid gap-[18px]" onSubmit={submit}>
          <label className={fieldCls}>Your name<input className="rounded-[14px] border-2 border-solid border-ink bg-panel px-3.5 py-2.5 font-normal text-inherit transition-[border-color,background] duration-200 [font-family:inherit] [font-size:inherit] leading-[inherit] focus:[outline:none] focus:border-safety focus:bg-white" name="name" required /></label>
          <label className={fieldCls}>Email<input className="rounded-[14px] border-2 border-solid border-ink bg-panel px-3.5 py-2.5 font-normal text-inherit transition-[border-color,background] duration-200 [font-family:inherit] [font-size:inherit] leading-[inherit] focus:[outline:none] focus:border-safety focus:bg-white" name="email" type="email" required /></label>
          <label className={fieldCls}>
            What do you need?
            <select className="rounded-[14px] border-2 border-solid border-ink bg-panel px-3.5 py-2.5 font-normal text-inherit transition-[border-color,background] duration-200 [font-family:inherit] [font-size:inherit] leading-[inherit] focus:[outline:none] focus:border-safety focus:bg-white" name="type">
              {categories.map((c) => (<option key={c.id}>{c.name}</option>))}
            </select>
          </label>
          <label className={fieldCls}>Bay sizes and load per level<textarea className="rounded-[14px] border-2 border-solid border-ink bg-panel px-3.5 py-2.5 font-normal text-inherit transition-[border-color,background] duration-200 [font-family:inherit] [font-size:inherit] leading-[inherit] focus:[outline:none] focus:border-safety focus:bg-white min-h-20 resize-y" name="message" required /></label>
          <button className="inline-block cursor-pointer rounded-pill border-2 border-solid border-ink bg-ink px-7 py-3.5 text-[1rem] font-semibold text-bg transition-[background,color] duration-[250ms] [font-family:inherit] hover:border-ink hover:bg-safety hover:text-ink" type="submit">Send request</button>
          {sent && (
            <motion.div className="rounded-[14px] border-2 border-solid border-ink bg-safety px-[18px] py-3.5 font-semibold" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              Request sent. We will reply within one working day.
            </motion.div>
          )}
        </form>
        <motion.aside className="rounded-[24px] border-2 border-solid border-ink bg-panel p-[30px]" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <div>
            <h3 className="mb-2">Factory and showroom</h3>
            <p>New Delhi, Delhi</p>
          </div>
          <div className="mt-6">
            <h3 className="mb-2">Sales</h3>
            <p>sales@rackwellsteel.com</p>
            <p className="mt-4">+91 8043834499</p>
          </div>
          <div className="mt-6">
            <h3 className="mb-2">Hours</h3>
            <p>Monday to Saturday, 8am to 6pm</p>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
