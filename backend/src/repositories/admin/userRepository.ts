import prisma from "../../lib/prisma";

// Listar todos los usuarios
export const getUsersRepository = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      favoriteTeam: true,
      hasReadRules: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
};

// Buscar usuario por id
export const getUserByIdRepository = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });
};

// Eliminar usuario
export const deleteUserRepository = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};