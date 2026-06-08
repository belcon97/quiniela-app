import {
  createMatchRepository,
  getMatchesRepository,
  getMatchByIdRepository,
  updateMatchRepository,
  updateMatchScoreRepository,
  getMatchPredictionsRepository,
  updatePredictionPointsRepository,
  deleteMatchRepository,
} from "../../repositories/admin/matchRepository";

// Crear uno o varios partidos
export const createMatchService = async (
  matches: {
    homeTeam: string;
    awayTeam: string;
    homeFlag: string;
    awayFlag: string;
    group: string;
    date: Date;
  }[],
) => {
  // Validar que cada partido tenga todos los campos
  for (const match of matches) {
    if (
      !match.homeTeam.trim() ||
      !match.awayTeam.trim() ||
      !match.homeFlag.trim() ||
      !match.awayFlag.trim() ||
      !match.group.trim() ||
      !match.date
    ) {
      throw { status: 400, message: "Todos los campos son obligatorios" };
    }

    // Los equipos no pueden ser iguales
    if (match.homeTeam.trim() === match.awayTeam.trim()) {
      throw { status: 400, message: "Los equipos no pueden ser iguales" };
    }
  }

  const result = await createMatchRepository(matches);
  return { message: `${result.count} partido(s) creado(s) correctamente` };
};

// Listar todos los partidos
export const getMatchesService = async () => {
  return getMatchesRepository();
};

// Editar datos de un partido
export const updateMatchService = async (
  id: string,
  data: {
    homeTeam?: string;
    awayTeam?: string;
    homeFlag?: string;
    awayFlag?: string;
    group?: string;
    date?: Date;
  },
) => {
  // Verificar que el partido existe
  const match = await getMatchByIdRepository(id);
  if (!match) {
    throw { status: 404, message: "Partido no encontrado" };
  }

  return updateMatchRepository(id, data);
};

// Cargar resultado y calcular puntos
export const updateMatchScoreService = async (
  id: string,
  data: {
    homeScore: number;
    awayScore: number;
  },
) => {
  const { homeScore, awayScore } = data;

  // Verificar que el partido existe
  const match = await getMatchByIdRepository(id);
  if (!match) {
    throw { status: 404, message: "Partido no encontrado" };
  }

  // No se puede cargar resultado de un partido ya completado
  if (match.status === "completed") {
    throw { status: 400, message: "Este partido ya tiene resultado cargado" };
  }

  // Calcular puntos para cada prediccion
  const predictions = await getMatchPredictionsRepository(id);

  await Promise.all(
    predictions.map(async (prediction) => {
      let points = 0;

      // Ganador real
      const realWinner =
        homeScore > awayScore
          ? "home"
          : awayScore > homeScore
            ? "away"
            : "draw";

      // Ganador predicho
      const predictionWinner =
        prediction.homeScore > prediction.awayScore
          ? "home"
          : prediction.awayScore > prediction.homeScore
            ? "away"
            : "draw";

      // Resultado exacto → 3 puntos
      if (
        prediction.homeScore === homeScore &&
        prediction.awayScore === awayScore
      ) {
        points = 3;
        // Ganador correcto → 1 punto
      } else if (realWinner === predictionWinner) {
        points = 1;
      }

      // Aplicar comodin — duplica los puntos
      if (prediction.isWildcard) {
        points = points * 2;
      }

      await updatePredictionPointsRepository(prediction.id, points);
    }),
  );

  // Actualizar el partido con el resultado
  await updateMatchScoreRepository(id, { homeScore, awayScore });

  return { message: "Resultado cargado correctamente" };
};

// Eliminar partido
export const deleteMatchService = async (id: string) => {
  // Verificar que el partido existe
  const match = await getMatchByIdRepository(id);
  if (!match) {
    throw { status: 404, message: "Partido no encontrado" };
  }

  // No se puede eliminar un partido completado
  if (match.status === "completed") {
    throw { status: 400, message: "No se puede eliminar un partido ya jugado" };
  }

  await deleteMatchRepository(id);
  return { message: "Partido eliminado correctamente" };
};
