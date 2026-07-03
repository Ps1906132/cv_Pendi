import { prisma } from "@/lib/prisma"
import { getSessionFromHeader } from "@/lib/auth"
import { success, error } from "@/lib/response"

export async function GET(req: Request) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return error("Profile not found", 404)

  const items = await prisma.skill.findMany({ where: { profileId: profile.id } })
  return success(items)
}

export async function POST(req: Request) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return error("Profile not found", 404)

  const data = await req.json()
  const item = await prisma.skill.create({
    data: { profileId: profile.id, skillName: data.skill_name, level: data.level || 0 },
  })
  return success(item, "Skill berhasil ditambahkan", 201)
}
