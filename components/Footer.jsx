import Link from "next/link"
import { brand, categories, links } from "@/lib/data"

const smallCls = "mt-7 block border-t border-solid border-[#45535f] pt-4 text-[#9fb0bd]"

export default function Footer() {
  return (
    <footer className="relative z-[1] rounded-t-[36px] bg-[#253970] pb-[18px] pt-11 text-bg">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
          <div>
            <h3 className="mb-3.5 text-[1.4rem] text-safety">{brand}</h3>
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
              <li className="mb-2">sales@rackwellsteel.com</li>
              <li className="mb-2">+91 8043834499</li>
              <li className="mb-2">Mon to Sat, 8am to 6pm</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <small className={smallCls}>© 2026 {brand}. All rights reserved.</small>
          <small className={smallCls}>Designed and developed by Inquiry Bazaar</small>
        </div>
      </div>
    </footer>
  )
}