"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
      <Link href="/" className="text-xl font-bold">
        <span className="text-[#00FF88]">CV</span> Online
      </Link>
    </nav>
  )
}
