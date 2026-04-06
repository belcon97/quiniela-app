import {
  findPredictionsByUserAndMatches,
  findMatchesByIds,
  createPredictionRepository,
  findUserById,
  findAllMatches,
  findPredictionsByUser,
  getRankingRepository,
} from "../repositories/predictionRepository";

export const createPredictionService = async (
  userId: string,
  predictions: {
    matchId: string;
    homeScore: number;
    awayScore: number;
  }[],
) => {
  // Validaciones
  if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
    throw { status: 400, message: "Debe enviar una prediccion" };
  }

  const matchIds = predictions.map((prediction) => prediction.matchId);

  // Verificar predicciones previas
  const existingPredictions = await findPredictionsByUserAndMatches(
    userId,
    matchIds,
  );
  if (existingPredictions.length > 0) {
    throw {
      status: 400,
      message: "Ya existe una prediccion para uno de los partidos",
    };
  }

  // Verificar que los partidos no estén cerrados
  const matches = await findMatchesByIds(matchIds);
  const matchStarted = matches.some(
    (match) =>
      match.status === "completed" || new Date(match.date) <= new Date(),
  );
  if (matchStarted) {
    throw {
      status: 400,
      message: "No podés cargar predicciones para partidos que ya comenzaron",
    };
  }

  // Crear predicciones
  await createPredictionRepository(
    predictions.map((prediction) => ({
      userId,
      matchId: prediction.matchId,
      homeScore: prediction.homeScore,
      awayScore: prediction.awayScore,
    })),
  );

  return { message: "Prediccion creada correctamente!" };
};

export const getUserPredictionsService = async (userId: string) => {
  // Verificar que el usuario exista
  const user = await findUserById(userId);
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  // Traer partidos y predicciones
  const matches = await findAllMatches();
  const userPredictions = await findPredictionsByUser(userId);

  const predictions = matches.map((match) => {
    const prediction = userPredictions.find(
      (prediction) => prediction.matchId === match.id,
    );
    return {
      match,
      homeScore: prediction?.homeScore ?? null,
      awayScore: prediction?.awayScore ?? null,
      points: prediction?.points ?? 0,
    };
  });

  // Calcular puntos totales
  const totalPoints = userPredictions.reduce(
    (sum, prediction) => sum + (prediction.points || 0),
    0,
  );

  // Calcular ranking
  const allUsers = await getRankingRepository();
  const rank = allUsers.findIndex((user) => user.userId === userId) + 1;

  return { user, predictions, totalPoints, rank };
};
