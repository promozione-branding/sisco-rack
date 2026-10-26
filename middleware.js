import { NextResponse } from "next/server"

const CATS = ["slotted", "mezzanine", "supermarket", "heavy"]

// Old filter URLs: /products?cat=slotted -> /products/slotted (301, query string dropped)
export function middleware(req) {
  const cat = req.nextUrl.searchParams.get("cat")
  if (cat && CATS.includes(cat)) {
    const url = req.nextUrl.clone()
    url.pathname = `/products/${cat}`
    url.search = ""
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = { matcher: "/products" }
