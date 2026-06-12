// Constants
import { API_ROUTES } from "@/constants/api";

// Types
import type { Match } from "@/shared/types";
import type { MatchPredictionsData } from "../types/matches.types";

export const matchesService = {
  getMatches: async (token: string): Promise<Match[]> => {
    const response = await fetch(API_ROUTES.matches, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  getMatchPredictions: async (
    token: string,
    matchId: string,
  ): Promise<MatchPredictionsData> => {
    const response = await fetch(API_ROUTES.matchPredictions(matchId), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};
