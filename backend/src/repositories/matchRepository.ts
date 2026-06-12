import prisma from "../lib/prisma";

export const getMatchesRepository = async () => {
  return prisma.match.findMany({
    orderBy: { date: "asc" },
  });
};

// Traer predicciones de un partido con datos del usuario
export const getMatchPredictionsWithUsersRepository = async (
  matchId: string,
) => {
  return prisma.prediction.findMany({
    where: { matchId },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          favoriteTeam: true,
        },
      },
    },
  });
};

// Verificar si un usuario predijo un partido
export const getUserPredictionForMatchRepository = async (
  userId: string,
  matchId: string,
) => {
  return prisma.prediction.findUnique({
    where: { userId_matchId: { userId, matchId } },
  });
};
