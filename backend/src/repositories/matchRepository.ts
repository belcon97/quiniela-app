import { MatchStatus } from "@prisma/client";
import prisma from "../lib/prisma";

// Crear partidos
export const createMatchRepository = async (
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
  return prisma.match.createMany({ data: matches });
};

// Obtener partidos
export const getMatchesRepository = async () => {
  return prisma.match.findMany();
};

// Obtener predicciones
export const getPredictionsRepository = async ({
  matchId,
}: {
  matchId: string;
}) => {
  return prisma.prediction.findMany({ where: { matchId } });
};

// Actualizar predicciones y sumar puntos
export const updatePredictionRepository = async ({
  id,
  points,
}: {
  id: string;
  points: number;
}) => {
  return prisma.prediction.update({
    where: { id },
    data: { points },
  });
};

// Actualizar partido
export const updateMatchRepository = async ({
  id,
  homeScore,
  awayScore,
  status,
}: {
  id: string;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
}) => {
  return prisma.match.update({
    where: { id },
    data: { homeScore, awayScore, status },
  });
};
