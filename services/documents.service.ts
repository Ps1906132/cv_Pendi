import { prisma } from "@/lib/prisma"

export async function getDocuments(profileId: string) {
  return prisma.document.findMany({ where: { profileId } })
}

export async function createDocument(profileId: string, data: any) {
  return prisma.document.create({ data: { profileId, ...data } })
}

export async function updateDocument(id: string, data: any) {
  return prisma.document.update({ where: { id }, data })
}

export async function deleteDocument(id: string) {
  return prisma.document.delete({ where: { id } })
}
