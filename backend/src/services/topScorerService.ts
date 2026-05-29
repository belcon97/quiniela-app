import {
  getTopScorersRepository,
  getTopScorerByIdRepository,
  createTopScorerPredictionRepository,
  getMyTopScorerPredictionRepository,
} from "../repositories/topScorerRepository";

// Ver lista de candidatos activos
export const getTopScorersService = async () => {
  return getTopScorersRepository();
};

// Elegir goleador
export const createTopScorerPredictionService = async ({
  userId,
  topScorerId,
}: {
  userId: string;
  topScorerId: string;
}) => {
  // Verificar que no haya prediccion previa
  const existing = await getMyTopScorerPredictionRepository(userId);
  if (existing) {
    throw { status: 400, message: "Ya realizaste tu prediccion de goleador" };
  }

  // Verificar que el goleador existe y esta activo
  const topScorer = await getTopScorerByIdRepository(topScorerId);
  if (!topScorer) {
    throw { status: 404, message: "Goleador no encontrado" };
  }
  if (!topScorer.isActive) {
    throw { status: 400, message: "El periodo de selección de goleador ha cerrado" };
  }

  await createTopScorerPredictionRepository({ userId, topScorerId });
  return { message: "Prediccion de goleador guardada correctamente" };
};

// Ver mi prediccion de goleador
export const getMyTopScorerPredictionService = async (userId: string) => {
  return getMyTopScorerPredictionRepository(userId);
};