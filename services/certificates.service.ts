import { prisma } from "@/lib/prisma"

export async function getCertificates(profileId: string) {
  return prisma.certificate.findMany({ where: { profileId } })
}

export async function createCertificate(profileId: string, data: any) {
  return prisma.certificate.create({ data: { profileId, ...data } })
}

export async function updateCertificate(id: string, data: any) {
  return prisma.certificate.update({ where: { id }, data })
}

export async function deleteCertificate(id: string) {
  return prisma.certificate.delete({ where: { id } })
}
