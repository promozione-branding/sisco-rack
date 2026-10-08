import Link from "next/link"
import { Mail, Phone, Clock , } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { brand, categories, links } from "@/lib/data"

const smallCls = "mt-7 block border-t border-solid border-[#45535f] pt-4 text-[#9fb0bd] max-[600px]:w-full max-[600px]:first:pb-1 max-[600px]:last:mt-0 max-[600px]:last:border-t-0 max-[600px]:last:pt-0"
const itemCls = "mb-2 flex items-center gap-2.5"
const iconCls = "h-4 w-4 shrink-0 text-safety"

export default function Footer() {
  return (
    <footer className="relative z-[1] bg-[#253970] pb-[18px] pt-11 text-bg">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 max-[1100px]:grid-cols-[1fr_1fr] max-[1100px]:gap-x-10 max-[1100px]:gap-y-9 max-[600px]:grid-cols-[1fr] max-[600px]:gap-y-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-[1.7rem] font-bold text-white">
              <img
                src="/sisco_logo_transparent.png"
                alt="Logo"
                width={100}
              />
            </Link>
            <p className="max-w-[38ch]">Industrial racking and shelving, made to your floor plan and installed by our own crews.</p>
          </div>
          <div>
            <h3 className="mb-3.5 text-[1.4rem] text-safety">Pages</h3>
            <ul className="list-none">
              {links.map((l) => (
                <li key={l.href} className="mb-2"><Link href={l.href} className="hover:text-safety">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3.5 text-[1.4rem] text-safety">Categories</h3>
            <ul className="list-none">
              {categories.map((l) => (
                <li key={l.id} className="mb-2"><Link href={"/products"} className="hover:text-safety">{l.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3.5 text-[1.4rem] text-safety">Reach us</h3>
            <ul className="list-none">
              <li className={itemCls}>
                <Mail className={iconCls} aria-hidden="true" />
                <a href="mailto:info.siscosteel@gmail.com" className="break-all hover:text-safety">
                  info.siscosteel@gmail.com
                </a>
              </li>
              <li className={itemCls}>
                <Phone className={iconCls} aria-hidden="true" />
                <a href="tel:+919953018892" className="hover:text-safety">
                  +91 9953018892
                </a>
              </li>
             <li className={itemCls}>
  <FaWhatsapp className={iconCls} aria-hidden="true" />
  <a
    href="https://wa.me/917629827285"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-safety"
  >
    +91 7629827285 (WhatsApp)
  </a>
</li>
              <li className={itemCls}>
                <Clock className={iconCls} aria-hidden="true" />
                <span>Mon to Sat, 8am to 6pm</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-0 max-[600px]:flex-col max-[600px]:items-start">
          <small className={smallCls}>© 2026 {brand}. All rights reserved.</small>
          <small className={smallCls}>Designed and developed by Inquiry Bazaar</small>
        </div>
      </div>
    </footer>
  )
}