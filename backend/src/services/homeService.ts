import { getUpcomingMatchesRepository } from "../repositories/homeRepository";
import { getRankingService, getUserRankingService } from "./rankingService";

export const getHomeService = async (userId: string) => {
  const matches = await getUpcomingMatchesRepository();

  // Solo proximos partidos
  const nextDate = matches[0]?.date;
  const upcomingMatches = matches.filter(
    (match) =>
      new Date(match.date).toDateString() === new Date(nextDate).toDateString(),
  );

  // Ranking por usuarios con sus puntos
  const fullRanking = await getRankingService();

  // Mi posicion
  const myRanking = await getUserRankingService(userId);

  return {
    myPosition: myRanking.position,
    upcomingMatches,
    fullRanking,
  };
};
