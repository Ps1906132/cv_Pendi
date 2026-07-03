"use client"

import { useEffect, useState } from "react"

type Item = { id: string; company: string; position: string; year: string; description: string }

export default function ExperiencePage() {
  const [items, setItems] = useState<Item[]>([])
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [year, setYear] = useState("")
  const [description, setDescription] = useState("")
  const [editing, setEditing] = useState<string | null>(null)

  function load() {
    fetch("/api/experience")
      .then((res) => res.json())
      .then(setItems)
  }

  useEffect(load, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = { company, position, year, description }

    if (editing) {
      await fetch(`/api/experience/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      setEditing(null)
    } else {
      await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    }

    setCompany("")
    setPosition("")
    setYear("")
    setDescription("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/experience/${id}`, { method: "DELETE" })
    load()
  }

  function handleEdit(item: Item) {
    setCompany(item.company)
    setPosition(item.position)
    setYear(item.year)
    setDescription(item.description)
    setEditing(item.id)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pengalaman Kerja</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nama Perusahaan"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          required
        />
        <input
          type="text"
          placeholder="Posisi"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          required
        />
        <input
          type="text"
          placeholder="Tahun"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          required
        />
        <textarea
          placeholder="Deskripsi (opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          rows={3}
        />
        <button
          type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]"
        >
          {editing ? "Update" : "Tambah"}
        </button>
      </form>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-800 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{item.position}</p>
                <p className="text-sm text-gray-400">{item.company} - {item.year}</p>
                {item.description && <p className="mt-2 text-sm text-gray-500">{item.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="text-sm text-[#00FF88] hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-sm text-red-400 hover:underline">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada pengalaman kerja</p>}
      </div>
    </div>
  )
}
