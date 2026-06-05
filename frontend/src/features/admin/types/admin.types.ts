import type { Match, TopScorer } from '@/shared/types'

export interface AdminUser {
  id:           string
  username:     string
  name:         string
  role:         'user' | 'admin'
  favoriteTeam: string | null
  hasReadRules: boolean
}

export interface AdminUsersResponse {
  users: AdminUser[]
  total: number
}

export type { Match, TopScorer }