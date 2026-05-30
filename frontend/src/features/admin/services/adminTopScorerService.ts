
import { API_ROUTES } from "@/constants/constants";
import type { TopScorer } from "@/features/topScorer/services/topScorerService";

export const adminTopScorerService = {
  // Listar todos los candidatos
  getTopScorers: async (token: string): Promise<TopScorer[]> => {
    const response = await fetch(API_ROUTES.adminTopScorers, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Crear candidato
  createTopScorer: async (
    token: string,
    payload: { name: string; team: string; flag: string }
  ) => {
    const response = await fetch(API_ROUTES.adminTopScorers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Actualizar goles
  updateGoals: async (token: string, id: string, goals: number) => {
    const response = await fetch(`${API_ROUTES.adminTopScorers}/${id}/goals`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ goals }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Eliminar candidato
  deleteTopScorer: async (token: string, id: string) => {
    const response = await fetch(`${API_ROUTES.adminTopScorers}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Cerrar período de seleccion
  closeSelection: async (token: string) => {
    const response = await fetch(`${API_ROUTES.adminTopScorers}/selection/close`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Abrir período de seleccion
  openSelection: async (token: string) => {
    const response = await fetch(`${API_ROUTES.adminTopScorers}/selection/open`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Cerrar torneo y asignar puntos
  closeTopScorer: async (token: string) => {
    const response = await fetch(`${API_ROUTES.adminTopScorers}/close`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};