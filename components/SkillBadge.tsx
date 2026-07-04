type Props = { name: string; level?: number }

export default function SkillBadge({ name, level }: Props) {
  return (
    <span className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-5 py-2.5 text-sm text-gray-200 border border-gray-700/50 transition-all duration-300 hover:border-[#00FF88]/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.15)] hover:scale-105 cursor-default">
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FF88]/0 via-[#00FF88]/5 to-[#00FF88]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative">{name}</span>
      {level !== undefined && level > 0 && (
        <span className="relative inline-flex items-center gap-1.5">
          <div className="h-1.5 w-16 rounded-full bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00FF88] to-[#00cc6a] transition-all duration-500"
              style={{ width: `${Math.min(level, 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{level}%</span>
        </span>
      )}
    </span>
  )
}
