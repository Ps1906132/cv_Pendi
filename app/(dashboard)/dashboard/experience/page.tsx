"use client"

import { useEffect, useState } from "react"

type Item = { id: string; companyName: string; position: string; startDate: string; endDate: string | null; description: string }

export default function ExperiencePage() {
  const [items, setItems] = useState<Item[]>([])
  const [companyName, setCompanyName] = useState("")
  const [position, setPosition] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [editing, setEditing] = useState<string | null>(null)

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  function load() {
    fetch("/api/experience", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((json) => { if (json.success) setItems(json.data) })
  }

  useEffect(load, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = { company_name: companyName, position, start_date: startDate, end_date: endDate || null, description }

    if (editing) {
      await fetch(`/api/experience/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
      setEditing(null)
    } else {
      await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
    }

    setCompanyName(""); setPosition(""); setStartDate(""); setEndDate(""); setDescription("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/experience/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  function handleEdit(item: Item) {
    setCompanyName(item.companyName)
    setPosition(item.position)
    setStartDate(item.startDate.split("T")[0])
    setEndDate(item.endDate ? item.endDate.split("T")[0] : "")
    setDescription(item.description)
    setEditing(item.id)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pengalaman Kerja</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4 mb-8">
        <input type="text" placeholder="Nama Perusahaan" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <input type="text" placeholder="Posisi" value={position} onChange={(e) => setPosition(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <div className="flex gap-3">
          <input type="date" placeholder="Tanggal Mulai" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
          <input type="date" placeholder="Tanggal Selesai" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        </div>
        <textarea placeholder="Deskripsi (opsional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <button type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]">
          {editing ? "Update" : "Tambah"}
        </button>
      </form>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-800 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{item.position}</p>
                <p className="text-sm text-gray-400">{item.companyName} — {item.startDate.split("T")[0]} {item.endDate ? `- ${item.endDate.split("T")[0]}` : "- Sekarang"}</p>
                {item.description && <p className="mt-2 text-sm text-gray-500">{item.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="text-sm text-[#00FF88] hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-sm text-red-400 hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada pengalaman kerja</p>}
      </div>
    </div>
  )
}
