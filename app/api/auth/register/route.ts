import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"
import { success, error } from "@/lib/response"

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json()

    if (!email || !username || !password) {
      return error("Email, username, dan password wajib diisi", 400)
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } })
    if (existingEmail) {
      return error("Email sudah digunakan", 400)
    }

    const existingUsername = await prisma.user.findUnique({ where: { username } })
    if (existingUsername) {
      return error("Username sudah digunakan", 400)
    }

    const hashed = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, username, password: hashed },
    })

    await prisma.profile.create({
      data: { userId: user.id, fullName: username },
    })

    return success(null, "Registrasi berhasil")
  } catch {
    return error("Terjadi kesalahan", 500)
  }
}
