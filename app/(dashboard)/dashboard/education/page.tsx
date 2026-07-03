"use client"

import { useEffect, useState } from "react"

type Item = { id: string; schoolName: string; major: string; degree: string; startYear: number; endYear: number; description: string }

export default function EducationPage() {
  const [items, setItems] = useState<Item[]>([])
  const [schoolName, setSchoolName] = useState("")
  const [major, setMajor] = useState("")
  const [degree, setDegree] = useState("")
  const [startYear, setStartYear] = useState("")
  const [endYear, setEndYear] = useState("")
  const [description, setDescription] = useState("")

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  function load() {
    fetch("/api/education", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((json) => { if (json.success) setItems(json.data) })
  }

  useEffect(load, [token])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ school_name: schoolName, major, degree, start_year: parseInt(startYear), end_year: parseInt(endYear), description }),
    })
    setSchoolName(""); setMajor(""); setDegree(""); setStartYear(""); setEndYear(""); setDescription("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/education/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pendidikan</h2>
      <form onSubmit={handleAdd} className="max-w-md space-y-4 mb-8">
        <input type="text" placeholder="Nama Sekolah/Universitas" value={schoolName} onChange={(e) => setSchoolName(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <input type="text" placeholder="Jurusan" value={major} onChange={(e) => setMajor(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <input type="text" placeholder="Gelar (S1, D3, dll)" value={degree} onChange={(e) => setDegree(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <div className="flex gap-3">
          <input type="number" placeholder="Tahun Mulai" value={startYear} onChange={(e) => setStartYear(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
          <input type="number" placeholder="Tahun Selesai" value={endYear} onChange={(e) => setEndYear(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        </div>
        <textarea placeholder="Deskripsi (opsional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <button type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]">
          Tambah
        </button>
      </form>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
            <div>
              <p className="font-semibold">{item.schoolName}</p>
              <p className="text-sm text-gray-400">{item.degree ? `${item.degree} - ` : ""}{item.major} ({item.startYear}-{item.endYear})</p>
              {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
            </div>
            <button onClick={() => handleDelete(item.id)}
              className="rounded px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/20">Hapus</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada data pendidikan</p>}
      </div>
    </div>
  )
}
