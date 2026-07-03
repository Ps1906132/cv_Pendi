import { prisma } from "@/lib/prisma"

export async function getSocialLinks(profileId: string) {
  return prisma.socialLink.findMany({ where: { profileId } })
}

export async function createSocialLink(profileId: string, data: any) {
  return prisma.socialLink.create({ data: { profileId, ...data } })
}

export async function updateSocialLink(id: string, data: any) {
  return prisma.socialLink.update({ where: { id }, data })
}

export async function deleteSocialLink(id: string) {
  return prisma.socialLink.delete({ where: { id } })
}
