import { API_ROUTES } from "@/constants";

export interface TopScorer {
  id: string;
  name: string;
  team: string;
  flag: string;
  goals: number;
  isWinner: boolean;
}

export interface TopScorerPrediction {
  id: string;
  userId: string;
  topScorerId: string | null;
  customName: string | null;
  points: number;
  topScorer: TopScorer | null;
}

export const topScorerService = {
  getTopScorers: async (): Promise<TopScorer[]> => {
    const response = await fetch(API_ROUTES.topScorers);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  createTopScorer: async (
    token: string,
    payload: { name: string; team: string; flag: string },
  ) => {
    const response = await fetch(API_ROUTES.topScorers, {
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

  updateGoals: async (token: string, id: string, goals: number) => {
    const response = await fetch(`${API_ROUTES.topScorers}/${id}/goals`, {
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

  closeTopScorer: async (token: string) => {
    const response = await fetch(`${API_ROUTES.topScorers}/close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  createPrediction: async (
    token: string,
    payload: { topScorerId?: string; customName?: string },
  ) => {
    const response = await fetch(API_ROUTES.topScorerPredict, {
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

  getMyPrediction: async (
    token: string,
  ): Promise<TopScorerPrediction | null> => {
    const response = await fetch(API_ROUTES.topScorerMyPrediction, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};
