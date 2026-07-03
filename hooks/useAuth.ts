"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetch("/api/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) { localStorage.removeItem("token"); router.push("/login") }
        else setUserId("authenticated")
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false))
  }, [router])

  return { userId, loading }
}
