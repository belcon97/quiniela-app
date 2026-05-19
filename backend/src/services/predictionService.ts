import {
  findPredictionsByUserAndMatches,
  findMatchesByIds,
  createPredictionRepository,
  findUserById,
  findAllMatches,
  findPredictionsByUser,
  getRankingRepository,
  findUserWildcardStatus,
  updateUserWildcard,
} from "../repositories/predictionRepository";

const isGroupStage = (group: string) => group.startsWith("Grupo");

export const createPredictionService = async (
  userId: string,
  predictions: {
    matchId: string;
    homeScore: number;
    awayScore: number;
    isWildcard?: boolean;
    penaltyWinner?: string;
  }[],
) => {
  if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
    throw { status: 400, message: "Debe enviar una prediccion" };
  }

  const matchIds = predictions.map((p) => p.matchId);

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

  // Validar comodín
  const wildcardPredictions = predictions.filter((p) => p.isWildcard);
  if (wildcardPredictions.length > 1) {
    throw { status: 400, message: "Solo podés usar el comodín en un partido" };
  }

  if (wildcardPredictions.length === 1) {
    // Verificar que el usuario no haya usado el comodín antes
    const user = await findUserWildcardStatus(userId);
    if (user?.usedWildcard) {
      throw { status: 400, message: "Ya usaste el comodín en esta quiniela" };
    }

    // Verificar que el partido sea de fase de grupos
    const wildcardMatchId = wildcardPredictions[0].matchId;
    const wildcardMatch = matches.find((m) => m.id === wildcardMatchId);
    if (!wildcardMatch || !isGroupStage(wildcardMatch.group)) {
      throw {
        status: 400,
        message: "El comodín solo puede usarse en la fase de grupos",
      };
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
          message: `Debés indicar el ganador en penales para ${match.homeTeam} vs ${match.awayTeam}`,
        };
      }
      if (
        prediction.penaltyWinner &&
        !["home", "away"].includes(prediction.penaltyWinner)
      ) {
        throw {
          status: 400,
          message: "El ganador en penales debe ser 'home' o 'away'",
        };
      }
    }
  }

  // Crear predicciones
  await createPredictionRepository(
    predictions.map((p) => ({
      userId,
      matchId: p.matchId,
      homeScore: p.homeScore,
      awayScore: p.awayScore,
      isWildcard: p.isWildcard ?? false,
      penaltyWinner: p.penaltyWinner ?? null,
    })),
  );

  // Marcar comodín como usado
  if (wildcardPredictions.length === 1) {
    await updateUserWildcard(userId);
  }

  return { message: "Prediccion creada correctamente!" };
};

export const getUserPredictionsService = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  const matches = await findAllMatches();
  const userPredictions = await findPredictionsByUser(userId);

  const predictions = matches.map((match) => {
    const prediction = userPredictions.find((p) => p.matchId === match.id);
    return {
      match,
      homeScore: prediction?.homeScore ?? null,
      awayScore: prediction?.awayScore ?? null,
      points: prediction?.points ?? 0,
      isWildcard: prediction?.isWildcard ?? false,
      penaltyWinner: prediction?.penaltyWinner ?? null,
    };
  });

  const totalPoints = userPredictions.reduce(
    (sum, p) => sum + (p.points || 0),
    0,
  );

  const allUsers = await getRankingRepository();
  const rank = allUsers.findIndex((u) => u.userId === userId) + 1;

  return { user, predictions, totalPoints, rank };
};
