export interface MatchForm {
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  group: string;
  stadium: string;
  date: string;
  time: string;
}

export interface ScoreForm {
  homeScore: string;
  awayScore: string;
}

export type AdminTab = "create" | "matches";
