import {
  getUpcomingMatchesRepository,
  getNextMatchByTeamRepository,
  getUserFavoriteTeamRepository,
} from "../repositories/homeRepository";
import { getRankingService, getUserRankingService } from "./rankingService";
import { getTopScorersService } from "./topScorerService";

export const getHomeService = async (userId: string) => {
  // Lista de todos los partidos pendientes ordenados por fecha
  const matches = await getUpcomingMatchesRepository();

  // Solo los partidos del dia mas cercano
  const nextDate = matches[0]?.date;
  const upcomingMatches = nextDate
    ? matches.filter(
        (match) =>
          new Date(match.date).toDateString() ===
          new Date(nextDate).toDateString()
      )
    : [];

  // Ranking completo 
  const fullRanking = await getRankingService();
  const myRanking =
    fullRanking.find((user) => user.id === userId) ??
    { totalPoints: 0, position: null };

  // Top 3 goleadores por cantidad de goles
  const allScorers = await getTopScorersService();
  const topScorers = allScorers.slice(0, 3);

  // Proximo partido del equipo favorito
  const user = await getUserFavoriteTeamRepository(userId);
  const favoriteTeamMatch = user?.favoriteTeam
    ? await getNextMatchByTeamRepository(user.favoriteTeam)
    : null;

  return {
    upcomingMatches,
    myPosition: myRanking.position,
    myPoints: myRanking.totalPoints,
    fullRanking,
    topScorers,
    favoriteTeamMatch,
  };
};