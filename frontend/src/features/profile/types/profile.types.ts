import type { Match } from "@/types/shared.types";
import type { TopScorerPrediction } from "@/features/topScorer/types/topScorer.types";

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  points: number;
  isWildcard: boolean;
  penaltyWinner: "home" | "away" | null;
  createdAt: string;
  match: Match;
}

export interface PrivateProfileData {
  username: string;
  name: string;
  role: string;
  favoriteTeam: string | null;
  hasReadRules: boolean;
  position: number | null;
  totalPoints: number;
  wildcardAvailable: boolean;
  topScorerPrediction: TopScorerPrediction | null;
  predictionsHistory: Prediction[];
  predictionsPending: Prediction[];
  matchesWithoutPredictions: Match[];
}

export interface PublicProfileData {
  username: string;
  name: string;
  favoriteTeam: string | null;
  topScorerPrediction: TopScorerPrediction | null;
  position: number | null;
  totalPoints: number;
  wildcardUsed: boolean;
  predictionsHistory: Prediction[];
  predictionsPending: Prediction[];
}

export interface PredictionInput {
  matchId: string;
  homeScore: string;
  awayScore: string;
}