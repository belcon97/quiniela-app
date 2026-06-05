export interface AuthUser {
  username:     string
  name:         string
  role:         'user' | 'admin'
  favoriteTeam: string | null
  hasReadRules: boolean
}

export interface Match {
  id:        string
  homeTeam:  string
  awayTeam:  string
  homeFlag:  string
  awayFlag:  string
  group:     string
  date:      string                      
  homeScore: number | null
  awayScore: number | null
  status:    'pending' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface UpcomingMatch {
  id:       string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  date:     string
}

export interface RankingEntry {
  id:           string
  username:     string
  name:         string
  favoriteTeam: string | null
  totalPoints:  number
  position:     number
}

export interface TopScorer {
  id:        string
  isActive:  boolean
  name:      string
  team:      string
  flag:      string
  goals:     number
  isWinner:  boolean
  createdAt: string
  updatedAt: string
}


export interface TopScorerPrediction {
  id:          string
  userId:      string
  topScorerId: string
  points:      number
  createdAt:   string
  topScorer:   TopScorer
}