import { notFound, redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth"
import { getBlog } from "@/lib/blogs"
import BlogForm from "@/components/BlogForm"

export default async function EditBlogPage({ params }) {
  if (!(await isAdmin())) redirect("/admin/login")

  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit blog</h1>
      <BlogForm blog={blog} />
    </>
  )
}