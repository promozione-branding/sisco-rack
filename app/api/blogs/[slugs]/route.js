import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/auth"
import db from "@/lib/db"
import { Blog, getBlog } from "@/lib/blogs"

const unauthorized = () => NextResponse.json({ message: "Unauthorized" }, { status: 401 })

// Public: one blog
export async function GET(_req, { params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) return NextResponse.json({ message: "Not found" }, { status: 404 })
  return NextResponse.json(blog)
}

export async function PUT(req, { params }) {
  if (!(await isAdmin())) return unauthorized()
  const { slug } = await params
  const body = await req.json()

  const data = {}
  for (const k of ["title", "content", "image"]) if (body[k] !== undefined) data[k] = body[k]

  await db()
  const blog = await Blog.findOneAndUpdate({ slug }, data, { new: true, runValidators: true })
  if (!blog) return NextResponse.json({ message: "Not found" }, { status: 404 })

  revalidatePath("/blogs")
  revalidatePath(`/blogs/${slug}`)
  return NextResponse.json(blog)
}

export async function DELETE(_req, { params }) {
  if (!(await isAdmin())) return unauthorized()
  const { slug } = await params

  await db()
  await Blog.findOneAndDelete({ slug })
  revalidatePath("/blogs")
  return NextResponse.json({ ok: true })
}