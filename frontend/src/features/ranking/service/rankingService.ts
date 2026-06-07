import { API_ROUTES } from "@/constants/api";
import type { RankingEntry } from "../types/ranking.types";

export const rankingService = {
  // Traer el ranking completo
  getRanking: async (token: string): Promise<RankingEntry[]> => {
    const response = await fetch(API_ROUTES.ranking, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};