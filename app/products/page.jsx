import PageHead from "@/components/PageHead"
import ProductGrid from "@/components/ProductGrid"

export const metadata = { title: "Products | Rackwell Steel" }

export default function Products() {
  return (
    <>
      <PageHead title="Racks and shelving" text="Filter by type, then send us the models you want and your bay sizes for a fixed quote." />
      <ProductGrid />
    </>
  )
}
