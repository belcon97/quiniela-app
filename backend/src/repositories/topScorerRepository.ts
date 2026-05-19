import prisma from "../lib/prisma";

export const getTopScorersRepository = async () => {
  return prisma.topScorer.findMany({
    orderBy: { goals: "desc" },
  });
};

export const createTopScorerRepository = async ({
  name,
  team,
  flag,
}: {
  name: string;
  team: string;
  flag: string;
}) => {
  return prisma.topScorer.create({
    data: { name, team, flag },
  });
};

export const getTopScorerByIdRepository = async (id: string) => {
  return prisma.topScorer.findUnique({
    where: { id },
  });
};

export const updateTopScorerGoalsRepository = async ({
  id,
  goals,
}: {
  id: string;
  goals: number;
}) => {
  return prisma.topScorer.update({
    where: { id },
    data: { goals },
  });
};

export const getWinnerTopScorerRepository = async () => {
  return prisma.topScorer.findFirst({
    orderBy: { goals: "desc" },
  });
};

export const setTopScorerWinnerRepository = async (id: string) => {
  // Primero resetear todos
  await prisma.topScorer.updateMany({
    data: { isWinner: false },
  });
  // Luego marcar el ganador
  return prisma.topScorer.update({
    where: { id },
    data: { isWinner: true },
  });
};

export const getUserTopScorerPredictionsRepository = async (
  topScorerId: string,
) => {
  return prisma.userTopScorerPrediction.findMany({
    where: { topScorerId },
  });
};

export const updateTopScorerPredictionPointsRepository = async ({
  id,
  points,
}: {
  id: string;
  points: number;
}) => {
  return prisma.userTopScorerPrediction.update({
    where: { id },
    data: { points },
  });
};

export const createTopScorerPredictionRepository = async ({
  userId,
  topScorerId,
  customName,
}: {
  userId: string;
  topScorerId?: string;
  customName?: string;
}) => {
  return prisma.userTopScorerPrediction.create({
    data: {
      userId,
      topScorerId: topScorerId ?? null,
      customName: customName ?? null,
    },
  });
};

export const getMyTopScorerPredictionRepository = async (userId: string) => {
  return prisma.userTopScorerPrediction.findUnique({
    where: { userId },
    include: { topScorer: true },
  });
};
