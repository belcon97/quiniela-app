import {
  getUpcomingMatchesRepository,
  getHomeRankingRepository,
  getUsersByIdsRepository,
} from "../repositories/homeRepository";

export const getUpcomingMatches = async () => {
  const matches = await getUpcomingMatchesRepository();
  return matches;
};

export const getHomeRanking = async () => {
  const ranking = await getHomeRankingRepository();
  return ranking;
};

export const getHomeService = async (userId: string) => {
  const matches = await getUpcomingMatches();

  // Solo proximos partidos
  const nextDate = matches[0]?.date;
  const upcomingMatches = matches.filter(
    (match) =>
      new Date(match.date).toDateString() === new Date(nextDate).toDateString(),
  );

  // Ranking
  const rankingData = await getHomeRanking();

  // Usuarios
  const userIds = rankingData.map((data) => data.userId);
  const users = await getUsersByIdsRepository(userIds);

  // Ranking por usuarios con sus puntos
  const fullRanking = rankingData
    .map((data, index) => {
      const user = users.find((user) => user.id === data.userId);
      return {
        username: user?.username,
        name: user?.name,
        totalPoints: data._sum.points || 0,
      };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints) // mayor a menor
    .map((user, index) => {
      return {
        ...user,
        position: index + 1,
      };
    });

  // Mi posicion
  const myUser = users.find((user) => user.id === userId);
  const myRanking = fullRanking.find(
    (entry) => entry.username === myUser?.username,
  );

  return { upcomingMatches, fullRanking, myRanking };
};
