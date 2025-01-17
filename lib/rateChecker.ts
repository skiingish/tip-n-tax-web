export const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

export const isStale = (timestamp: number | null): boolean => {
  if (!timestamp) return true;
  return Date.now() - timestamp > TWELVE_HOURS_MS;
};