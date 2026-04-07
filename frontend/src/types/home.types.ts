export interface UpcomingMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  stadium: string;
  date: string;
  status: string;
}

export interface RankingEntry {
  position: number;
  username: string;
  name: string;
  totalPoints: number;
}

export interface HomeData {
  upcomingMatches: UpcomingMatch[];
  fullRanking: RankingEntry[];
  myRanking: RankingEntry | undefined;
}
