import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth"
import BlogForm from "@/components/BlogForm"

export default async function NewBlogPage() {
  if (!(await isAdmin())) redirect("/admin/login")

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Add blog</h1>
      <BlogForm />
    </>
  )
}