export const roundToOneDecimal = (value: number): number => {
  return Math.round(value * 10) / 10;
};

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}min`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}min`;
};

export const getYearFromDate = (dateStr: Date): number => {
  const date = new Date(dateStr);
  return date.getFullYear();
};
