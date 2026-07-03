import { prisma } from "@/lib/prisma"
import { getSessionFromHeader } from "@/lib/auth"
import { success, error } from "@/lib/response"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromHeader(req)
  if (!session) return error("Unauthorized", 401)
  const { id } = await params
  const data = await req.json()

  const updateData: any = {}
  if (data.company_name) updateData.companyName = data.company_name
  if (data.position) updateData.position = data.position
  if (data.start_date) updateData.startDate = new Date(data.start_date)
  if (data.end_date !== undefined) updateData.endDate = data.end_date ? new Date(data.end_date) : null
  if (data.description !== undefined) updateData.description = data.description

  const item = await prisma.experience.update({ where: { id }, data: updateData })
  return success(item, "Pengalaman berhasil diupdate")
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromHeader(_req)
  if (!session) return error("Unauthorized", 401)
  const { id } = await params

  await prisma.experience.delete({ where: { id } })
  return success(null, "Pengalaman berhasil dihapus")
}
