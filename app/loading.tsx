export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-[#00FF88]" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </div>
  )
}
