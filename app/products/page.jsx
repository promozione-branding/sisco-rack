import CTA from "@/components/Cta"
import ProductGrid from "@/components/ProductGrid"
import ProductHead from "@/components/ProductHead"
import { pageSeo } from "@/lib/seo"

// Meta for /products; category views (/products/slotted, mezzanine, supermarket, heavy) use their own.
export const metadata = {
  title: pageSeo.products.title,
  description: pageSeo.products.description,
}

export default function Products() {
  return (
    <>
      <ProductHead title="Racks and shelving" text="Filter by type, then send us the models you want and your bay sizes for a fixed quote." />
      <ProductGrid />
      <CTA/>
    </>
  )
}