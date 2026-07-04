import Link from "next/link"
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
    <div className="min-h-screen bg-[#0B0B0B]">
      <nav className="sticky top-0 z-50 border-b border-gray-800/50 bg-[#0B0B0B]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#00FF88] transition-colors duration-200">
            ← Kembali ke Beranda
          </Link>
          <span className="text-xs text-gray-600 font-mono">@{username}</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-16">
        <ProfileHeader name={p.fullName} headline={p.headline} photo={p.photo} />

        <div className="mt-16 space-y-16">
          {p.about && (
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#00FF88]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Tentang Saya</h2>
              </div>
              <p className="text-gray-400 leading-relaxed">{p.about}</p>
            </section>
          )}

          {p.education.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#00FF88]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Pendidikan</h2>
              </div>
              <div className="space-y-4">
                {p.education.map((edu) => (
                  <div key={edu.id} className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-950/60 p-5 transition-all duration-300 hover:border-gray-700/80 hover:shadow-[0_0_25px_rgba(0,255,136,0.06)]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-white">{edu.schoolName}</h3>
                        <p className="text-sm text-gray-400">
                          {edu.degree ? `${edu.degree} - ` : ""}{edu.major}
                        </p>
                        {edu.description && <p className="text-xs text-gray-500 mt-2">{edu.description}</p>}
                      </div>
                      <span className="text-sm text-gray-600 font-mono whitespace-nowrap">{edu.startYear} — {edu.endYear}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {p.skills.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#00FF88]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Keahlian</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {p.skills.map((skill) => (
                  <SkillBadge key={skill.id} name={skill.skillName} level={skill.level} />
                ))}
              </div>
            </section>
          )}

          {p.experience.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#00FF88]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Pengalaman Kerja</h2>
              </div>
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
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#00FF88]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Dokumen</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {p.documents.map((doc) => (
                  <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                    className="group relative rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-950/60 px-6 py-3 text-sm text-gray-300 transition-all duration-300 hover:border-[#00FF88]/40 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] hover:-translate-y-0.5">
                    <span className="relative">{doc.title}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {p.projects.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#00FF88]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Portfolio Project</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {p.projects.map((proj) => (
                  <div key={proj.id} className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-950/60 p-5 transition-all duration-300 hover:border-gray-700/80 hover:shadow-[0_0_25px_rgba(0,255,136,0.06)]">
                    <h3 className="font-semibold text-white group-hover:text-[#00FF88] transition-colors">{proj.title}</h3>
                    {proj.description && <p className="mt-2 text-sm text-gray-500">{proj.description}</p>}
                    <div className="flex gap-3 mt-4">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-gray-400 hover:text-[#00FF88] transition-colors">
                          GitHub →
                        </a>
                      )}
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-gray-400 hover:text-[#00FF88] transition-colors">
                          Demo →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {p.certificates.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#00FF88]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Sertifikat</h2>
              </div>
              <div className="space-y-4">
                {p.certificates.map((cert) => (
                  <div key={cert.id} className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-950/60 p-5 transition-all duration-300 hover:border-gray-700/80 hover:shadow-[0_0_25px_rgba(0,255,136,0.06)]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-white">{cert.title}</h3>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                        {cert.certificateUrl && (
                          <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-block text-xs text-gray-500 hover:text-[#00FF88] transition-colors mt-1">
                            Lihat Sertifikat →
                          </a>
                        )}
                      </div>
                      <span className="text-sm text-gray-600 font-mono whitespace-nowrap">
                        {cert.issueDate.toISOString().split("T")[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {p.socialLinks.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#00FF88]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Social Media</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {p.socialLinks.map((link) => (
                  <SocialIcons key={link.id} platform={link.platform} url={link.url} icon={link.icon} />
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="mt-24 border-t border-gray-800/50 pt-8 pb-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-gray-600">
              Dibuat dengan <span className="text-[#00FF88]">CV Online Modern</span>
            </p>
            <Link href="/" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">
              cv-pendi-seven.vercel.app
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
