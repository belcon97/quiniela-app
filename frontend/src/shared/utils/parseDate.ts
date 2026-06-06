// Convierte "dd/mm/yyyy" + "HH:mm" a un objeto Date UTC
export function parseDate(date: string, time: string): Date {
  const [day, month, year] = date.split('/')
  return new Date(`${year}-${month}-${day}T${time}:00.000Z`)
}