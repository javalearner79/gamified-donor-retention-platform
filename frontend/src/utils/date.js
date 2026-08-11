export const formatDate = (date, fallback = 'No donation recorded') => {
  if (!date) return fallback;

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
};
