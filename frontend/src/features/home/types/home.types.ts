import type { Match } from "@/types/shared.types";
import type { RankingEntry } from "@/features/ranking/types/ranking.types";
import type { TopScorer } from "@/features/topScorer/types/topScorer.types";

export interface HomeData {
  myPosition: number | null;
  myPoints: number;
  totalPoints: number;
  upcomingMatches: Match[];
  fullRanking: RankingEntry[];
  topScorers: TopScorer[];
  favoriteTeamMatch: Match | null;
}