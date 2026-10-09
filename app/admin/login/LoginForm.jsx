"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.replace("/admin")
        router.refresh()
        return
      }
      const data = await res.json().catch(() => ({}))
      setError(data.message || "Login failed")
    } catch {
      setError("Network error, please try again")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-slate-900">Admin login</h1>
      <p className="mt-1 text-sm text-slate-500">Sign in to manage blogs.</p>

      <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        autoComplete="username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-900"
      />

      <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-900"
      />

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-slate-900 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}