"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Login gagal")
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-[#00FF88]">Login</span>
        </h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-[#00FF88] p-3 font-semibold text-black transition hover:bg-[#00cc6a]"
        >
          Masuk
        </button>

      </form>
    </div>
  )
}
