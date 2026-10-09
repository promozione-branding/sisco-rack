"use client"
import { usePathname } from "next/navigation"

export default function HideOnAdmin({ children }) {
  return usePathname()?.startsWith("/admin") ? null : children
}   