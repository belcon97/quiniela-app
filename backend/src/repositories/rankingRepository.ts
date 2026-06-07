import prisma from "../lib/prisma";

// Traer todos los puntos agrupados por usuario
export const getAllUserPointsRepository = async () => {
  return prisma.prediction.groupBy({
    by: ["userId"],
    _sum: { points: true },
  });
};

// Traer todos los usuarios con rol user
export const getAllUsersRepository = async () => {
  return prisma.user.findMany({
    where: { role: "user" },
    select: { id: true, username: true, name: true, favoriteTeam: true },
  });
};

// Traer datos de usuarios por sus ids
export const getUsersByIdsRepository = async (userIds: string[]) => {
  return prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true, name: true, favoriteTeam: true },
  });
};
