"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const input =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-slate-900"
const label = "text-sm font-medium text-slate-700"

const toSlug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export default function BlogForm({ blog }) {
  const router = useRouter()
  const editing = Boolean(blog)

  const [form, setForm] = useState({
    title: blog?.title ?? "",
    permalink: blog?.permalink ?? "",
    date: blog?.date ? blog.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
    metaTitle: blog?.metaTitle ?? "",
    metaDescription: blog?.metaDescription ?? "",
    content: blog?.content ?? "",
    image: blog?.image ?? "",
    imageFileId: blog?.imageFileId ?? "",
  })
  const [permalinkEdited, setPermalinkEdited] = useState(editing) // auto-fill only for new blogs
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onTitle = (e) => {
    const title = e.target.value
    setForm((f) => ({ ...f, title, ...(permalinkEdited ? {} : { permalink: toSlug(title) }) }))
  }

  const onPermalink = (e) => {
    setPermalinkEdited(true)
    setForm((f) => ({ ...f, permalink: toSlug(e.target.value) }))
  }

  const upload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError("")
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json().catch(() => ({}))
      if (res.status === 401) return router.replace("/admin/login")
      if (!res.ok) throw new Error(data.message || "Upload failed")
      setForm((f) => ({ ...f, image: data.url, imageFileId: data.fileId }))
    } catch (err) {
      setError(err.message)
    }
    setUploading(false)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    if (!form.image || !form.imageFileId) return setError("Please upload a cover image")

    setSaving(true)
    try {
      const res = await fetch(editing ? `/api/blogs/${blog.permalink}` : "/api/blogs", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        router.push("/admin")
        router.refresh()
        return
      }
      if (res.status === 401) return router.replace("/admin/login")

      const data = await res.json().catch(() => ({}))
      setError(data.message || "Something went wrong")
    } catch {
      setError("Network error, please try again")
    }
    setSaving(false)
  }

  return (
    <form onSubmit={submit} className="max-w-7xl space-y-5 rounded-xl bg-white p-6 shadow">
      <div>
        <label className={label} htmlFor="title">Title</label>
        <input id="title" required value={form.title} onChange={onTitle} className={input} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="permalink">Permalink</label>
          <input id="permalink" required value={form.permalink} onChange={onPermalink} placeholder="my-blog-title" className={input} />
          <p className="mt-1 text-xs text-slate-500">/blogs/{form.permalink || "…"}</p>
        </div>
        <div>
          <label className={label} htmlFor="date">Date</label>
          <input id="date" type="date" required value={form.date} onChange={set("date")} className={input} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="image">Cover image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={upload}
          className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-700"
        />
        <p className="mt-1 text-xs text-slate-500">{uploading ? "Uploading…" : "Max 4 MB. Uploads as soon as you choose a file."}</p>
        {form.image && <img src={form.image} alt="" className="mt-3 h-36 rounded-lg object-cover" />}
      </div>

      <div>
        <label className={label} htmlFor="metaTitle">Meta title (SEO)</label>
        <input id="metaTitle" value={form.metaTitle} onChange={set("metaTitle")} className={input} />
      </div>

      <div>
        <label className={label} htmlFor="metaDescription">Meta description (SEO)</label>
        <textarea id="metaDescription" rows={3} value={form.metaDescription} onChange={set("metaDescription")} className={input} />
      </div>

      <div>
        <label className={label} htmlFor="content">Content (HTML)</label>
        <textarea
          id="content"
          rows={14}
          value={form.content}
          onChange={set("content")}
          placeholder="<p>Write your blog here…</p>"
          className={`${input} font-mono text-sm`}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-lg bg-slate-900 px-6 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : editing ? "Save changes" : "Publish blog"}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="rounded-lg px-4 py-2.5 text-slate-600 hover:bg-slate-100">
          Cancel
        </button>
      </div>
    </form>
  )
}