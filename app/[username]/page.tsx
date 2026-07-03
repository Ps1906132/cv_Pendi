import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProfileHeader from "@/components/ProfileHeader"
import SkillBadge from "@/components/SkillBadge"
import ExperienceCard from "@/components/ExperienceCard"
import SocialIcons from "@/components/SocialIcons"

export default async function PublicCVPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: {
        include: { education: true, skills: true, experience: true, documents: true, socialLinks: true },
      },
    },
  })

  if (!user?.profile) notFound()

  const profile = user.profile

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-12">
      <ProfileHeader name={profile.name} headline={profile.headline} photo={profile.photo} />

      {profile.education.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">🎓 Pendidikan</h2>
          <div className="space-y-3">
            {profile.education.map((edu) => (
              <div key={edu.id} className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                <p className="font-semibold text-white">{edu.school}</p>
                <p className="text-sm text-gray-400">{edu.major} — {edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {profile.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">⚡ Keahlian</h2>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <SkillBadge key={skill.id} name={skill.name} />
            ))}
          </div>
        </section>
      )}

      {profile.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">💼 Pengalaman Kerja</h2>
          <div className="space-y-4">
            {profile.experience.map((exp) => (
              <ExperienceCard
                key={exp.id}
                company={exp.company}
                position={exp.position}
                year={exp.year}
                description={exp.description}
              />
            ))}
          </div>
        </section>
      )}

      {profile.documents.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">📄 Dokumen</h2>
          <div className="flex flex-wrap gap-3">
            {profile.documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-gray-800 bg-gray-900/50 px-5 py-3 text-sm text-gray-300 transition hover:border-[#00FF88] hover:text-[#00FF88] glow-hover"
              >
                {doc.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {profile.socialLinks.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">🔗 Social Media</h2>
          <div className="flex flex-wrap gap-3">
            {profile.socialLinks.map((link) => (
              <SocialIcons key={link.id} platform={link.platform} url={link.url} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
