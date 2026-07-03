"use client"

import { useState, useEffect } from "react"

export function useProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { setLoading(false); return }
    fetch("/api/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((json) => { if (json.success) setProfile(json.data) })
      .finally(() => setLoading(false))
  }, [])

  return { profile, loading }
}
