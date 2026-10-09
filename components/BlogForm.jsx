"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const input =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-slate-900"

export default function BlogForm({ blog }) {
  const router = useRouter()
  const editing = Boolean(blog) // blog is passed on the Edit page, empty on the Add page

  const [form, setForm] = useState({
    title: blog?.title ?? "",
    image: blog?.image ?? "",
    content: blog?.content ?? "",
  })
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    setSaving(true)

    try {
      const res = await fetch(editing ? `/api/blogs/${blog.slug}` : "/api/blogs", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        router.push("/admin")
        router.refresh()
        return
      }

      if (res.status === 401) {
        router.replace("/admin/login")
        return
      }

      const data = await res.json().catch(() => ({}))
      setError(data.message || "Something went wrong")
    } catch {
      setError("Network error, please try again")
    }
    setSaving(false)
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5 rounded-xl bg-white p-6 shadow">
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="title">
          Title
        </label>
        <input id="title" required value={form.title} onChange={set("title")} className={input} />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="image">
          Cover image URL
        </label>
        <input
          id="image"
          value={form.image}
          onChange={set("image")}
          placeholder="/blog-cover.webp or https://…"
          className={input}
        />
        {form.image && <img src={form.image} alt="" className="mt-3 h-32 rounded-lg object-cover" />}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="content">
          Content (HTML)
        </label>
        <textarea
          id="content"
          required
          rows={14}
          value={form.content}
          onChange={set("content")}
          placeholder="<p>Write your blog here…</p>"
          className={`${input} font-mono text-sm`}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-slate-900 px-6 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : editing ? "Save changes" : "Publish blog"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-lg px-4 py-2.5 text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}