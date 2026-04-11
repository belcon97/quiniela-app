import prisma from "../lib/prisma";

// Traer todos los usuarios y sus puntos
export const getAllUserPointsRepository = async () => {
  return prisma.prediction.groupBy({
    by: ["userId"],
    _sum: { points: true },
    orderBy: { _sum: { points: "desc" } },
  });
};

// Extraer usuarios por id
export const getUsersByIdsRepository = async (userIds: string[]) => {
  return prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true, name: true },
  });
};
