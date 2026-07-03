import { prisma } from "@/lib/prisma"

export async function getExperiences(profileId: string) {
  return prisma.experience.findMany({ where: { profileId } })
}

export async function createExperience(profileId: string, data: any) {
  return prisma.experience.create({ data: { profileId, ...data } })
}

export async function updateExperience(id: string, data: any) {
  return prisma.experience.update({ where: { id }, data })
}

export async function deleteExperience(id: string) {
  return prisma.experience.delete({ where: { id } })
}
