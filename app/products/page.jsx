import ProductGrid from "@/components/ProductGrid"
import ProductHead from "@/components/ProductHead"

export const metadata = { title: "Products | Rackwell Steel" }

export default function Products() {
  return (
    <>
      <ProductHead title="Racks and shelving" text="Filter by type, then send us the models you want and your bay sizes for a fixed quote." />
      <ProductGrid />
    </>
  )
}
