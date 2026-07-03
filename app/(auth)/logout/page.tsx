"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem("token")
    router.push("/login")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <p className="text-gray-400">Logging out...</p>
    </div>
  )
}
