import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(_req: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: {
        include: { education: true, skills: true, experience: true, documents: true, socialLinks: true },
      },
    },
  })

  if (!user?.profile) {
    return NextResponse.json({ error: "CV tidak ditemukan" }, { status: 404 })
  }

  return NextResponse.json(user.profile)
}
