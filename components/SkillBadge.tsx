type Props = {
  name: string
}

export default function SkillBadge({ name }: Props) {
  return (
    <span className="inline-block rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-200 transition hover:border-[#00FF88] hover:shadow-[0_0_12px_rgba(0,255,136,0.15)]">
      {name}
    </span>
  )
}
