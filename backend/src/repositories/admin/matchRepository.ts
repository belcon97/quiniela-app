import { MatchStatus, PenaltyWinner } from "@prisma/client";
import prisma from "../../lib/prisma";

// Crear uno o varios partidos
export const createMatchRepository = async (
  matches: {
    homeTeam: string;
    awayTeam: string;
    homeFlag: string;
    awayFlag: string;
    group: string;
    date: Date;
  }[]
) => {
  return prisma.match.createMany({ data: matches });
};

// Listar todos los partidos
export const getMatchesRepository = async () => {
  return prisma.match.findMany({
    orderBy: { date: "asc" },
  });
};

// Buscar partido por id
export const getMatchByIdRepository = async (id: string) => {
  return prisma.match.findUnique({
    where: { id },
  });
};

// Editar datos de un partido
export const updateMatchRepository = async (
  id: string,
  data: {
    homeTeam?: string;
    awayTeam?: string;
    homeFlag?: string;
    awayFlag?: string;
    group?: string;
    date?: Date;
  }
) => {
  return prisma.match.update({
    where: { id },
    data,
  });
};

// Cargar resultado y marcar como completado
export const updateMatchScoreRepository = async (
  id: string,
  data: {
    homeScore: number;
    awayScore: number;
    penaltyWinner?: PenaltyWinner;
  }
) => {
  return prisma.match.update({
    where: { id },
    data: { ...data, status: MatchStatus.completed },
  });
};

// Traer predicciones de un partido
export const getMatchPredictionsRepository = async (matchId: string) => {
  return prisma.prediction.findMany({
    where: { matchId },
  });
};

// Actualizar puntos de una predicción
export const updatePredictionPointsRepository = async (
  id: string,
  points: number
) => {
  return prisma.prediction.update({
    where: { id },
    data: { points },
  });
};

// Eliminar partido
export const deleteMatchRepository = async (id: string) => {
  return prisma.match.delete({
    where: { id },
  });
};