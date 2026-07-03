type Props = {
  name: string
  headline: string
  photo: string
}

export default function ProfileHeader({ name, headline, photo }: Props) {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="h-32 w-32 rounded-full object-cover border-4 border-[#00FF88] shadow-lg shadow-[#00FF88]/20 mb-4"
        />
      ) : (
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-700 bg-gray-900 text-4xl text-gray-500 mb-4">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <h1 className="text-3xl font-bold text-white">{name}</h1>
      {headline && <p className="mt-2 text-lg text-gray-400">{headline}</p>}
    </div>
  )
}
