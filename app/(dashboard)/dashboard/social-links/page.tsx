"use client"

import { useEffect, useState } from "react"

type Item = { id: string; platform: string; icon: string; url: string }

const platforms = ["GitHub", "LinkedIn", "YouTube", "Instagram", "Facebook", "TikTok", "Website"]

export default function SocialLinksPage() {
  const [items, setItems] = useState<Item[]>([])
  const [platform, setPlatform] = useState(platforms[0])
  const [icon, setIcon] = useState("")
  const [url, setUrl] = useState("")

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  function load() {
    fetch("/api/social-links", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((json) => { if (json.success) setItems(json.data) })
  }

  useEffect(load, [token])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ platform, icon, url }),
    })
    setUrl(""); setIcon("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/social-links/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Social Media</h2>
      <form onSubmit={handleAdd} className="max-w-md space-y-4 mb-8">
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-[#0B0B0B] p-3 text-white outline-none focus:border-[#00FF88]">
          {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <input type="text" placeholder="Nama Icon (github, linkedin, dll)" value={icon} onChange={(e) => setIcon(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <input type="url" placeholder="URL profil" value={url} onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <button type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]">
          Tambah
        </button>
      </form>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
            <div>
              <p className="font-semibold">{item.platform}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF88] hover:underline">{item.url}</a>
            </div>
            <button onClick={() => handleDelete(item.id)}
              className="rounded px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/20">Hapus</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada social media</p>}
      </div>
    </div>
  )
}
