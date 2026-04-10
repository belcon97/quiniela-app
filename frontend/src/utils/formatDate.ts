// Formatear fecha de string a formato legible
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // formato de fecha del navegador
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  // formato de hora del navegador
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Formatear fecha
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);
};
