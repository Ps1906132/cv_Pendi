type Props = { children: React.ReactNode; className?: string }

export default function Card({ children, className = "" }: Props) {
  return (
    <div className={`rounded-xl border border-gray-800 bg-gray-900/50 p-4 ${className}`}>
      {children}
    </div>
  )
}
