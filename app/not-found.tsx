import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0B0B]">
      <h1 className="text-6xl font-bold text-[#00FF88] mb-4">404</h1>
      <p className="text-gray-400 mb-8">Halaman tidak ditemukan</p>
      <Link href="/"
        className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]">
        Kembali ke Beranda
      </Link>
    </div>
  )
}
