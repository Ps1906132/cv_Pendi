"use client"

import { useEffect, useState } from "react"

type Item = { id: string; title: string; issuer: string; issueDate: string; certificateUrl: string }

export default function CertificatesPage() {
  const [items, setItems] = useState<Item[]>([])
  const [title, setTitle] = useState("")
  const [issuer, setIssuer] = useState("")
  const [issueDate, setIssueDate] = useState("")
  const [certificateUrl, setCertificateUrl] = useState("")

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  function load() {
    fetch("/api/certificates", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((json) => { if (json.success) setItems(json.data) })
  }

  useEffect(load, [token])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await fetch("/api/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, issuer, issue_date: issueDate, certificate_url: certificateUrl }),
    })
    setTitle(""); setIssuer(""); setIssueDate(""); setCertificateUrl("")
    load()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/certificates/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sertifikat</h2>
      <form onSubmit={handleAdd} className="max-w-md space-y-4 mb-8">
        <input type="text" placeholder="Nama Sertifikat" value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <input type="text" placeholder="Penerbit" value={issuer} onChange={(e) => setIssuer(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        <input type="date" placeholder="Tanggal Terbit" value={issueDate} onChange={(e) => setIssueDate(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" required />
        <input type="url" placeholder="URL Sertifikat" value={certificateUrl} onChange={(e) => setCertificateUrl(e.target.value)}
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
                <p className="text-sm text-gray-400">{item.issuer} — {item.issueDate.split("T")[0]}</p>
                {item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF88] hover:underline">Lihat Sertifikat</a>}
              </div>
              <button onClick={() => handleDelete(item.id)}
                className="rounded px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/20">Hapus</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">Belum ada sertifikat</p>}
      </div>
    </div>
  )
}
