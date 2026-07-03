import { prisma } from "@/lib/prisma"
import { getSessionFromHeader } from "@/lib/auth"
import { success, error } from "@/lib/response"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)
  const { id } = await params
  const data = await req.json()

  const item = await prisma.project.update({ where: { id }, data })
  return success(item, "Project berhasil diupdate")
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromHeader(_req)
  if (!session) return error("Unauthorized", 401)
  const { id } = await params

  await prisma.project.delete({ where: { id } })
  return success(null, "Project berhasil dihapus")
}
