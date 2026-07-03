"use client"

import { useEffect, useState } from "react"

type Item = { id: string; label: string; url: string }

export default function DocumentsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [label, setLabel] = useState("")
  const [url, setUrl] = useState("")

  function load() {
    fetch("/api/documents")
      .then((res) => res.json())
      .then(setItems)
  }

  useEffect(load, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, url }),
    })
    setLabel("")
    setUrl("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/documents/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dokumen</h2>
      <form onSubmit={handleAdd} className="max-w-md space-y-4 mb-8">
        <input
          type="text"
          placeholder="Label (contoh: CV PDF)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]"
          required
        />
        <input
          type="url"
          placeholder="URL (Google Drive / PDF)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
              <p className="font-semibold">{item.label}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF88] hover:underline">
                {item.url}
              </a>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="rounded px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/20"
            >
              Hapus
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada dokumen</p>}
      </div>
    </div>
  )
}
