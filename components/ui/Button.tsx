type Props = { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit"; className?: string }

export default function Button({ children, onClick, type = "button", className = "" }: Props) {
  return (
    <button type={type} onClick={onClick}
      className={`rounded-lg bg-[#00FF88] px-6 py-3 font-semibold text-black transition hover:bg-[#00cc6a] ${className}`}>
      {children}
    </button>
  )
}
