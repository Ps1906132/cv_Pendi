type Props = { name: string; level?: number }

export default function SkillBadge({ name, level }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-200 transition hover:border-[#00FF88] hover:shadow-[0_0_12px_rgba(0,255,136,0.15)]">
      {name}
      {level ? <span className="text-gray-500 text-xs">({level}%)</span> : null}
    </span>
  )
}
