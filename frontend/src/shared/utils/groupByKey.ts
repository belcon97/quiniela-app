import type { Match } from '@/shared/types'

export function groupByKey(
  matches: Match[],
  key: keyof Match
): Record<string, Match[]> {
  return matches.reduce((acc, match) => {
    const group = String(match[key])
    if (!acc[group]) acc[group] = []
    acc[group].push(match)
    return acc
  }, {} as Record<string, Match[]>)
}