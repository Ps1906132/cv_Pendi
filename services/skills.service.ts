import { prisma } from "@/lib/prisma"

export async function getSkills(profileId: string) {
  return prisma.skill.findMany({ where: { profileId } })
}

export async function createSkill(profileId: string, data: any) {
  return prisma.skill.create({ data: { profileId, ...data } })
}

export async function updateSkill(id: string, data: any) {
  return prisma.skill.update({ where: { id }, data })
}

export async function deleteSkill(id: string) {
  return prisma.skill.delete({ where: { id } })
}
