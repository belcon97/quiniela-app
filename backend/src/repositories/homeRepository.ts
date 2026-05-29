import prisma from "../lib/prisma";

// Proximos partidos
export const getUpcomingMatchesRepository = async () => {
  return prisma.match.findMany({
    where: {
      status: "pending",
      date: { gt: new Date() },
    },
    orderBy: { date: "asc" },
    select: {
      id: true,
      homeTeam: true,
      awayTeam: true,
      homeFlag: true,
      awayFlag: true,
      stadium: true,
      date: true,
    },
  });
};

// Proximo partido del equipo favorito del usuario
export const getNextMatchByTeamRepository = async (team: string) => {
  return prisma.match.findFirst({
    where: {
      status: "pending",
      date: { gt: new Date() },
      OR: [{ homeTeam: team }, { awayTeam: team }],
    },
    orderBy: { date: "asc" },
    select: {
      id: true,
      homeTeam: true,
      awayTeam: true,
      homeFlag: true,
      awayFlag: true,
      date: true,
      stadium: true,
    },
  });
};

// Equipo favorito del usuario
export const getUserFavoriteTeamRepository = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { favoriteTeam: true },
  });
};