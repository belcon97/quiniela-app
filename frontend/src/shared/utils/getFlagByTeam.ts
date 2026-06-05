import { WORLD_CUP_COUNTRIES } from '@/data/worldCup2026'

export function getFlagByTeam(teamName: string | null): string {
  if (!teamName) return ''
  
  const country = WORLD_CUP_COUNTRIES.find(
    c => c.label.toLowerCase() === teamName.toLowerCase()
  )
  
  return country?.icon ?? ''
}