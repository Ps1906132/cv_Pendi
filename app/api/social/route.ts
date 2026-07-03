import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 })

  const items = await prisma.socialLink.findMany({ where: { profileId: profile.id } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } })
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 })

  const data = await req.json()
  const item = await prisma.socialLink.create({
    data: { profileId: profile.id, platform: data.platform, url: data.url },
  })
  return NextResponse.json(item)
}
