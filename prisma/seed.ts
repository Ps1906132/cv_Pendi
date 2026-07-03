import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash("admin123", 12)

  const user = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      email: "admin@email.com",
      username: "admin",
      password,
      profile: {
        create: {
          fullName: "Admin",
          headline: "Full Stack Developer",
        },
      },
    },
  })

  console.log("User created:", user.username, "| Email:", user.email)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
