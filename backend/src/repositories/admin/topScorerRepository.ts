import prisma from "../../lib/prisma";

// Buscar candidato por id
export const getTopScorerByIdRepository = async (id: string) => {
  return prisma.topScorer.findUnique({ where: { id } });
};

// Crear candidato
export const createTopScorerRepository = async ({
  name,
  team,
  flag,
}: {
  name: string;
  team: string;
  flag: string;
}) => {
  return prisma.topScorer.create({ data: { name, team, flag } });
};

// Actualizar goles de un candidato
export const updateTopScorerGoalsRepository = async (
  id: string,
  goals: number
) => {
  return prisma.topScorer.update({ where: { id }, data: { goals } });
};

// Cerrar período de seleccion
export const closeTopScorerSelectionRepository = async () => {
  return prisma.topScorer.updateMany({ data: { isActive: false } });
};

// Abrir período de seleccion
export const openTopScorerSelectionRepository = async () => {
  return prisma.topScorer.updateMany({ data: { isActive: true } });
};

// Buscar el candidato activo con más goles
export const getWinnerTopScorerRepository = async () => {
  return prisma.topScorer.findFirst({
    orderBy: { goals: "desc" },
    where: { isActive: true },
  });
};

// Marcar ganador y resetear el resto
export const setTopScorerWinnerRepository = async (id: string) => {
  await prisma.topScorer.updateMany({ data: { isWinner: false } });
  return prisma.topScorer.update({ where: { id }, data: { isWinner: true } });
};

// Traer predicciones que acertaron al ganador
export const getUserTopScorerPredictionsRepository = async (topScorerId: string) => {
  return prisma.userTopScorerPrediction.findMany({ where: { topScorerId } });
};

// Eliminar candidato
export const deleteTopScorerRepository = async (id: string) => {
  return prisma.topScorer.delete({ where: { id } });
};