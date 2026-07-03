import { prisma } from "@/lib/prisma"

export async function getProfileByUserId(userId: string) {
  return prisma.profile.findUnique({
    where: { userId },
    include: { education: true, skills: true, experience: true, documents: true, socialLinks: true, projects: true, certificates: true },
  })
}

export async function updateProfile(userId: string, data: any) {
  return prisma.profile.update({ where: { userId }, data })
}
