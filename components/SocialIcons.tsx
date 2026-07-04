type Props = { platform: string; url: string; icon?: string }

const icons: Record<string, string> = {
  GitHub: "🐙", LinkedIn: "🔗", YouTube: "▶️", Instagram: "📸", Facebook: "📘", TikTok: "🎵", Website: "🌐",
}

export default function SocialIcons({ platform, url, icon }: Props) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="group relative flex items-center gap-2.5 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-950/60 px-5 py-3 text-gray-300 transition-all duration-300 hover:border-[#00FF88]/40 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] hover:-translate-y-0.5"
      title={platform}>
      <span className="text-lg transition-transform duration-300 group-hover:scale-110">{icons[platform] || icon || "🌐"}</span>
      <span className="text-sm font-medium">{platform}</span>
    </a>
  )
}
