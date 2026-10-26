import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import { categories } from "@/lib/data"
import ProductDetail from "@/components/ProductDetail"
import ProductGrid from "@/components/ProductGrid"
import ProductHead from "@/components/ProductHead"
import CTA from "@/components/Cta"
import { productSeo, categorySeo } from "@/lib/seo"

const find = (slug) => products.find((p) => (p.slug || p.id) === slug)
// /products/slotted-angle-racks, /products/mezzanine-floors ... are category listings.
// Category slugs take priority, so no product may reuse one of them.
const findCategory = (slug) => categories.find((c) => c.slug === slug && !c.action)

export function generateStaticParams() {
  return [
    ...categories.filter((c) => !c.action).map((c) => ({ slug: c.slug })),
    ...products.map((p) => ({ slug: p.slug || p.id })),
  ]
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const cat = findCategory(slug)
  if (cat) {
    const seo = categorySeo[cat.id]
    return { title: seo.title, description: seo.description }
  }
  const p = find(slug)
  if (!p) return { title: "Product not found" }
  const seo = productSeo[p.slug || p.id]
  if (seo) return { title: seo.title, description: seo.description }
  return { title: `${p.name} | Rackwell Steel`, description: p.description.slice(0, 155) }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const cat = findCategory(slug)
  if (cat) {
    return (
      <>
        <ProductHead title="Racks and shelving" text="Filter by type, then send us the models you want and your bay sizes for a fixed quote." />
        <ProductGrid category={cat.id} />
        <CTA />
      </>
    )
  }
  const product = find(slug)
  if (!product) notFound()
  const related = products.filter((p) => p.id !== product.id && p.cat === product.cat).slice(0, 3)
  return <ProductDetail product={product} related={related} />
}