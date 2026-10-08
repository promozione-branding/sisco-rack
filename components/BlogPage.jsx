"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search, ArrowRight, Send, Boxes } from "lucide-react"
import { categories } from "@/lib/data"

const NAVY = "#0b2a5b"
const BLUE = "#0f4aa8"
const AMBER = "#f5a623"

const wrap = "mx-auto grid max-w-[1910px] items-stretch gap-5 px-14 py-9 max-[1100px]:grid-cols-1 max-[720px]:px-5"
const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5a623]"
const panel = "bg-white shadow-[0_10px_40px_rgba(15,40,90,0.08)]"
const grad = "bg-[linear-gradient(90deg,#0b2a5b,#0f4aa8)]"
const meta = "text-xs text-slate-500"
const iconBtn =
  `grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border-0 p-0 text-white ${grad}`
const field =
  "min-w-0 flex-1 appearance-none border-0 bg-transparent outline-none [font-family:inherit]"

const tabs = [{ id: "all", name: "All Posts" }, ...categories]

const posts = [
  {
    id: 1,
    category: "slotted",
    date: "Oct 06, 2026",
    image: "/slotted_angle_category.webp",
    title: "Slotted Angle Racks: Why They Remain the Backbone of Indian Storage",
    excerpt:
      "Explore why slotted angle racking keeps winning on cost, flexibility and load capacity, and how warehouses are getting more out of every bay.",
    featured: true,
    popular: true,
  },
  {
    id: 2,
    category: "heavy",
    date: "Sep 28, 2026",
    image: "/heavy_duty_steel.webp",
    title: "Heavy Duty Racks: Choosing the Right Beam Load for Your Stock",
    excerpt:
      "Understand beam ratings, upright gauge and pallet weight so your racks carry what you store without sagging over time.",
    popular: true,
  },
  {
    id: 3,
    category: "mezzanine",
    date: "Sep 20, 2026",
    image: "/mezzanine_category.webp",
    title: "Mezzanine Floors: Doubling Your Floor Space Without Moving",
    excerpt:
      "A look at how a second working level, with stairs and safety gates, adds usable area for storage, packing or offices.",
    popular: true,
  },
  {
    id: 4,
    category: "supermarket",
    date: "Sep 12, 2026",
    image: "/supermarket_rack_.webp",
    title: "Supermarket Racks: Layouts That Help Products Sell Faster",
    excerpt:
      "How shelf height, gondola spacing and end-cap placement shape the way shoppers move through a store.",
    popular: true,
  },
  {
    id: 5,
    category: "installation and dismental services",
    date: "Aug 30, 2026",
    image: "/installation.webp",
    title: "Rack Installation Done Right: From Site Survey to Sign-Off",
    excerpt:
      "What a professional installation involves, including floor checks, anchoring, levelling and a final load inspection.",
  },
  {
    id: 6,
    category: "slotted",
    date: "Aug 18, 2026",
    image: "/slotted_angle_category.webp",
    title: "Slotted Angle vs Boltless Shelving: A Simple Comparison",
    excerpt:
      "A plain guide to which system suits workshops, stores and light warehouses, and where each one falls short.",
  },
  {
    id: 7,
    category: "installation and dismental services",
    date: "Aug 05, 2026",
    image: "/warehouse_racks.webp",
    title: "Relocating a Warehouse? Plan Rack Dismantling in Five Steps",
    excerpt:
      "Label, dismantle, transport and reinstall racks with minimal downtime and no lost components.",
  },
  {
    id: 8,
    category: "heavy",
    date: "Jul 22, 2026",
    image: "/heavy_duty_warehouse_rack.webp",
    title: "Rack Safety Checklist Every Warehouse Manager Should Follow",
    excerpt:
      "Spot bent uprights, missing locks and overloaded beams before they turn into accidents or stock losses.",
  },
  {
    id: 9,
    category: "mezzanine",
    date: "Jul 09, 2026",
    image: "/mezzanine.webp",
    title: "Mezzanine Floor Load Planning: Capacity, Decking and Staircases",
    excerpt:
      "Key factors to settle before fabrication, from live load per square metre to fire exits and railing height.",
  },
  {
    id: 10,
    category: "supermarket",
    date: "Jun 25, 2026",
    image: "/wall_mounted_display_rack.webp",
    title: "Gondola vs Wall Racks: Which Fits Your Retail Floor Plan",
    excerpt:
      "Compare footprint, product visibility and restocking effort for small shops and large format stores.",
  },
]

const popular = posts.filter((p) => p.popular).slice(0, 4)

const ctaLabel = (p) =>
  categories.find((c) => c.id === p.category)?.action === "quote" ? "Get a Quote" : "Read More"

