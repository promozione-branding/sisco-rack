import { isAdmin } from "@/lib/auth"
import AdminSidebar from "@/components/AdminSidebar"

export default async function AdminLayout({ children }) {
  // Not logged in (e.g. the login page): render the page as is, with no sidebar
  if (!(await isAdmin())) return children

  return (
    <div className="flex min-h-[100svh] flex-col bg-slate-100 md:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1 p-4 md:p-8">{children}</div>
    </div>
  )
}