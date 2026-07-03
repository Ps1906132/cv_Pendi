import { prisma } from "@/lib/prisma"

export async function getProjects(profileId: string) {
  return prisma.project.findMany({ where: { profileId } })
}

export async function createProject(profileId: string, data: any) {
  return prisma.project.create({ data: { profileId, ...data } })
}

export async function updateProject(id: string, data: any) {
  return prisma.project.update({ where: { id }, data })
}

export async function deleteProject(id: string) {
  return prisma.project.delete({ where: { id } })
}