export default function BlogPage() {
  const [active, setActive] = useState("all")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("latest")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const counts = useMemo(() => {
    const map = { all: posts.length }
    categories.forEach((c) => {
      map[c.id] = posts.filter((p) => p.category === c.id).length
    })
    return map
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = posts.filter((p) => {
      const inCat = active === "all" || p.category === active
      const text = `${p.title} ${p.excerpt}`.toLowerCase()
      return inCat && (!q || text.includes(q))
    })
    return [...list].sort((x, y) =>
      sort === "latest" ? new Date(y.date) - new Date(x.date) : new Date(x.date) - new Date(y.date)
    )
  }, [active, query, sort])

  const featured = filtered.find((p) => p.featured)
  const articles = filtered.filter((p) => p !== featured)

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return
    setSubscribed(true)
    setEmail("")
  }

  return (
    <main className="bg-slate-50 pb-12 sm:pb-16" style={{ color: NAVY }}>
  

      <div className={wrap}>
        <nav className="max-w-full flex gap-3 overflow-x-auto px-4 pb-3 pt-6 [scrollbar-width:none] sm:mx-0 sm:px-0 md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-solid px-5 py-2.5 text-[13px] font-medium shadow-sm transition [font-family:inherit] sm:px-6 ${focus} ${
                active === t.id
                  ? `border-transparent text-white shadow-[0_8px_20px_rgba(15,60,150,0.3)] ${grad}`
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t.name}
            </button>
          ))}
        </nav>
      </div>

      <div className={`${wrap} mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-7 xl:grid-cols-[minmax(0,1fr)_300px]`}>
        <div className="min-w-0">
          {featured && (
            <article className={`flex flex-col overflow-hidden rounded-3xl md:flex-row ${panel}`}>
              <div className="relative h-56 shrink-0 sm:h-64 md:h-auto md:min-h-[300px] md:w-[300px] xl:w-[340px]">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
                <span
                  className="absolute left-3.5 top-3.5 rounded-md px-3 py-1.5 text-[11px] font-bold"
                  style={{ background: AMBER, color: NAVY }}
                >
                  Featured article
                </span>
              </div>
              <div className="flex flex-1 flex-col items-start p-5 sm:p-6 md:px-7">
                <time className={meta}>{featured.date}</time>
                <h2 className="mb-3.5 mt-3 text-[22px] font-bold leading-tight sm:text-2xl xl:text-[28px]">
                  {featured.title}
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-slate-500">{featured.excerpt}</p>
                <a
                  href="#"
                  className={`mt-auto inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(15,60,150,0.3)] transition hover:brightness-110 ${grad} ${focus}`}
                >
                  Read Full Article <ArrowRight className="h-[14px] w-[14px]" />
                </a>
              </div>
            </article>
          )}

          <div className="mb-4 mt-8 flex flex-wrap items-center justify-between gap-3 sm:mb-5 sm:mt-10">
            <h2 className="text-xl font-bold sm:text-[22px]">Latest Articles</h2>
            <label className="flex items-center gap-2.5 text-xs text-slate-500">
              Sort by:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={`min-w-[110px] rounded-lg border border-solid border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 [font-family:inherit] ${focus}`}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </label>
          </div>

          {articles.length === 0 && !featured ? (
            <p className="py-10 text-sm text-slate-500">
              No articles match your search. Try a different keyword or category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {articles.map((p) => (
                <article key={p.id} className={`flex flex-col overflow-hidden rounded-2xl ${panel}`}>
                  <div className="h-64 sm:h-32 xl:h-[320px]">
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-fill" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <time className={meta}>{p.date}</time>
                    <h3 className="mb-2 mt-2 text-[15px] font-bold leading-snug">{p.title}</h3>
                    <p className="mb-4 text-[12.5px] leading-normal text-slate-500">{p.excerpt}</p>
                    <a
                      href="#"
                      className={`mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-bold hover:text-[#0f4aa8] ${focus}`}
                    >
                      {ctaLabel(p)} <ArrowRight className="h-[13px] w-[13px]" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex lg:flex-col">
          <section className={`rounded-3xl p-5 ${panel}`}>
            <h3 className="mb-3 mt-0.5 text-lg font-bold">Categories</h3>
            <ul className="list-none">
              {tabs.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => setActive(t.id)}
                    className={`flex w-full cursor-pointer items-center gap-2.5 rounded-md border-0 px-2 py-2.5 text-left text-[12.5px] [font-family:inherit] ${focus} ${
                      active === t.id
                        ? "bg-sky-100 font-semibold text-[#0f4aa8]"
                        : "bg-transparent text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Boxes className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{t.name}</span>
                    <b className="text-xs font-medium text-slate-500">{counts[t.id]}</b>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className={`rounded-3xl p-5 ${panel}`}>
            <h3 className="mb-3 mt-0.5 text-lg font-bold">Popular Posts</h3>
            <ul className="list-none space-y-3.5">
              {popular.map((p) => (
                <li key={p.id}>
                  <a href="#" className={`group flex items-center gap-3 ${focus}`}>
                    <div className="h-[62px] w-[70px] shrink-0 overflow-hidden rounded-md">
                      <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <strong className="mb-1.5 block text-[12.5px] leading-snug group-hover:text-[#0f4aa8]">
                        {p.title}
                      </strong>
                      <time className={meta}>{p.date}</time>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* <section className="rounded-3xl bg-gradient-to-b from-sky-50 to-sky-200 px-4 pb-6 pt-5 shadow-[0_10px_40px_rgba(15,40,90,0.08)] text-center md:col-span-2 lg:col-span-1">
            <span
              className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full"
              style={{ background: NAVY }}
            >
              <Send className="h-5 w-5" style={{ color: AMBER }} />
            </span>
            <p className="mb-1.5 text-[11px] font-semibold" style={{ color: BLUE }}>
              Stay updated
            </p>
            <h3 className="mb-2 text-xl font-bold leading-tight">Get the Latest Insights in Your Inbox</h3>
            <p className="mx-auto mb-4 max-w-sm text-xs leading-normal text-slate-500">
              Subscribe for storage tips, rack guides and installation updates.
            </p>

            {subscribed ? (
              <motion.p
                className="text-xs font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                You're subscribed. Watch your inbox for the next article.
              </motion.p>
            ) : (
              <form
                onSubmit={subscribe}
                className="mx-auto flex max-w-sm items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${field} text-xs max-[720px]:text-[16px]`}
                />
                <button type="submit" className={`${iconBtn} ${focus}`}>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </section> */}
        </aside>
      </div>
    </main>
  )
}