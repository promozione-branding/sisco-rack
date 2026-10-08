import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import ProductDetail from "@/components/ProductDetail"
import { productSeo } from "@/lib/seo"

const find = (slug) => products.find((p) => (p.slug || p.id) === slug)

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug || p.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = find(slug)
  if (!p) return { title: "Product not found" }
  const seo = productSeo[p.slug || p.id]
  if (seo) return { title: seo.title, description: seo.description }
  return { title: `${p.name} | Rackwell Steel`, description: p.description.slice(0, 155) }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = find(slug)
  if (!product) notFound()
  const related = products.filter((p) => p.id !== product.id && p.cat === product.cat).slice(0, 3)
  return <ProductDetail product={product} related={related} />
}