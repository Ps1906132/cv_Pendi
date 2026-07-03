type Props = { children: React.ReactNode }

export default function Badge({ children }: Props) {
  return (
    <span className="inline-block rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-200">
      {children}
    </span>
  )
}
