import {
  getUserPublicProfileRepository,
  getUserPrivateProfileRepository,
  getPredictionsHistoryRepository,
  getPredictionsPendingRepository,
  getMatchesWithoutPredictionsRepository,
  getWildcardUsedRepository,
  updateFavoriteTeamRepository,
  markRulesAsReadRepository
} from "../repositories/profileRepository";
import { getUserRankingService } from "./rankingService";

// Perfil publico
// Cualquier usuario logeador puede ver
export const getUserPublicProfileService = async (username: string) => {
   // Buscar usuario por username para obtener su id y datos
   const user = await getUserPublicProfileRepository(username);
   if (!user) {
     throw { status: 404, message: "Usuario no encontrado" };
   }
   
  // Todas las queries siguientes usan userId, no username
  const userRanking = await getUserRankingService(user.id);
  const predictionsHistory = await getPredictionsHistoryRepository(user.id);
  const predictionsPending = await getPredictionsPendingRepository(user.id);
  const wildcardUsed = await getWildcardUsedRepository(user.id);

  return {
    username: user.username,
    name: user.name,
    favoriteTeam: user.favoriteTeam,
    topScorerPrediction: user.topScorerPrediction,
    position: userRanking.position,
    totalPoints: userRanking.totalPoints,
    
    wildcardUsed: !!wildcardUsed,
    predictionsHistory,
    predictionsPending,
  };
};

// Perfil privado
// Datos completos
export const getUserPrivateProfileService = async (userId: string) => {
  const user = await getUserPrivateProfileRepository(userId);
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }
  
  const userRanking = await getUserRankingService(userId);
  const predictionsHistory = await getPredictionsHistoryRepository(userId);
  const predictionsPending = await getPredictionsPendingRepository(userId);
  const matchesWithoutPredictions = await getMatchesWithoutPredictionsRepository(userId);
  const wildcardUsed = await getWildcardUsedRepository(userId);

  return {
    username: user.username,
    name: user.name,
    role: user.role,
    favoriteTeam: user.favoriteTeam,
    hasReadRules: user.hasReadRules,
    topScorerPrediction: user.topScorerPrediction,
    position: userRanking.position,
    totalPoints: userRanking.totalPoints,
    
    wildcardAvailable: !wildcardUsed,
    predictionsHistory,
    predictionsPending,
    matchesWithoutPredictions,
  };
};

// Actualizar equipo favorito
export const updateFavoriteTeamService = async (userId: string, favoriteTeam: string) => {
  if (!favoriteTeam) {
    throw { status: 400, message: "El equipo favorito es obligatorio" };
  }

  const user = await updateFavoriteTeamRepository(userId, favoriteTeam);
  return { favoriteTeam: user.favoriteTeam };
};

// Marcar reglas como leidas
export const markRulesAsReadService = async (userId: string) => {
  await markRulesAsReadRepository(userId);
  return { message: "Reglas marcadas como leídas" };
};
