import { prisma } from "@/lib/prisma"
import { verifyPassword, signToken } from "@/lib/auth"
import { success, error } from "@/lib/response"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return error("Email dan password wajib diisi", 400)
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return error("Email tidak ditemukan", 401)
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      return error("Password salah", 401)
    }

    const token = signToken({ userId: user.id, email: user.email })

    return success({ token }, "Login berhasil")
  } catch {
    return error("Terjadi kesalahan", 500)
  }
}
