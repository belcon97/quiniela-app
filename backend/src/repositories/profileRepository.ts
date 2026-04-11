import prisma from "../lib/prisma";

// Traer el perfil publico de un usuario
export const getUserPublicProfileRepository = async (username: string) => {
  return prisma.user.findUnique({
    where: { username },
    select: { id: true, username: true, name: true },
  });
};

// Predicciones con estados completed
export const getPredictionsHistoryRepository = async (username: string) => {
  return prisma.prediction.findMany({
    where: { user: { username }, match: { status: "completed" } },
    include: { match: true },
  });
};

// Predicciones con estados pending
export const getPredictionsPendingRepository = async (username: string) => {
  return prisma.prediction.findMany({
    where: { user: { username }, match: { status: "pending" } },
    include: { match: true },
  });
};

// Privado

// Traer el perfil privado de un usuario
export const getUserPrivateProfileRepository = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, name: true, email: true },
  });
};
// Traer partidos que el usuario no tenga predicciones
export const getMatchesWithoutPredictionsRepository = async (
  userId: string,
) => {
  return prisma.match.findMany({
    where: {
      predictions: { none: { userId } },
      status: "pending",
      date: { gt: new Date() },
    },
    orderBy: { date: "asc" },
  });
};
