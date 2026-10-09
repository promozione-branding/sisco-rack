import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/auth"
import db from "@/lib/db"
import { Blog, getBlogs, slugify } from "@/lib/blogs"

export async function GET() {
  return NextResponse.json(await getBlogs())
}

export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const { title, content, image } = await req.json()
  if (!title || !content) return NextResponse.json({ message: "title and content required" }, { status: 400 })

  await db()
  let slug = slugify(title) || "post"
  if (await Blog.exists({ slug })) slug += "-" + Date.now().toString(36)

  const blog = await Blog.create({ title, content, image, slug })
  revalidatePath("/blogs")
  return NextResponse.json(blog, { status: 201 })
}