export function parseScore(text: string, max = 9): number {
  const number = parseInt(text, 10)
  if (isNaN(number)) return 0
  if (number > max)  return max
  return number
}