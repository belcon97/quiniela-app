import type { RankingEntry } from "@/features/home/types/home.types";

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParams = {
  Home: undefined;
  Profile: { username: string } | undefined;
  Rules: undefined;
  Ranking: { ranking: RankingEntry[]; myPosition: number | null };
};

export type AdminStackParams = {
  AdminMatches: undefined;
};
