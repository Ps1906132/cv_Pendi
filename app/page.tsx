import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-2">
        CV <span className="text-[#00FF88]">Online</span>
      </h1>
      <p className="text-gray-400 mb-8">Buat CV digital modern dalam hitungan menit</p>
      <Link
        href="/login"
        className="rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a]"
      >
        Masuk ke Dashboard
      </Link>
    </div>
  )
}
