import type { Match } from "@/shared/types/shared.types";

export interface PredictionInput {
  matchId: string;
  homeScore: string;
  awayScore: string;
}

export interface GroupedMatches {
  group: string;
  matches: Match[];
}
