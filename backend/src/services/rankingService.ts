import {
  getAllUserPointsRepository,
  getUsersByIdsRepository,
} from "../repositories/rankingRepository";

type RankingData = {
  userId: string;
  _sum: {
    points: number | null;
  };
};

// Construir ranking
const buildRanking = async (data: RankingData[]) => {
  const userIds = data.map((entry) => entry.userId);
  const users = await getUsersByIdsRepository(userIds);

  const fullRanking = data
    .sort((a, b) => (b._sum.points || 0) - (a._sum.points || 0)) // mayor a menor
    .map((entry, index) => {
      const user = users.find((user) => user.id === entry.userId);
      return {
        id: user?.id,
        username: user?.username,
        name: user?.name,
        totalPoints: entry._sum.points || 0,
        position: index + 1,
      };
    });

  return fullRanking;
};

// Ranking completo
export const getRankingService = async () => {
  const data = await getAllUserPointsRepository();
  return buildRanking(data);
};

// Posición de un usuario
export const getUserRankingService = async (userId: string) => {
  const ranking = await getRankingService();
  const userPosition = ranking.find((user) => user.id === userId);

  return userPosition ?? { totalPoints: 0, position: null };
};
