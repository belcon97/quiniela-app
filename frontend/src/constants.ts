// src/constants.ts
const BASE_URL = "http://192.168.1.51:3000";

export const API_ROUTES = {
  // Auth
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,

  // Matches
  matches: `${BASE_URL}/matches`,

  // Predictions
  predictions: `${BASE_URL}/predictions`,
  myPredictions: `${BASE_URL}/predictions/me`,

  // Ranking
  ranking: `${BASE_URL}/ranking`,
};
