import { notFound } from "next/navigation"
import { getBlog } from "@/lib/blogs"

export const revalidate = 60

export default async function BlogPage({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()
  return (
    <article>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </article>
  )
}