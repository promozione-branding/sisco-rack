import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth"

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login")

  return <main>Admin dashboard (blog list goes here)</main>
}