import { PenaltyWinner } from "@prisma/client";
import {
  findPredictionsByUserAndMatches,
  findMatchesByIds,
  createPredictionRepository,
  findWildcardUsedRepository,
  findUserByIdRepository,
  findPredictionsByUserRepository,
} from "../repositories/predictionRepository";
import { getUserRankingService } from "./rankingService";

const isGroupStage = (group: string) => group.toLowerCase().startsWith("grupo");

// Crear predicciones
export const createPredictionService = async (
  userId: string,
  predictions: {
    matchId: string;
    homeScore: number;
    awayScore: number;
    isWildcard?: boolean;
    penaltyWinner?: PenaltyWinner;
  }[]
) => {
  const matchIds = predictions.map((p) => p.matchId);

  // Verificar que no existan predicciones previas para estos partidos
  const existingPredictions = await findPredictionsByUserAndMatches(userId, matchIds);
  if (existingPredictions.length > 0) {
    throw { status: 400, message: "Ya existe una prediccion para uno de los partidos" };
  }

  // Verificar que los partidos existan y no hayan comenzado
  const matches = await findMatchesByIds(matchIds);
  const matchStarted = matches.some(
    (match) => match.status === "completed" || new Date(match.date) <= new Date()
  );
  if (matchStarted) {
    throw { status: 400, message: "No podes predecir partidos que ya comenzaron" };
  }

  // Validar comodin
  const wildcardPredictions = predictions.filter((prediction) => prediction.isWildcard);
  if (wildcardPredictions.length > 1) {
    throw { status: 400, message: "Solo podes usar el comodin en un partido" };
  }

  if (wildcardPredictions.length === 1) {
    // Verificar que el usuario no haya usado el comodin antes
    const wildcardUsed = await findWildcardUsedRepository(userId);
    if (wildcardUsed) {
      throw { status: 400, message: "Ya usaste el comodin en esta quiniela" };
    }
  }

  // Validar penales en fase eliminatoria
  for (const prediction of predictions) {
    const match = matches.find((m) => m.id === prediction.matchId);
    if (!match) continue;

    if (!isGroupStage(match.group)) {
      const isDraw = prediction.homeScore === prediction.awayScore;
      if (isDraw && !prediction.penaltyWinner) {
        throw {
          status: 400,
          message: `Debes indicar el ganador en penales para ${match.homeTeam} vs ${match.awayTeam}`,
        };
      }
    }
  }

  // Crear predicciones
  await createPredictionRepository(
    predictions.map((prediction) => ({
      userId,
      matchId: prediction.matchId,
      homeScore: prediction.homeScore,
      awayScore: prediction.awayScore,
      isWildcard: prediction.isWildcard ?? false,
      penaltyWinner: prediction.penaltyWinner ?? null,
    }))
  );

  return { message: "Prediccion creada correctamente" };
};

// Ver predicciones del usuario con ranking
export const getUserPredictionsService = async (userId: string) => {
  // Verificar que el usuario existe
  const user = await findUserByIdRepository(userId);
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  // Traer predicciones con sus partidos
  const predictions = await findPredictionsByUserRepository(userId);

  // Puntos totales
  const totalPoints = predictions.reduce((sum, p) => sum + (p.points || 0), 0);

  // Posicion en el ranking
  const ranking = await getUserRankingService(userId);

  return {
    user,
    predictions,
    totalPoints,
    position: ranking.position,
  };
};