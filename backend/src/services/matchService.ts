import { MatchStatus } from "@prisma/client";

import {
  createMatchRepository,
  getMatchesRepository,
  updateMatchRepository,
  updatePredictionRepository,
  getPredictionsRepository,
} from "../repositories/matchRepository";

export const createMatchService = async (
  matches: {
    homeTeam: string;
    awayTeam: string;
    homeFlag: string;
    awayFlag: string;
    group: string;
    stadium: string;
    date: Date;
  }[],
) => {
  // Validaciones
  if (!matches || !Array.isArray(matches) || matches.length === 0) {
    throw { status: 400, message: "Formato no valido " };
  }

  // Validar que cada partido tenga todos los campos
  for (const match of matches) {
    if (
      !match.homeTeam.trim() ||
      !match.awayTeam.trim() ||
      !match.homeFlag.trim() ||
      !match.awayFlag.trim() ||
      !match.group.trim() ||
      !match.stadium.trim() ||
      !match.date
    ) {
      throw { status: 400, message: "Todos los campos son obligatorios" };
    }
  }

  // Crear partido
  const result = await createMatchRepository(matches);

  return {
    message: ` ${result.count} Partidos creados correctamente!`,
  };
};

export const getMatchesService = async () => {
  const matches = await getMatchesRepository();
  return matches;
};

export const updateMatchService = async (match: {
  id: string;
  homeScore: number;
  awayScore: number;
}) => {
  const { id } = match;

  // Defenderse de que lleguen como string
  const homeScore = Number(match.homeScore);
  const awayScore = Number(match.awayScore);

  // Validaciones
  if (!id.trim() || isNaN(homeScore) || isNaN(awayScore)) {
    throw { status: 400, message: "Todos los campos son obligatorios" };
  }

  // Actualiza todos los resultados de las predicciones
  const predictions = await getPredictionsRepository({ matchId: id });

  await Promise.all(
    predictions.map(async (prediction) => {
      let points = 0;

      // Determinar ganador
      const realWinner =
        homeScore > awayScore
          ? "home"
          : awayScore > homeScore
            ? "away"
            : "draw";
      const predictionWinner =
        prediction.homeScore > prediction.awayScore
          ? "home"
          : prediction.awayScore > prediction.homeScore
            ? "away"
            : "draw";

      if (
        prediction.homeScore === homeScore &&
        prediction.awayScore === awayScore
      ) {
        points = 3;
      } else if (realWinner === predictionWinner) {
        points = 1;
      }

      await updatePredictionRepository({
        id: prediction.id,
        points,
      });
    }),
  );

  // Actualizar partido
  const result = await updateMatchRepository({
    id,
    homeScore,
    awayScore,
    status: MatchStatus.completed,
  });

  return {
    result,
    message: "Partido actualizado correctamente",
  };
};
