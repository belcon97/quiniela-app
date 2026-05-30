export interface TopScorer {
  id: string;
  name: string;
  team: string;
  flag: string;
  goals: number;
  isWinner: boolean;
  isActive: boolean;
}

export interface TopScorerPrediction {
  id: string;
  userId: string;
  topScorerId: string;
  points: number;
  topScorer: TopScorer;
}