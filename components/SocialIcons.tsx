type Props = {
  platform: string
  url: string
}

const icons: Record<string, string> = {
  GitHub: "🐙",
  LinkedIn: "🔗",
  YouTube: "▶️",
  Instagram: "📸",
  Facebook: "📘",
}

export default function SocialIcons({ platform, url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/50 px-5 py-3 text-gray-300 transition hover:border-[#00FF88] hover:text-[#00FF88] glow-hover"
      title={platform}
    >
      <span className="text-lg">{icons[platform] || "🌐"}</span>
      <span className="text-sm">{platform}</span>
    </a>
  )
}
