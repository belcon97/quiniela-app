export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  role: "user" | "admin";
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface MatchData {
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  group: string;
  stadium: string;
  date: string;
}

export interface UpdateMatchData {
  homeScore: number;
  awayScore: number;
}

export interface PredictionData {
  matchId: string;
  homeScore: number;
  awayScore: number;
}

export interface RankingData {
  userId: string;
  points: number;
}
