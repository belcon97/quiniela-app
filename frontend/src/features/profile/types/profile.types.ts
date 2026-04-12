import type { Match } from "../../../shared/types/shared.types";

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  points: number;
  createdAt: string;
  match: Match;
}

export interface PrivateProfileData {
  position: number | null;
  totalPoints: number;
  predictionsHistory: Prediction[];
  predictionsPending: Prediction[];
  matchesWithoutPredictions: Match[];
}

export interface PublicProfileData {
  username: string;
  name: string;
  position: number | null;
  totalPoints: number;
  predictionsHistory: Prediction[];
}
