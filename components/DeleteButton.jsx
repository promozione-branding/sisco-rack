"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DeleteButton({ slug, title }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  const remove = async () => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setBusy(true)
    const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" })
    if (res.ok) router.refresh()
    else {
      alert("Delete failed")
      setBusy(false)
    }
  }

  return (
    <button
      onClick={remove}
      disabled={busy}
      className="rounded-lg px-3 py-1.5 font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {busy ? "Deleting…" : "Delete"}
    </button>
  )
}