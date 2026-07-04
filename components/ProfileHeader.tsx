function toDirectImageUrl(url: string): string {
  if (!url) return url
  const match = url.match(/\/file\/d\/([^/]+)/)
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`
  return url
}

type Props = { name: string; headline: string; photo: string }

export default function ProfileHeader({ name, headline, photo }: Props) {
  const imgSrc = toDirectImageUrl(photo)
  return (
    <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
      <div className="shrink-0 w-64">
        {imgSrc ? (
          <div className="rounded-2xl border border-gray-800 shadow-xl shadow-black/40 overflow-hidden bg-gray-900">
            <img src={imgSrc} alt={name}
              className="w-full h-auto object-cover" />
          </div>
        ) : (
          <div className="flex h-80 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 text-7xl text-[#00FF88] font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 pt-2">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">{name}</h1>
        {headline && (
          <p className="mt-4 text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 font-medium leading-relaxed">
            {headline}
          </p>
        )}
      </div>
    </div>
  )
}
