"use client"

import Link from "next/link"

const menuItems = [
  { label: "Profile", href: "/dashboard/profile", icon: "👤" },
  { label: "Education", href: "/dashboard/education", icon: "🎓" },
  { label: "Skills", href: "/dashboard/skills", icon: "⚡" },
  { label: "Experience", href: "/dashboard/experience", icon: "💼" },
  { label: "Documents", href: "/dashboard/documents", icon: "📄" },
  { label: "Social Links", href: "/dashboard/social-links", icon: "🔗" },
  { label: "Projects", href: "/dashboard/projects", icon: "🚀" },
  { label: "Certificates", href: "/dashboard/certificates", icon: "🏆" },
]

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="w-64 border-r border-gray-800 p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-8">
        <span className="text-[#00FF88]">CV</span> Dashboard
      </h2>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-900 hover:text-[#00FF88]">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <button onClick={onLogout}
        className="rounded-lg border border-gray-700 px-4 py-3 text-gray-400 transition hover:border-red-500 hover:text-red-500">
        Logout
      </button>
    </aside>
  )
}
