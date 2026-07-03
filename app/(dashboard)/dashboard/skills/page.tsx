"use client"

import { useEffect, useState } from "react"

type Item = { id: string; skillName: string; level: number }

export default function SkillsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [skillName, setSkillName] = useState("")
  const [level, setLevel] = useState("")

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  function load() {
    fetch("/api/skills", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((json) => { if (json.success) setItems(json.data) })
  }

  useEffect(load, [token])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ skill_name: skillName, level: parseInt(level) || 0 }),
    })
    setSkillName(""); setLevel("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/skills/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Keahlian</h2>
      <form onSubmit={handleAdd} className="flex gap-3 max-w-md mb-8">
        <input type="text" placeholder="Nama skill" value={skillName} onChange={(e) => setSkillName(e.target.value)}
          className="flex-1 rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <input type="number" placeholder="Level (0-100)" value={level} onChange={(e) => setLevel(e.target.value)}
          className="w-24 rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <button type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]">
          Tambah
        </button>
      </form>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <span key={item.id} className="group flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-sm">
            {item.skillName}
            {item.level > 0 && <span className="text-gray-500">({item.level}%)</span>}
            <button onClick={() => handleDelete(item.id)} className="text-gray-500 transition hover:text-red-400">×</button>
          </span>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada skill</p>}
      </div>
    </div>
  )
}
