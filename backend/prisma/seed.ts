import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

// Script para crear un admin
// correr con: npx prisma db seed
async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (existingAdmin) {
    console.log("El admin ya existe, no se creó de nuevo");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Administrador",
      username: "admin",
      email: "admin@quiniela.com",
      password: hashedPassword,
      role: Role.admin,
    },
  });

  console.log(`Admin creado: ${admin.username}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
