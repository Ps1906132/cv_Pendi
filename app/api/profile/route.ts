import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
    include: { education: true, skills: true, experience: true, documents: true, socialLinks: true },
  })

  return NextResponse.json(profile)
}

export async function PUT(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = await req.json()
  const profile = await prisma.profile.update({
    where: { userId: session.userId },
    data: { name: data.name, headline: data.headline, photo: data.photo },
  })

  return NextResponse.json(profile)
}
