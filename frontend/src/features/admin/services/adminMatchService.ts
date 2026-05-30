import { API_ROUTES } from "@/constants/constants";
import type { Match } from "@/types/shared.types";

// Listar todos los partidos
export const getMatches = async (token: string): Promise<Match[]> => {
  const response = await fetch(API_ROUTES.adminMatches, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Crear partido
export const createMatch = async (
  token: string,
  match: {
    homeTeam: string;
    homeFlag: string;
    awayTeam: string;
    awayFlag: string;
    group: string;
    stadium: string;
    date: Date;
  }
) => {
  const response = await fetch(API_ROUTES.adminMatches, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ matches: [match] }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Actualizar resultado
export const updateMatchScore = async (
  token: string,
  id: string,
  homeScore: number,
  awayScore: number
) => {
  const response = await fetch(`${API_ROUTES.adminMatches}/${id}/score`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ homeScore, awayScore }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Eliminar partido
export const deleteMatch = async (token: string, id: string) => {
  const response = await fetch(`${API_ROUTES.adminMatches}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};