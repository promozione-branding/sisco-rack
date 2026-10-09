import mongoose from "mongoose"
import db from "./db"

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
)

export const Blog = mongoose.models.Blog || mongoose.model("Blog", schema)

export const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

const plain = (x) => JSON.parse(JSON.stringify(x))

export async function getBlogs() {
  await db()
  return plain(await Blog.find().select("-content").sort({ createdAt: -1 }).lean())
}

export async function getBlog(slug) {
  await db()
  return plain(await Blog.findOne({ slug }).lean())
}