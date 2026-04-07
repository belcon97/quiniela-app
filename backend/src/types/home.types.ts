export interface HomeResponse {
  upcomingMatches: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeFlag: string;
    awayFlag: string;
    stadium: string;
    date: string;
    status: string;
  }[];

  generalRanking: RankingEntry[];

  myRanking: RankingEntry;
}

interface RankingEntry {
  position: number;
  username: string;
  name: string;
  totalPoints: number;
}
