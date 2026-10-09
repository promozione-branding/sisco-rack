import Link from "next/link"
import { cache } from "react"
import { notFound } from "next/navigation"
import { getBlog, thumb } from "@/lib/blogs"

export const revalidate = 60

const load = cache(getBlog)
const plainText = (html = "") => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = await load(slug)
  if (!blog) return {}
  return {
    title: blog.metaTitle || `${blog.title} | Sisco Steel`,
    description: blog.metaDescription || plainText(blog.content).slice(0, 160),
    openGraph: { images: [blog.image] },
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const blog = await load(slug)
  if (!blog) notFound()

  const date = new Date(blog.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  })
  const minutes = Math.max(1, Math.round(plainText(blog.content).split(" ").length / 200))

  return (
    <>
      <section className="relative isolate flex min-h-[46svh] items-end justify-center overflow-hidden bg-[#253970] px-6 pb-24 pt-40 text-center text-white max-[720px]:pt-36">
        <img
          src={thumb(blog.image, 1600)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 -z-[2] h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(11,42,91,0.55)_0%,rgba(11,42,91,0.75)_100%)]" aria-hidden="true" />

        <div className="mx-auto w-full max-w-[860px]">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#f5a623]">
            {date} · {minutes} min read
          </p>
          <h1 className="mt-3 text-[length:clamp(2rem,5.2vw,3.6rem)] leading-[1.1] text-white">{blog.title}</h1>
        </div>
      </section>

      <article className="relative z-10 mx-auto -mt-14 mb-16 w-full max-w-[820px] px-4">
        <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(15,40,90,0.12)] md:p-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <Link href="/blogs" className="font-semibold text-[#253970] hover:underline">← Back to all blogs</Link>
            <Link href="/contact" className="rounded-full bg-[#f5a623] px-6 py-3 font-bold text-[#0b2a5b] transition hover:brightness-95">
              Get a quote
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}