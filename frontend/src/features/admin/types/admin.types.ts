export interface MatchForm {
  homeTeam: string;
  homeFlag: string;
  homeCountryValue: string;
  awayTeam: string;
  awayFlag: string;
  awayCountryValue: string;
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
