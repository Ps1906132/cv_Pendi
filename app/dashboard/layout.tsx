"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

const menuItems = [
  { label: "Profile", href: "/dashboard/profile", icon: "👤" },
  { label: "Education", href: "/dashboard/education", icon: "🎓" },
  { label: "Skills", href: "/dashboard/skills", icon: "⚡" },
  { label: "Experience", href: "/dashboard/experience", icon: "💼" },
  { label: "Documents", href: "/dashboard/documents", icon: "📄" },
  { label: "Social Links", href: "/dashboard/social", icon: "🔗" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) router.push("/login")
        else setReady(true)
      })
      .catch(() => router.push("/login"))
  }, [router])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B]">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0B0B0B]">
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">
          <span className="text-[#00FF88]">CV</span> Dashboard
        </h2>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-900 hover:text-[#00FF88]"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-700 px-4 py-3 text-gray-400 transition hover:border-red-500 hover:text-red-500"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
