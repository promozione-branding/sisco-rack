import { Suspense } from "react"
import CTA from "@/components/Cta"
import ProductGrid from "@/components/ProductGrid"
import ProductHead from "@/components/ProductHead"
import { pageSeo, categorySeo } from "@/lib/seo"

// Default meta for /products; the category views (?cat=slotted, mezzanine, supermarket, heavy) use their own.
export async function generateMetadata({ searchParams }) {
  const sp = await searchParams
  const cat = Array.isArray(sp?.cat) ? sp.cat[0] : sp?.cat
  const seo = categorySeo[cat] || pageSeo.products
  return { title: seo.title, description: seo.description }
}

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