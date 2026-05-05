// Formatear fecha de string a formato legible
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
