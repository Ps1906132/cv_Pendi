import { prisma } from "@/lib/prisma"

export async function getEducations(profileId: string) {
  return prisma.education.findMany({ where: { profileId } })
}

export async function createEducation(profileId: string, data: any) {
  return prisma.education.create({ data: { profileId, ...data } })
}

export async function updateEducation(id: string, data: any) {
  return prisma.education.update({ where: { id }, data })
}

export async function deleteEducation(id: string) {
  return prisma.education.delete({ where: { id } })
}
