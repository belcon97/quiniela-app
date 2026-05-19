import Constants from "expo-constants";
import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "web"
    ? (process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000")
    : (Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000");

console.log("apiUrl:", BASE_URL);

export const API_ROUTES = {
  // Auth
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,

  // Home
  home: `${BASE_URL}/home`,

  // Profile
  profile: `${BASE_URL}/profile`,
  predictions: `${BASE_URL}/predictions`,

  // Admin matches
  matches: `${BASE_URL}/matches`,

  // Top scorer
  topScorers: `${BASE_URL}/top-scorers`,
  topScorerPredict: `${BASE_URL}/top-scorers/predict`,
  topScorerMyPrediction: `${BASE_URL}/top-scorers/my-prediction`,
};
