import {
  getAllUserPointsRepository,
  getAllUsersRepository,
} from "../repositories/rankingRepository";

// Construir el ranking completo con posicion y datos de usuario
const buildRanking = async () => {
  // Todos los usuarios con rol user
  const allUsers = await getAllUsersRepository();
  // Puntos por usuario
  const pointsData = await getAllUserPointsRepository();

  // Mapa de userId → puntos
  const pointsMap = new Map(
    pointsData.map((entry) => [entry.userId, entry._sum.points ?? 0]),
  );

  // Combinar usuarios con sus puntos
  const ranking = allUsers.map((user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    favoriteTeam: user.favoriteTeam ?? null,
    totalPoints: pointsMap.get(user.id) ?? 0,
  }));

  // Ordenar de mayor a menor puntos
  ranking.sort((a, b) => b.totalPoints - a.totalPoints);

  // Asignar posición
  return ranking.map((user, index) => ({
    ...user,
    position: index + 1,
  }));
};

// Ranking completo ordenado de mayor a menor
export const getRankingService = async () => {
  return buildRanking();
};

// Posicion y puntos de un usuario especifico
export const getUserRankingService = async (userId: string) => {
  const ranking = await getRankingService();
  const userPosition = ranking.find((user) => user.id === userId);
  return userPosition ?? { totalPoints: 0, position: null };
};
