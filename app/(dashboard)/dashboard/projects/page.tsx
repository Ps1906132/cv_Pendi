"use client"

import { useEffect, useState } from "react"

type Item = { id: string; title: string; description: string; githubUrl: string; demoUrl: string }

export default function ProjectsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [demoUrl, setDemoUrl] = useState("")

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  function load() {
    fetch("/api/projects", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((json) => { if (json.success) setItems(json.data) })
  }

  useEffect(load, [token])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description, github_url: githubUrl, demo_url: demoUrl }),
    })
    setTitle(""); setDescription(""); setGithubUrl(""); setDemoUrl("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Portfolio Project</h2>
      <form onSubmit={handleAdd} className="max-w-md space-y-4 mb-8">
        <input type="text" placeholder="Nama Project" value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <textarea placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <input type="url" placeholder="URL GitHub" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <input type="url" placeholder="URL Demo" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <button type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]">
          Tambah
        </button>
      </form>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-800 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{item.title}</p>
                {item.description && <p className="text-sm text-gray-400 mt-1">{item.description}</p>}
                <div className="flex gap-3 mt-2">
                  {item.githubUrl && <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF88] hover:underline">GitHub</a>}
                  {item.demoUrl && <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF88] hover:underline">Demo</a>}
                </div>
              </div>
              <button onClick={() => handleDelete(item.id)}
                className="rounded px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/20">Hapus</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada project</p>}
      </div>
    </div>
  )
}
