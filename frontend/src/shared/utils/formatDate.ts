export function formatMatchDate(isoDate: string): string {
  const date = new Date(isoDate)

  const day   = date.getUTCDate()
  const month = date.toLocaleString('es', { month: 'short', timeZone: 'UTC' })
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const mins  = String(date.getUTCMinutes()).padStart(2, '0')

  return `${day} ${month} · ${hours}:${mins}`
}