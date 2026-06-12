// Types
import type { Match } from "@/shared/types";

export type MatchFilter = "TODOS" | "POR JUGAR" | "JUGADOS";

export interface MatchPredictionEntry {
  username: string;
  name: string;
  favoriteTeam: string | null;
  homeScore: number;
  awayScore: number;
  points: number | null;
  isWildcard: boolean;
}

export interface MatchPredictionsData {
  match: Match;
  userHasPredicted: boolean;
  predictions: MatchPredictionEntry[];
}
