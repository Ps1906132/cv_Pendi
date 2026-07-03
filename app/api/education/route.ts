import { prisma } from "@/lib/prisma"
import { getSessionFromHeader } from "@/lib/auth"
import { success, error } from "@/lib/response"

export async function GET(req: Request) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return error("Profile not found", 404)

  const items = await prisma.education.findMany({ where: { profileId: profile.id } })
  return success(items)
}

export async function POST(req: Request) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return error("Profile not found", 404)

  const data = await req.json()
  const item = await prisma.education.create({
    data: {
      profileId: profile.id,
      schoolName: data.school_name,
      major: data.major,
      degree: data.degree || "",
      startYear: data.start_year,
      endYear: data.end_year,
      description: data.description || "",
    },
  })
  return success(item, "Pendidikan berhasil ditambahkan", 201)
}
