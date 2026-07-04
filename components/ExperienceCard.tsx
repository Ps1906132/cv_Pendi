type Props = { company: string; position: string; startDate: string; endDate: string | null; description: string }

export default function ExperienceCard({ company, position, startDate, endDate, description }: Props) {
  return (
    <div className="group relative rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-6 transition-all duration-300 hover:border-gray-700/80 hover:shadow-[0_0_30px_rgba(0,255,136,0.08)]">
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#00FF88]" />
            <h3 className="text-lg font-semibold text-white">{position}</h3>
          </div>
          <p className="text-sm text-[#00FF88]/80 font-medium ml-4">{company}</p>
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap font-mono">
          {startDate} — {endDate || "Sekarang"}
        </span>
      </div>
      {description && (
        <p className="mt-4 text-sm text-gray-400 leading-relaxed ml-4 border-l border-gray-800 pl-4">
          {description}
        </p>
      )}
    </div>
  )
}
