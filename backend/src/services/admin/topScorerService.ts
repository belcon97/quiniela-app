import {
  getTopScorerByIdRepository,
  createTopScorerRepository,
  updateTopScorerGoalsRepository,
  closeTopScorerSelectionRepository,
  openTopScorerSelectionRepository,
  getWinnerTopScorerRepository,
  setTopScorerWinnerRepository,
  getUserTopScorerPredictionsRepository,
  deleteTopScorerRepository,
  getTopScorersRepository,
} from "../../repositories/admin/topScorerRepository";
import prisma from "../../lib/prisma";

// Crear candidato
export const createTopScorerService = async ({
  name,
  team,
  flag,
}: {
  name: string;
  team: string;
  flag: string;
}) => {
  if (!name.trim() || !team.trim() || !flag.trim()) {
    throw { status: 400, message: "Todos los campos son obligatorios" };
  }
  await createTopScorerRepository({ name, team, flag });
  return { message: "Goleador creado correctamente" };
};

// Actualizar goles de un candidato
export const updateTopScorerGoalsService = async (
  id: string,
  goals: number
) => {
  const goals_ = Number(goals);
  if (isNaN(goals_) || goals_ < 0) {
    throw { status: 400, message: "Los goles deben ser un número positivo" };
  }

  const topScorer = await getTopScorerByIdRepository(id);
  if (!topScorer) {
    throw { status: 404, message: "Goleador no encontrado" };
  }

  await updateTopScorerGoalsRepository(id, goals_);
  return { message: "Goles actualizados correctamente" };
};

// Cerrar periodo de seleccion
export const closeTopScorerSelectionService = async () => {
  await closeTopScorerSelectionRepository();
  return { message: "Período de selección cerrado correctamente" };
};

// Abrir periodo de seleccion
export const openTopScorerSelectionService = async () => {
  await openTopScorerSelectionRepository();
  return { message: "Período de selección abierto correctamente" };
};

// Cerrar torneo — marcar ganador y asignar puntos
export const closeTopScorerService = async () => {
  // Buscar el candidato activo con mas goles
  const winner = await getWinnerTopScorerRepository();
  if (!winner) {
    throw { status: 404, message: "No hay goleadores cargados" };
  }

  // Marcar como ganador
  await setTopScorerWinnerRepository(winner.id);

  // Asignar +3 puntos a todos los que acertaron
  await prisma.userTopScorerPrediction.updateMany({
    where: { topScorerId: winner.id },
    data: { points: 3 },
  });

  // Contar cuantos acertaron para el mensaje
  const predictions = await getUserTopScorerPredictionsRepository(winner.id);

  return {
    message: `Goleador cerrado. ${predictions.length} usuarios reciben +3 puntos.`,
    winner: winner.name,
  };
};

// Eliminar candidato
export const deleteTopScorerService = async (id: string) => {
  const topScorer = await getTopScorerByIdRepository(id);
  if (!topScorer) {
    throw { status: 404, message: "Goleador no encontrado" };
  }

  // No se puede eliminar el ganador
  if (topScorer.isWinner) {
    throw { status: 400, message: "No se puede eliminar el goleador ganador" };
  }

  await deleteTopScorerRepository(id);
  return { message: "Goleador eliminado correctamente" };
};

// Listar todos los candidatos
export const getTopScorersService = async () => {
  return getTopScorersRepository();
};