import prisma from "../lib/prisma";

// Verificar predicciones previas para evitar duplicados
export const findPredictionsByUserAndMatches = async (
  userId: string,
  matchIds: string[],
) => {
  return prisma.prediction.findMany({
    where: { userId, matchId: { in: matchIds } },
  });
};

// Buscar partidos por ids para validaciones
export const findMatchesByIds = async (matchIds: string[]) => {
  return prisma.match.findMany({
    where: { id: { in: matchIds } },
  });
};

// Crear predicciones
export const createPredictionRepository = async (
  predictions: {
    userId: string;
    matchId: string;
    homeScore: number;
    awayScore: number;
    isWildcard: boolean;
  }[],
) => {
  return prisma.prediction.createMany({ data: predictions });
};

// Verificar si el usuario ya usó el comodín
export const findWildcardUsedRepository = async (userId: string) => {
  return prisma.prediction.findFirst({
    where: { userId, isWildcard: true },
  });
};

// Buscar usuario por id
export const findUserByIdRepository = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, username: true },
  });
};

// Buscar predicciones de un usuario
export const findPredictionsByUserRepository = async (userId: string) => {
  return prisma.prediction.findMany({
    where: { userId },
    include: { match: true },
  });
};
