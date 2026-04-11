import prisma from "../lib/prisma";

// Traer los partidos pendientes
export const getUpcomingMatchesRepository = async () => {
  return await prisma.match.findMany({
    where: {
      status: "pending",
    },
    orderBy: {
      date: "asc",
    },
    select: {
      id: true,
      homeTeam: true,
      awayTeam: true,
      homeFlag: true,
      awayFlag: true,
      stadium: true,
      date: true,
      status: true,
    },
  });
};

// Traer los ususarios por id
export const getUsersByIdsRepository = async (userIds: string[]) => {
  return prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true, name: true },
  });
};
