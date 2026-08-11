export const getApiErrorMessage = (error, fallback) => (
  error.response?.data?.errors?.[0] || error.response?.data?.message || fallback
);
