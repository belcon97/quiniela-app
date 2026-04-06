import { API_ROUTES } from "../constants";

import type { MatchData, UpdateMatchData } from "../types/types";

export const matchApi = {
  // Crear partidos (solo admin)
  createMatch: async (token: string, match: MatchData) => {
    const response = await fetch(`${API_ROUTES.matches}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ matches: [match] }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },

  // Obtener todos los partidos
  getMatches: async () => {
    const response = await fetch(`${API_ROUTES.matches}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },

  // Actualizar partidos (solo admin)
  updateMatch: async (token: string, id: string, match: UpdateMatchData) => {
    const response = await fetch(`${API_ROUTES.matches}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(match),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },
};
