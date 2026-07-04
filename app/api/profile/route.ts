import { prisma } from "@/lib/prisma"
import { getSessionFromHeader } from "@/lib/auth"
import { success, error } from "@/lib/response"

function toDirectImageUrl(url: string): string {
  if (!url) return url
  const match = url.match(/\/file\/d\/([^/]+)/)
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`
  return url
}

export async function GET(req: Request) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)

  const profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
    include: {
      education: true, skills: true, experience: true, documents: true, socialLinks: true, projects: true, certificates: true,
      user: { select: { username: true } },
    },
  })

  return success(profile)
}

export async function PUT(req: Request) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)

  const data = await req.json()
  const profile = await prisma.profile.update({
    where: { userId: session.userId },
    data: {
      fullName: data.full_name,
      headline: data.headline,
      about: data.about,
      photo: toDirectImageUrl(data.photo),
      phone: data.phone,
      email: data.email,
      address: data.address,
    },
  })

  return success(profile, "Profile berhasil diupdate")
}
