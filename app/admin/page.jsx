import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth"
import { getBlogs, thumb } from "@/lib/blogs"
import DeleteButton from "@/components/DeleteButton"

export const metadata = { title: "Admin | Blogs", robots: { index: false, follow: false } }

export default async function AdminBlogsPage() {
  if (!(await isAdmin())) redirect("/admin/login")

  const blogs = await getBlogs()

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">
          All blogs <span className="text-base font-normal text-slate-500">({blogs.length})</span>
        </h1>
        <Link href="/admin/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          + Add blog
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        {blogs.length === 0 && <p className="p-8 text-center text-slate-500">No blogs yet. Add your first one.</p>}

        {blogs.map((b) => (
          <div key={b._id} className="flex flex-wrap items-center gap-4 border-b border-slate-100 p-4 last:border-0">
            <img src={thumb(b.image, 160)} alt="" width={80} height={56} loading="lazy" className="h-14 w-20 rounded-lg object-cover" />

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-slate-900">{b.title}</p>
              <p className="text-xs text-slate-500">
                {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })} · /{b.permalink}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Link href={`/blogs/${b.permalink}`} target="_blank" className="rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-100">
                View
              </Link>
              <Link href={`/admin/edit/${b.permalink}`} className="rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-900 hover:bg-slate-200">
                Edit
              </Link>
              <DeleteButton slug={b.permalink} title={b.title} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}