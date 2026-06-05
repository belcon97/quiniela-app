import type { Match } from '@/shared/types'
import type { TeamStanding } from '@/shared/utils/calculateStandings'

export type { TeamStanding }

export interface GroupStanding {
  group:    string
  matches:  Match[]
  teams:    TeamStanding[]
}