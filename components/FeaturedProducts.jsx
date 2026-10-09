import { featuredproducts } from "@/lib/data"
import FeaturedProductsGrid from "./FeaturedProductsGrid"

const WORD_LIMIT = 12
const FEATURED_CATS = ["slotted", "mezzanine", "supermarket", "heavy"]

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

const SPEC_CANDIDATES = [
  { icon: "Tag", label: "Type", keys: ["rack type", "floor type", "product type", "type", "structural type", "shelf type", "design", "mount type"] },
  { icon: "Weight", label: "Load Capacity", keys: ["load capacity per layer", "load per layer", "load capacity per level", "load capacity per shelf", "max load per shelf", "load capacity", "storage capacity", "bearing capacity", "frame load capacity", "weight tolerance capacity"] },
  { icon: "Ruler", label: "Height", keys: ["height", "height feet", "height in feet", "system height", "platform height"] },
  { icon: "Layers", label: "Material", keys: ["material", "material grade"] },
  { icon: "Paintbrush", label: "Finish", keys: ["surface treatment", "surface finish", "finish", "finishing", "finish type", "finishing type", "coating", "coated"] },
  { icon: "List", label: "Shelves", keys: ["number of shelves", "no of shelves", "number of levels", "layers per rack", "number of tiers", "shelves"] },
  { icon: "Info", label: "Usage", keys: ["usage application", "usage", "application", "applications", "uses", "usage area"] },
  { icon: "Palette", label: "Color", keys: ["color", "rack color", "color theme"] },
]

function getSpecs(p) {
  const map = {}
  for (const [k, v] of Object.entries(p.specs || {})) map[norm(k)] = v
  const found = []
  for (const { icon, label, keys } of SPEC_CANDIDATES) {
    const key = keys.find((k) => map[k] !== undefined && map[k] !== null && String(map[k]).trim() !== "")
    if (key) found.push({ icon, label, value: String(map[key]).trim() })
    if (found.length === 2) break
  }
  return found
}

function truncateWords(text = "", limit = WORD_LIMIT) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length <= limit) return { short: text.trim(), needsMore: false }
  return { short: words.slice(0, limit).join(" ") + "…", needsMore: true }
}


async function getFeatured() {
  const byCat = FEATURED_CATS.map((c) => featuredproducts.filter((p) => p.cat === c))
  return [...byCat.map((l) => l[0]), ...byCat.map((l) => l[1])].filter(Boolean).slice(0, 8)
}

export default async function FeaturedProducts() {
  const raw = await getFeatured()

  const products = raw.map((p) => {
    const { short, needsMore } = truncateWords(p.text || p.description || "")
    return {
      id: p.id,
      slug: p.slug || p.id,
      name: p.name,
      image: p.image,
      short,
      needsMore,
      specs: getSpecs(p),
    }
  })

  return (
    <section className="py-12 max-[720px]:py-10 min-[961px]:py-7">
      <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="mb-11 text-center min-[961px]:mb-[18px]">
          <span className="inline-flex items-center gap-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-3 after:h-px after:w-12 after:bg-steel-deep after:content-['']">Featured products</span>
          <h2 className="mt-3.5 min-[961px]:mt-2 min-[961px]:text-[length:clamp(1.8rem,3.4vw,2.8rem)]">
            Our <span className="text-blue">Best Sellers</span>
          </h2>
          <p className="mx-auto mt-[18px] max-w-[60ch] text-[1rem] text-muted min-[961px]:mt-2 min-[961px]:text-[0.92rem]">
            Hand-picked steel racks trusted by warehouses, factories and retail stores. Built for strength. Made for your space.
          </p>
        </div>

        <FeaturedProductsGrid products={products} />
      </div>
    </section>
  )
}