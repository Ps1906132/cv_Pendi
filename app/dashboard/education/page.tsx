"use client"

import { useEffect, useState } from "react"

type Item = { id: string; school: string; major: string; year: string }

export default function EducationPage() {
  const [items, setItems] = useState<Item[]>([])
  const [school, setSchool] = useState("")
  const [major, setMajor] = useState("")
  const [year, setYear] = useState("")

  function load() {
    fetch("/api/education")
      .then((res) => res.json())
      .then(setItems)
  }

  useEffect(load, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school, major, year }),
    })
    setSchool("")
    setMajor("")
    setYear("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/education/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pendidikan</h2>
      <form onSubmit={handleAdd} className="max-w-md space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nama Sekolah/Universitas"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          required
        />
        <input
          type="text"
          placeholder="Jurusan"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          required
        />
        <input
          type="text"
          placeholder="Tahun (contoh: 2020-2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]"
        >
          Tambah
        </button>
      </form>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
            <div>
              <p className="font-semibold">{item.school}</p>
              <p className="text-sm text-gray-400">{item.major} - {item.year}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="rounded px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/20"
            >
              Hapus
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada data pendidikan</p>}
      </div>
    </div>
  )
}
