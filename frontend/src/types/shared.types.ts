export type Role = "user" | "admin";
export type MatchStatus = "pending" | "completed";

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  role: Role;
  favoriteTeam: string | null;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  stadium: string;
  date: string;
  status: MatchStatus;
  group?: string;
  homeScore?: number | null;
  awayScore?: number | null;
  createdAt?: string;
  updatedAt?: string;
}