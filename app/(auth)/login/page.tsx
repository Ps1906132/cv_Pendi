"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const json = await res.json()

    if (!json.success) {
      setError(json.message || "Login gagal")
      return
    }

    localStorage.setItem("token", json.data.token)
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <p className="text-center text-sm text-gray-400">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#00FF88] hover:underline">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  )
}
