import { prisma } from "@/lib/prisma"
import { getSessionFromHeader } from "@/lib/auth"
import { success, error } from "@/lib/response"

export async function GET(req: Request) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return error("Profile not found", 404)

  const items = await prisma.experience.findMany({ where: { profileId: profile.id } })
  return success(items)
}

export async function POST(req: Request) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return error("Profile not found", 404)

  const data = await req.json()
  const item = await prisma.experience.create({
    data: {
      profileId: profile.id,
      companyName: data.company_name,
      position: data.position,
      startDate: new Date(data.start_date),
      endDate: data.end_date ? new Date(data.end_date) : null,
      description: data.description || "",
    },
  })
  return success(item, "Pengalaman berhasil ditambahkan", 201)
}
