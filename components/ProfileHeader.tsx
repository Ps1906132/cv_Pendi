type Props = { name: string; headline: string; photo: string }

export default function ProfileHeader({ name, headline, photo }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00FF88] via-[#00cc6a] to-[#00FF88] opacity-50 blur-lg" />
        {photo ? (
          <img src={photo} alt={name}
            className="relative h-32 w-32 rounded-full object-cover border-2 border-gray-800" />
        ) : (
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 text-4xl text-[#00FF88] font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight">{name}</h1>
      {headline && (
        <p className="mt-3 text-lg text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 font-medium">
          {headline}
        </p>
      )}
    </div>
  )
}
