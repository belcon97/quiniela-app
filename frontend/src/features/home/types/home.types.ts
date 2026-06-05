import type { UpcomingMatch, RankingEntry, TopScorer } from '@/shared/types'

export interface FavoriteTeamMatch {
  id:       string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  date:     string
}

export interface HomeResponse {
  upcomingMatches:   UpcomingMatch[]
  myPosition:        number
  myPoints:          number
  fullRanking:       RankingEntry[]
  topScorers:        TopScorer[]
  favoriteTeamMatch: FavoriteTeamMatch | null
}