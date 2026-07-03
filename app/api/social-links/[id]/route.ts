import { prisma } from "@/lib/prisma"
import { getSessionFromHeader } from "@/lib/auth"
import { success, error } from "@/lib/response"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)
  const { id } = await params
  const data = await req.json()

  const item = await prisma.socialLink.update({ where: { id }, data })
  return success(item, "Social link berhasil diupdate")
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromHeader(_req)
  if (!session) return error("Unauthorized", 401)
  const { id } = await params

  await prisma.socialLink.delete({ where: { id } })
  return success(null, "Social link berhasil dihapus")
}
