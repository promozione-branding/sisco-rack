import { NextResponse } from "next/server"
import { categories } from "@/lib/data"

// Old filter URLs: /products?cat=slotted -> /products/slotted-angle-racks (301, query string dropped)
export function middleware(req) {
  const cat = req.nextUrl.searchParams.get("cat")
  const match = cat && categories.find((c) => !c.action && (c.id === cat || c.slug === cat))
  if (match) {
    const url = req.nextUrl.clone()
    url.pathname = `/products/${match.slug}`
    url.search = ""
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = { matcher: "/products" }
