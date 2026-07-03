"use client"

import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [name, setName] = useState("")
  const [headline, setHeadline] = useState("")
  const [photo, setPhoto] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setName(data.name || "")
          setHeadline(data.headline || "")
          setPhoto(data.photo || "")
        }
      })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, headline, photo }),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSave} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Headline / Profesi</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">URL Foto Profil</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]"
        >
          {saved ? "Tersimpan ✓" : "Simpan"}
        </button>
      </form>
    </div>
  )
}
