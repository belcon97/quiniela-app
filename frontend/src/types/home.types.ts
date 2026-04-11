import type { Match } from "./shared.types";

export interface RankingEntry {
  id: string;
  position: number | null;
  username: string;
  name: string;
  totalPoints: number;
}

export interface HomeData {
  position: number | null;
  totalPoints: number;
  upcomingMatches: Match[];
  fullRanking: RankingEntry[];
}
