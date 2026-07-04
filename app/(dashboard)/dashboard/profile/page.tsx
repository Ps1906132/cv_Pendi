"use client"

import { useEffect, useState, useRef } from "react"

export default function ProfilePage() {
  const [fullName, setFullName] = useState("")
  const [headline, setHeadline] = useState("")
  const [about, setAbout] = useState("")
  const [photo, setPhoto] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

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
          setPhotoPreview(json.data.photo || "")
          setPhone(json.data.phone || "")
          setEmail(json.data.email || "")
          setAddress(json.data.address || "")
        }
      })
  }, [])

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPhotoPreview(result)
    }
    reader.readAsDataURL(file)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const payload: Record<string, string> = { full_name: fullName, headline, about, phone, email, address }
    if (photoFile) {
      const reader = new FileReader()
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(photoFile)
      })
      payload.photo = base64
    } else {
      payload.photo = photo
    }
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
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
          <label className="block text-sm text-gray-400 mb-1">Foto Profil</label>
          <div className="flex items-center gap-4">
            {photoPreview && (
              <img src={photoPreview} alt="preview"
                className="h-16 w-16 rounded-full object-cover border border-gray-700"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
            )}
            <button type="button" onClick={() => fileRef.current?.click()}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-[#00FF88] hover:text-[#00FF88] transition">
              Pilih Foto
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          <p className="mt-1 text-xs text-gray-600">Pilih file gambar dari komputer. Maks 2MB.</p>
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
