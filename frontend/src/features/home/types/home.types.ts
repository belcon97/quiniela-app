import type { Match } from "@/shared/types/shared.types";
import type { TopScorer } from "@/features/topScorer/services/topScorerService";

export interface RankingEntry {
  id: string;
  position: number | null;
  username: string;
  name: string;
  totalPoints: number;
}

export interface HomeData {
  myPosition: number | null;
  totalPoints: number;
  upcomingMatches: Match[];
  fullRanking: RankingEntry[];
  topScorers: TopScorer[];
}
