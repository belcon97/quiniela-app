import prisma from "../lib/prisma";

export const findPredictionsByUserAndMatches = async (
  userId: string,
  matchIds: string[],
) => {
  return prisma.prediction.findMany({
    where: {
      userId,
      matchId: { in: matchIds },
    },
  });
};

export const findMatchesByIds = async (matchIds: string[]) => {
  return prisma.match.findMany({
    where: { id: { in: matchIds } },
  });
};

export const createPredictionRepository = async (
  predictions: {
    userId: string;
    matchId: string;
    homeScore: number;
    awayScore: number;
  }[],
) => {
  return prisma.prediction.createMany({ data: predictions });
};

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, username: true },
  });
};

export const findAllMatches = async () => {
  return prisma.match.findMany();
};

export const findPredictionsByUser = async (userId: string) => {
  return prisma.prediction.findMany({ where: { userId } });
};

export const getRankingRepository = async () => {
  return prisma.prediction.groupBy({
    by: ["userId"],
    _sum: { points: true },
    orderBy: { _sum: { points: "desc" } },
  });
};
