"use client"

import { useEffect, useState } from "react"

type Item = { id: string; name: string }

export default function SkillsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [name, setName] = useState("")

  function load() {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setItems)
  }

  useEffect(load, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
    setName("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/skills/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Keahlian</h2>
      <form onSubmit={handleAdd} className="flex gap-3 max-w-md mb-8">
        <input
          type="text"
          placeholder="Nama skill"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]"
        >
          Tambah
        </button>
      </form>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item.id}
            className="group flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-sm"
          >
            {item.name}
            <button
              onClick={() => handleDelete(item.id)}
              className="text-gray-500 transition hover:text-red-400"
            >
              ×
            </button>
          </span>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada skill</p>}
      </div>
    </div>
  )
}
