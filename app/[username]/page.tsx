import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProfileHeader from "@/components/ProfileHeader"
import SkillBadge from "@/components/SkillBadge"
import ExperienceCard from "@/components/ExperienceCard"
import SocialIcons from "@/components/SocialIcons"

export default async function PublicCVPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: {
        include: { education: true, skills: true, experience: true, documents: true, socialLinks: true, projects: true, certificates: true },
      },
    },
  })

  if (!user?.profile) notFound()

  const p = user.profile

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-12">
      <ProfileHeader name={p.fullName} headline={p.headline} photo={p.photo} />

      {p.about && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">📖 Tentang Saya</h2>
          <p className="text-gray-400 leading-relaxed">{p.about}</p>
        </section>
      )}

      {p.education.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">🎓 Pendidikan</h2>
          <div className="space-y-3">
            {p.education.map((edu) => (
              <div key={edu.id} className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                <p className="font-semibold text-white">{edu.schoolName}</p>
                <p className="text-sm text-gray-400">
                  {edu.degree ? `${edu.degree} - ` : ""}{edu.major} ({edu.startYear}-{edu.endYear})
                </p>
                {edu.description && <p className="text-sm text-gray-500 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {p.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">⚡ Keahlian</h2>
          <div className="flex flex-wrap gap-3">
            {p.skills.map((skill) => (
              <SkillBadge key={skill.id} name={skill.skillName} level={skill.level} />
            ))}
          </div>
        </section>
      )}

      {p.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">💼 Pengalaman Kerja</h2>
          <div className="space-y-4">
            {p.experience.map((exp) => (
              <ExperienceCard
                key={exp.id}
                company={exp.companyName}
                position={exp.position}
                startDate={exp.startDate.toISOString().split("T")[0]}
                endDate={exp.endDate?.toISOString().split("T")[0] || null}
                description={exp.description}
              />
            ))}
          </div>
        </section>
      )}

      {p.documents.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">📄 Dokumen</h2>
          <div className="flex flex-wrap gap-3">
            {p.documents.map((doc) => (
              <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-gray-800 bg-gray-900/50 px-5 py-3 text-sm text-gray-300 transition hover:border-[#00FF88] hover:text-[#00FF88] glow-hover">
                {doc.title}
              </a>
            ))}
          </div>
        </section>
      )}

      {p.projects.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">🚀 Portfolio Project</h2>
          <div className="space-y-4">
            {p.projects.map((proj) => (
              <div key={proj.id} className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
                <h3 className="text-lg font-semibold text-white">{proj.title}</h3>
                {proj.description && <p className="mt-2 text-sm text-gray-400">{proj.description}</p>}
                <div className="flex gap-3 mt-3">
                  {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF88] hover:underline">GitHub</a>}
                  {proj.demoUrl && <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF88] hover:underline">Demo</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.certificates.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">🏆 Sertifikat</h2>
          <div className="space-y-3">
            {p.certificates.map((cert) => (
              <div key={cert.id} className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                <p className="font-semibold text-white">{cert.title}</p>
                <p className="text-sm text-gray-400">{cert.issuer} — {cert.issueDate.toISOString().split("T")[0]}</p>
                {cert.certificateUrl && <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00FF88] hover:underline mt-1 inline-block">Lihat Sertifikat</a>}
              </div>
            ))}
          </div>
        </section>
      )}

      {p.socialLinks.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white">🔗 Social Media</h2>
          <div className="flex flex-wrap gap-3">
            {p.socialLinks.map((link) => (
              <SocialIcons key={link.id} platform={link.platform} url={link.url} icon={link.icon} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
