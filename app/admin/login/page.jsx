import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth"
import LoginForm from "./LoginForm"

export const metadata = { title: "Admin login", robots: { index: false, follow: false } }

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin")

  return (
    <main className="grid min-h-[100svh] place-items-center bg-slate-100 px-4">
      <LoginForm />
    </main>
  )
}