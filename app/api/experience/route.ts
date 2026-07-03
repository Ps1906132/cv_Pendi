import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 })

  const items = await prisma.experience.findMany({ where: { profileId: profile.id } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 })

  const data = await req.json()
  const item = await prisma.experience.create({
    data: {
      profileId: profile.id,
      company: data.company,
      position: data.position,
      year: data.year,
      description: data.description || "",
    },
  })
  return NextResponse.json(item)
}
