export const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const API_ROUTES = {
  // Auth
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,

  // Home
  home: `${BASE_URL}/home`,
  
  // Standings
  matches: `${BASE_URL}/matches`,
  
  // Profile
  profile: `${BASE_URL}/profile`,
  profileRules: `${BASE_URL}/profile/rules`,
  profileFavoriteTeam: `${BASE_URL}/profile/favorite-team`,
  profilePassword: `${BASE_URL}/profile/password`,

  // Ranking
  ranking: `${BASE_URL}/ranking`,
  
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
