import { prisma } from "@/lib/prisma"
import { success, error } from "@/lib/response"

export async function GET(_req: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: {
        include: { education: true, skills: true, experience: true, documents: true, socialLinks: true, projects: true, certificates: true },
      },
    },
  })

  if (!user?.profile) {
    return error("CV tidak ditemukan", 404)
  }

  return success(user.profile)
}
