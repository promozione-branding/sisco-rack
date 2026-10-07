import { Suspense } from "react"
import CTA from "@/components/Cta"
import ProductGrid from "@/components/ProductGrid"
import ProductHead from "@/components/ProductHead"

export const metadata = { title: "Products | Sisco Steel" }

export default function Products() {
  return (
    <>
      <ProductHead title="Racks and shelving" text="Filter by type, then send us the models you want and your bay sizes for a fixed quote." />
      <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
        <ProductGrid />
      </Suspense>
      <CTA/>
    </>
  )
}