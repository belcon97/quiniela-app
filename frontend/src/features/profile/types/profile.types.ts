// Types
import type { Match, TopScorerPrediction } from "@/shared/types";

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  points: number | null;
  isWildcard: boolean;
  penaltyWinner: string | null;
  createdAt: string;
  match: Match;
}

// Private Profile
export interface PrivateProfileData {
  username: string;
  name: string;
  role: "user" | "admin";
  favoriteTeam: string | null;
  hasReadRules: boolean;
  topScorerPrediction: TopScorerPrediction | null;
  position: number;
  totalPoints: number;
  wildcardAvailable: boolean;
  predictionsHistory: Prediction[];
  predictionsPending: Prediction[];
  matchesWithoutPredictions: Match[];
}

// Public Profile
export interface PublicProfileData {
  username: string;
  name: string;
  favoriteTeam: string | null;
  topScorerPrediction: TopScorerPrediction | null;
  position: number;
  totalPoints: number;
  wildcardUsed: boolean;
  predictionsHistory: Prediction[];
  predictionsPending: Prediction[];
}
