import prisma from "../lib/prisma";

export const getMatchesRepository = async () => {
  return prisma.match.findMany({
    orderBy: { date: "asc" },
  });
};