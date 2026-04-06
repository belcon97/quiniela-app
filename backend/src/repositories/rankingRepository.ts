import prisma from "../lib/prisma";

export const getRankingRepository = async () => {
  return prisma.prediction.groupBy({
    by: ["userId"],
    _sum: { points: true },
    orderBy: { _sum: { points: "desc" } },
    having: {
      points: {
        _sum: {
          gte: 0,
        },
      },
    },
  });
};

export const getUsersByIds = async (userIds: string[]) => {
  return prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true, name: true },
  });
};
