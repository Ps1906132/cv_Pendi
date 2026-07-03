type Props = { company: string; position: string; startDate: string; endDate: string | null; description: string }

export default function ExperienceCard({ company, position, startDate, endDate, description }: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 transition hover:border-gray-700 glow-hover">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{position}</h3>
          <p className="text-sm text-[#00FF88]">{company}</p>
        </div>
        <span className="text-sm text-gray-500">{startDate} — {endDate || "Sekarang"}</span>
      </div>
      {description && <p className="mt-3 text-sm text-gray-400">{description}</p>}
    </div>
  )
}
