import {
  getTopScorersRepository,
  createTopScorerRepository,
  updateTopScorerGoalsRepository,
  getTopScorerByIdRepository,
  getWinnerTopScorerRepository,
  setTopScorerWinnerRepository,
  getUserTopScorerPredictionsRepository,
  updateTopScorerPredictionPointsRepository,
  createTopScorerPredictionRepository,
  getMyTopScorerPredictionRepository,
} from "../repositories/topScorerRepository";

export const getTopScorersService = async () => {
  return getTopScorersRepository();
};

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

export const updateTopScorerGoalsService = async ({
  id,
  goals,
}: {
  id: string;
  goals: number;
}) => {
  const goals_ = Number(goals);
  if (!id.trim() || isNaN(goals_) || goals_ < 0) {
    throw { status: 400, message: "Datos inválidos" };
  }
  const topScorer = await getTopScorerByIdRepository(id);
  if (!topScorer) {
    throw { status: 404, message: "Goleador no encontrado" };
  }
  await updateTopScorerGoalsRepository({ id, goals: goals_ });
  return { message: "Goles actualizados correctamente" };
};

export const closeTopScorerService = async () => {
  // Buscar el goleador con más goles
  const winner = await getWinnerTopScorerRepository();
  if (!winner) {
    throw { status: 404, message: "No hay goleadores cargados" };
  }

  // Marcar como ganador
  await setTopScorerWinnerRepository(winner.id);

  // Buscar predicciones que acertaron
  const predictions = await getUserTopScorerPredictionsRepository(winner.id);

  // Sumar +3 pts a cada usuario que acertó
  await Promise.all(
    predictions.map((prediction) =>
      updateTopScorerPredictionPointsRepository({
        id: prediction.id,
        points: 3,
      }),
    ),
  );

  return {
    message: `Goleador cerrado. ${predictions.length} usuarios reciben +3 puntos.`,
    winner: winner.name,
  };
};

export const createTopScorerPredictionService = async ({
  userId,
  topScorerId,
  customName,
}: {
  userId: string;
  topScorerId?: string;
  customName?: string;
}) => {
  if (!topScorerId && !customName?.trim()) {
    throw {
      status: 400,
      message: "Debés elegir un goleador o ingresar un nombre",
    };
  }

  // Verificar que no haya predicción previa
  const existing = await getMyTopScorerPredictionRepository(userId);
  if (existing) {
    throw { status: 400, message: "Ya realizaste tu predicción de goleador" };
  }

  // Verificar que el goleador exista si se envió id
  if (topScorerId) {
    const topScorer = await getTopScorerByIdRepository(topScorerId);
    if (!topScorer) {
      throw { status: 404, message: "Goleador no encontrado" };
    }
  }

  await createTopScorerPredictionRepository({
    userId,
    topScorerId,
    customName,
  });
  return { message: "Predicción de goleador guardada correctamente" };
};

export const getMyTopScorerPredictionService = async (userId: string) => {
  return getMyTopScorerPredictionRepository(userId);
};
