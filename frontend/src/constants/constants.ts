export const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const API_ROUTES = {
  // Auth
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,

  // Home
  home: `${BASE_URL}/home`,

  // Profile
  profile: `${BASE_URL}/profile`,

  // Predictions
  predictions: `${BASE_URL}/predictions`,

  // Top scorer
  topScorers: `${BASE_URL}/top-scorers`,
  topScorerPredict: `${BASE_URL}/top-scorers/predict`,
  topScorerMyPrediction: `${BASE_URL}/top-scorers/my-prediction`,

  // Admin
  adminMatches: `${BASE_URL}/admin/matches`,
  adminTopScorers: `${BASE_URL}/admin/top-scorers`,
  adminUsers: `${BASE_URL}/admin/users`,
};
