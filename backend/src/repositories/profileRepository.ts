import prisma from "../lib/prisma";

// Perfil publico
// datos visibles para otros usuarios
export const getUserPublicProfileRepository = async (username: string) => {
  return prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      favoriteTeam: true,
      topScorerPrediction: {
        include: { topScorer: true }
      },
    },
  });
};

// Perfil privado
// datos completos
export const getUserPrivateProfileRepository = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      name: true,
      role: true,
      favoriteTeam: true,
      hasReadRules: true,
      topScorerPrediction: {
        include: { topScorer: true }
      },
    },
  });
};

// Predicciones de partidos completados (historial)
export const getPredictionsHistoryRepository = async (userId: string) => {
  return prisma.prediction.findMany({
    where: { userId, match: { status: "completed" } },
    include: { match: true },
  });
};

// Predicciones de partidos pendientes
export const getPredictionsPendingRepository = async (userId: string) => {
  return prisma.prediction.findMany({
    where: { userId, match: { status: "pending" } },
    include: { match: true },
  });
};

// Partidos sin predicción del usuario que aún no han jugado
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

// Verificar si el usuario ya usó el comodín
export const getWildcardUsedRepository = async (userId: string) => {
  return prisma.prediction.findFirst({
    where: { userId, isWildcard: true },
  });
};

// Actualizar equipo favorito
export const updateFavoriteTeamRepository = async (userId: string, favoriteTeam: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { favoriteTeam },
  });
};

// Marcar reglas como leídas
export const markRulesAsReadRepository = async (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { hasReadRules: true },
  });
};