import { API_ROUTES } from "@/constants/api";
import type { Match } from '@/shared/types'

export const standingsService = {
  // Traer todos los partidos
  getMatches: async (token: string): Promise<Match[]> => {
    const response = await fetch(API_ROUTES.matches, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};