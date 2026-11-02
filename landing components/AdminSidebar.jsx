"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, PlusCircle, LogOut } from "lucide-react"

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (p) => p === "/admin" || p.startsWith("/admin/edit"),
  },
  {
    href: "/admin/new",
    label: "Add blog",
    icon: PlusCircle,
    match: (p) => p.startsWith("/admin/new"),
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" })
    router.replace("/admin/login")
    router.refresh()
  }

  const base = "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition md:gap-3 md:px-4 md:py-3"

  return (
    <aside className="bg-[#253970] text-white md:sticky md:top-0 md:flex md:h-[100svh] md:w-64 md:shrink-0 md:flex-col">
      {/* Brand */}
      <div className="px-5 pb-2 pt-4 md:border-b md:border-white/10 md:px-6 md:pb-6 md:pt-7">
        <img src="/sisco_logo_transparent.webp" alt="Sisco Steel Products" width={100} height={67} className="h-10 w-auto md:h-12" />
        <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#f5a623]">Blog admin</p>
      </div>

      {/* Menu */}
      <nav className="flex flex-wrap items-center gap-2 px-3 pb-4 pt-2 md:flex-1 md:flex-col md:items-stretch md:gap-1.5 md:px-4 md:py-6">
        {links.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname)
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`${base} ${
                active
                  ? "bg-[#f5a623] text-[#0b2a5b] shadow-[0_6px_16px_rgba(245,166,35,0.35)]"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {label}
            </Link>
          )
        })}

        <button
          onClick={logout}
          className={`${base} ml-auto text-red-600 hover:bg-red-500/15 hover:text-red-100 md:ml-0 md:mt-auto md:border-t md:border-white/10 md:pt-4`}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          Logout
        </button>
      </nav>
    </aside>
  )
}