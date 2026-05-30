import prisma from "../lib/prisma";

// Traer todos los usuarios agrupados por puntos de mayor a menor
export const getAllUserPointsRepository = async () => {
  return prisma.prediction.groupBy({
    by: ["userId"],
    _sum: { points: true },
    orderBy: { _sum: { points: "desc" } },
  });
};

// Traer datos de usuarios por sus ids
export const getUsersByIdsRepository = async (userIds: string[]) => {
  return prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true, name: true, favoriteTeam: true },
  });
};