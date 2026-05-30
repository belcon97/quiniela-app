export interface RankingEntry {
  id: string;
  username: string;
  name: string;
  favoriteTeam: string | null;
  totalPoints: number;
  position: number;
}