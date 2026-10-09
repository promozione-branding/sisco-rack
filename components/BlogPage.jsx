// app/blogs/page.jsx
import Link from "next/link"
import { getBlogs } from "@/lib/blogs"

export const revalidate = 60

export default async function BlogsPage() {
  const blogs = await getBlogs()
  return (
    <main>
      {blogs.map((b) => (
        <Link key={b._id} href={`/blogs/${b.slug}`}>
          {b.image && <img src={b.image} alt={b.title} loading="lazy" width={600} height={400} />}
          <h2>{b.title}</h2>
        </Link>
      ))}
    </main>
  )
}