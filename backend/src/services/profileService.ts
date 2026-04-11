import {
  getUserPublicProfileRepository,
  getUserPrivateProfileRepository,
  getPredictionsHistoryRepository,
  getPredictionsPendingRepository,
  getMatchesWithoutPredictionsRepository,
} from "../repositories/profileRepository";
import { getUserRankingService } from "./rankingService";

// Perfil publico
export const getUserPublicProfileService = async (username: string) => {
  const user = await getUserPublicProfileRepository(username);

  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }
  const userRanking = await getUserRankingService(user.id);
  const predictionsHistory = await getPredictionsHistoryRepository(username);
  const predictionsPending = await getPredictionsPendingRepository(username);

  return {
    username: user?.username,
    name: user?.name,
    position: userRanking.position,
    totalPoints: userRanking.totalPoints,
    predictionsHistory,
    predictionsPending,
  };
};

// Perfil privado
export const getUserPrivateProfileService = async (userId: string) => {
  const user = await getUserPrivateProfileRepository(userId);
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }
  const userRanking = await getUserRankingService(userId);

  const predictionsHistory = await getPredictionsHistoryRepository(
    user.username,
  );
  const predictionsPending = await getPredictionsPendingRepository(
    user.username,
  );
  const matchesWithoutPredictions =
    await getMatchesWithoutPredictionsRepository(userId);
  return {
    username: user?.username,
    name: user?.name,
    position: userRanking.position,
    totalPoints: userRanking.totalPoints,
    predictionsHistory,
    predictionsPending,
    matchesWithoutPredictions,
  };
};
