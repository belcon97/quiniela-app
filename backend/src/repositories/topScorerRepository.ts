import prisma from "../lib/prisma";

// Ver lista de candidatos activos ordenados por goles
export const getTopScorersRepository = async () => {
  return prisma.topScorer.findMany({
    where: { isActive: true },
    orderBy: { goals: "desc" },
  });
};

// Buscar candidato por id
export const getTopScorerByIdRepository = async (id: string) => {
  return prisma.topScorer.findUnique({ where: { id } });
};

// Crear prediccion de goleador
export const createTopScorerPredictionRepository = async ({
  userId,
  topScorerId,
}: {
  userId: string;
  topScorerId: string;
}) => {
  return prisma.userTopScorerPrediction.create({
    data: { userId, topScorerId },
  });
};

// Ver mi prediccion de goleador
export const getMyTopScorerPredictionRepository = async (userId: string) => {
  return prisma.userTopScorerPrediction.findUnique({
    where: { userId },
    include: { topScorer: true },
  });
};