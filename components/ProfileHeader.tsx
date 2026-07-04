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
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
      <div className="shrink-0">
        {imgSrc ? (
          <img src={imgSrc} alt={name}
            className="h-48 w-48 rounded-2xl object-cover border border-gray-800 shadow-lg shadow-black/40" />
        ) : (
          <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 text-6xl text-[#00FF88] font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">{name}</h1>
        {headline && (
          <p className="mt-2 text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 font-medium">
            {headline}
          </p>
        )}
      </div>
    </div>
  )
}
