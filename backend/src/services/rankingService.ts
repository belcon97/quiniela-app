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

// Construir el ranking completo con posicion y datos de usuario
const buildRanking = async (data: RankingData[]) => {
  const userIds = data.map((entry) => entry.userId);
  const users = await getUsersByIdsRepository(userIds);

  // Asignamos posición
  return data.map((entry, index) => {
    const user = users.find((user) => user.id === entry.userId);
    return {
      id: user?.id,
      username: user?.username,
      name: user?.name,
      favoriteTeam: user?.favoriteTeam ?? null,
      totalPoints: entry._sum.points || 0,
      position: index + 1,
    };
  });
};

// Ranking completo ordenado de mayor a menor
export const getRankingService = async () => {
  const data = await getAllUserPointsRepository();
  return buildRanking(data);
};

// Posicion y puntos de un usuario especifico
export const getUserRankingService = async (userId: string) => {
  const ranking = await getRankingService();
  const userPosition = ranking.find((user) => user.id === userId);

  return userPosition ?? { totalPoints: 0, position: null };
};