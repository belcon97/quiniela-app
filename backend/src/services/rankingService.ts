import {
  getRankingRepository,
  getUsersByIds,
} from "../repositories/rankingRepository";

type RankingData = {
  userId: string;
  _sum: {
    points: number | null;
  };
};

const buildRanking = async (data: RankingData[]) => {
  const userIds = data.map((entry) => entry.userId);
  const users = await getUsersByIds(userIds);

  return data.map((entry, index) => {
    const user = users.find((u) => u.id === entry.userId);
    return {
      position: index + 1,
      username: user?.username ?? "Desconocido",
      name: user?.name ?? "Desconocido",
      totalPoints: entry._sum.points || 0,
    };
  });
};

export const getRankingService = async () => {
  const data = await getRankingRepository();
  return buildRanking(data);
};
