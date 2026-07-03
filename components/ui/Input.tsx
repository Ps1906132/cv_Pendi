type Props = { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string; required?: boolean; className?: string }

export default function Input({ value, onChange, placeholder, type = "text", required, className = "" }: Props) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
      className={`w-full rounded-lg border border-gray-700 bg-transparent p-3 text-white outline-none focus:border-[#00FF88] ${className}`} />
  )
}
