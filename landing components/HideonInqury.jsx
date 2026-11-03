"use client"

import { usePathname } from "next/navigation"

export default function HideOnInquiry({ children }) {
  const path = usePathname()
  if (path === "/inquiry") {
    return <div className="max-[767px]:hidden">{children}</div>
  }
  return children
}