import type { Match } from "@/types/shared.types";

export type Phase = "groups" | "knockout";

export interface TeamStanding {
  team: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

export interface GroupStanding {
  group: string;
  teams: TeamStanding[];
}

export interface KnockoutPhase {
  phase: string;
  matches: Match[];
}