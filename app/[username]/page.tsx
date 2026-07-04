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

        {(p.email || p.phone || p.address) && (
          <div className="mt-8 flex flex-wrap gap-4 border-b border-gray-800/50 pb-8">
            {p.email && (
              <a href={`mailto:${p.email}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00FF88] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {p.email}
              </a>
            )}
            {p.phone && (
              <a href={`https://wa.me/${p.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00FF88] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {p.phone}
              </a>
            )}
            {p.address && (
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {p.address}
              </span>
            )}
          </div>
        )}

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
                <span className="text-xs text-gray-600">(klik untuk lihat)</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {p.documents.map((doc) => (
                  <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                    className="group relative rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-950/60 px-6 py-3 text-sm text-gray-300 transition-all duration-300 hover:border-[#00FF88]/40 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] hover:-translate-y-0.5">
                    <span className="relative">{doc.title}</span>
                    <span className="ml-2 text-xs text-gray-600 group-hover:text-[#00FF88] transition-colors">↗</span>
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
                <span className="text-xs text-gray-600">(klik link untuk lihat)</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {p.projects.map((proj) => (
                  <div key={proj.id} className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-950/60 p-5 transition-all duration-300 hover:border-gray-700/80 hover:shadow-[0_0_25px_rgba(0,255,136,0.06)]">
                    <h3 className="font-semibold text-white group-hover:text-[#00FF88] transition-colors">{proj.title}</h3>
                    {proj.description && <p className="mt-2 text-sm text-gray-500">{proj.description}</p>}
                    <div className="flex gap-4 mt-4">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#00FF88] transition-colors">
                          <span className="text-[10px]">⎇</span> GitHub ↗
                        </a>
                      )}
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#00FF88] transition-colors">
                          <span className="text-[10px]">🔗</span> Demo ↗
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
