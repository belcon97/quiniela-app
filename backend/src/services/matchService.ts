import {
  getMatchesRepository,
  getMatchPredictionsWithUsersRepository,
  getUserPredictionForMatchRepository,
} from "../repositories/matchRepository";
import { getMatchByIdRepository } from "../repositories/admin/matchRepository";

// Listar todos los partidos
export const getMatchesService = async () => {
  return getMatchesRepository();
};

// Traer predicciones de un partido
export const getMatchPredictionsService = async (
  matchId: string,
  userId: string,
) => {
  const match = await getMatchByIdRepository(matchId);
  if (!match) {
    throw { status: 404, message: "Partido no encontrado" };
  }

  const userPrediction = await getUserPredictionForMatchRepository(
    userId,
    matchId,
  );
  const userHasPredicted = !!userPrediction;

  const rawPredictions = await getMatchPredictionsWithUsersRepository(matchId);

  const predictions = rawPredictions.map((p) => ({
    username: p.user.username,
    name: p.user.name,
    favoriteTeam: p.user.favoriteTeam,
    homeScore: p.homeScore,
    awayScore: p.awayScore,
    points: p.points,
    isWildcard: p.isWildcard,
  }));

  return { match, userHasPredicted, predictions };
};
