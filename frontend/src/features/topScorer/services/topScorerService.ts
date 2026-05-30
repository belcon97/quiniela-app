import { API_ROUTES } from "@/constants/constants";

// Tipos
export interface TopScorer {
  id: string;
  name: string;
  team: string;
  flag: string;
  goals: number;
  isWinner: boolean;
  isActive: boolean;
}

export interface TopScorerPrediction {
  id: string;
  userId: string;
  topScorerId: string;
  points: number;
  topScorer: TopScorer;
}

export const topScorerService = {
  // Ver lista de candidatos activos
  getTopScorers: async (token: string): Promise<TopScorer[]> => {
    const response = await fetch(API_ROUTES.topScorers, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Elegir goleador
  createPrediction: async (token: string, topScorerId: string) => {
    const response = await fetch(API_ROUTES.topScorerPredict, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topScorerId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // Ver mi prediccion de goleador
  getMyPrediction: async (token: string): Promise<TopScorerPrediction | null> => {
    const response = await fetch(API_ROUTES.topScorerMyPrediction, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};