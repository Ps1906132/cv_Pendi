"use client"

import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [fullName, setFullName] = useState("")
  const [headline, setHeadline] = useState("")
  const [about, setAbout] = useState("")
  const [photo, setPhoto] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setFullName(json.data.fullName || "")
          setHeadline(json.data.headline || "")
          setAbout(json.data.about || "")
          setPhoto(json.data.photo || "")
          setPhone(json.data.phone || "")
          setEmail(json.data.email || "")
          setAddress(json.data.address || "")
        }
      })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ full_name: fullName, headline, about, photo, phone, email, address }),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSave} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Nama Lengkap</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Headline / Profesi</label>
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Tentang Saya</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={3}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">URL Foto Profil</label>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="https://example.com/photo.jpg"
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
          <p className="mt-1 text-xs text-gray-600">Link Google Drive otomatis dikonversi. Atau pakai link gambar langsung (imgur, postimages, dll)</p>
          {photo && (
            <div className="mt-3 flex items-center gap-3">
              <img src={photo} alt="preview" className="h-14 w-14 rounded-full object-cover border border-gray-700"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
              <span className="text-xs text-gray-500">Preview</span>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Nomor HP</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email Publik</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Alamat</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88]" />
        </div>
        <button type="submit"
          className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]">
          {saved ? "Tersimpan ✓" : "Simpan"}
        </button>
      </form>
    </div>
  )
}
